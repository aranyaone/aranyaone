// Advanced escalation workflow: Slack, Trello, Email, Sentry
import fetch from 'node-fetch';
import * as Sentry from '@sentry/node';
import nodemailer from 'nodemailer';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
const TRELLO_LIST_ID = process.env.TRELLO_LIST_ID;
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { service, feedback, user, ai } = req.body;
  let errors = [];

  // World-class escalation rules
  // Priority levels
  let priority = 'Normal';
  if (ai?.category === 'Bug Report' || ai?.sentiment?.score < -2) priority = 'Critical';
  else if (ai?.sentiment?.score < 0) priority = 'High';
  else if (ai?.category === 'Feature Request') priority = 'Low';

  // SLA tracking (example: 24h for critical, 48h for high, 72h for normal)
  let slaHours = 72;
  if (priority === 'Critical') slaHours = 24;
  else if (priority === 'High') slaHours = 48;

  // Auto-assign (example: assign to team based on service)
  let assignedTo = 'General Team';
  if (service === 'Payments' || service === 'Withdrawals') assignedTo = 'Finance Team';
  if (service === 'Support') assignedTo = 'Support Team';
  if (service === 'Cybersecurity') assignedTo = 'Security Team';

  // Approval workflow (require approval for escalation if not critical)
  let approved = priority === 'Critical';
  // For demo, auto-approve critical, others require manual approval

  // Escalation logic
  let escalateSlack = false, escalateTrello = false, escalateEmail = false, escalateSentry = false;
  if (approved) {
    if (priority === 'Critical' || priority === 'High') {
      escalateSlack = true;
      escalateTrello = true;
      escalateEmail = true;
      escalateSentry = true;
    }
    if (service === 'Payments' || service === 'Withdrawals') {
      escalateEmail = true;
      escalateSentry = true;
    }
    if (service === 'Support') {
      escalateSlack = true;
    }
    if (ai?.category === 'Feature Request') {
      escalateTrello = true;
    }
  }

  // Store escalation meta (for dashboard, tracking, etc.)
  // TODO: Save to DB or feedback store
  const escalationMeta = {
    priority,
    slaHours,
    assignedTo,
    approved,
    escalatedAt: Date.now(),
  };

  // Slack
  if (SLACK_WEBHOOK_URL && escalateSlack) {
    try {
      await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `🚨 [${priority}] Feedback for *${service}* assigned to *${assignedTo}*:\n${feedback}\nCategory: ${ai?.category}\nSentiment: ${ai?.sentiment?.score}\nSLA: ${slaHours}h` }),
      });
    } catch (err) {
      errors.push('Slack');
      Sentry.captureException(err);
    }
  }
  // Trello
  if (TRELLO_KEY && TRELLO_TOKEN && TRELLO_LIST_ID && escalateTrello) {
    try {
      await fetch(`https://api.trello.com/1/cards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `[${priority}] Feedback: ${service}`,
          desc: `User: ${user || 'anonymous'}\nFeedback: ${feedback}\nCategory: ${ai?.category}\nSentiment: ${ai?.sentiment?.score}\nAssigned: ${assignedTo}\nSLA: ${slaHours}h`,
          idList: TRELLO_LIST_ID,
        }),
      });
    } catch (err) {
      errors.push('Trello');
      Sentry.captureException(err);
    }
  }
  // Email
  if (process.env.NOTIFY_EMAIL && escalateEmail) {
    try {
      await transporter.sendMail({
        from: `Bujji Chat <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: `[${priority}] Escalated Feedback for ${service}`,
        text: `Service: ${service}\nUser: ${user || 'anonymous'}\nFeedback: ${feedback}\nCategory: ${ai?.category}\nSentiment: ${ai?.sentiment?.score}\nAssigned: ${assignedTo}\nSLA: ${slaHours}h`,
      });
    } catch (err) {
      errors.push('Email');
      Sentry.captureException(err);
    }
  }
  // Sentry
  if (escalateSentry) {
    try {
      Sentry.captureMessage(`[${priority}] Feedback: ${service} | ${feedback} | Assigned: ${assignedTo} | SLA: ${slaHours}h`);
    } catch (err) {
      errors.push('Sentry');
    }
  }
  res.status(200).json({ success: errors.length === 0, errors, escalationMeta });
}
