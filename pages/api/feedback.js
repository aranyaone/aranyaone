import { handleFeedback } from '../../lib/feedbackHandler';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { service, feedback, user } = req.body;
  if (!service || !feedback) {
    return res.status(400).json({ error: 'Missing service or feedback' });
  }
  try {
    const result = await handleFeedback({ service, feedback, user });
    return res.status(200).json(result);
  } catch (err) {
    console.error('Feedback handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
