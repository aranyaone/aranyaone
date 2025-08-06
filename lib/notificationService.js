// Notification service for feedback alerts
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
import * as Sentry from '@sentry/node';

// Example: Slack webhook URL (replace with your actual URL)
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
// Example: Email config (replace with your actual credentials)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendFeedbackNotification({ service, feedback, user }) {
  // Log
  console.log(`[Notification] New feedback for ${service} from ${user || 'anonymous'}: ${feedback}`);

  // Send Slack notification
  if (SLACK_WEBHOOK_URL) {
    try {
      await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `New feedback for *${service}* from *${user || 'anonymous'}*:\n${feedback}` }),
      });
    } catch (err) {
      console.error('Slack notification failed:', err);
      Sentry.captureException(err);
    }
  }

  // Send email notification with retry and HTML
  if (process.env.NOTIFY_EMAIL) {
    let attempts = 0;
    let sent = false;
    const mailOptions = {
      from: `Bujji Chat <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `Feedback for ${service}`,
      text: `Service: ${service}\nUser: ${user || 'anonymous'}\nFeedback: ${feedback}`,
      html: `<h2>Feedback for ${service}</h2><p><strong>User:</strong> ${user || 'anonymous'}</p><p>${feedback}</p>`,
    };
    while (!sent && attempts < 3) {
      try {
        await transporter.sendMail(mailOptions);
        sent = true;
      } catch (err) {
        attempts++;
        console.error(`Email send failed (attempt ${attempts}):`, err);
        Sentry.captureException(err);
        if (attempts >= 3) throw err;
        await new Promise((res) => setTimeout(res, 1000 * attempts));
      }
    }
  }

  // Custom webhook (example)
  if (process.env.FEEDBACK_WEBHOOK_URL) {
    try {
      await fetch(process.env.FEEDBACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, feedback, user }),
      });
    } catch (err) {
      console.error('Custom webhook failed:', err);
      Sentry.captureException(err);
    }
  }

  return { notified: true };
}
