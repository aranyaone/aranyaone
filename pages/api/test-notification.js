import { sendFeedbackNotification } from '../../lib/notificationService';

export default async function handler(req, res) {
  try {
    const result = await sendFeedbackNotification({
      service: 'Test Service',
      feedback: 'This is a test feedback notification.',
      user: 'TestUser',
    });
    res.status(200).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
