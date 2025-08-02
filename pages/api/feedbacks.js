// In-memory feedback store for demo (replace with DB in production)
let FEEDBACK_STORE = [];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ feedbacks: FEEDBACK_STORE });
  }
  if (req.method === 'POST') {
    const { service, feedback, user, ai } = req.body;
    FEEDBACK_STORE.push({ service, feedback, user, ai, date: Date.now() });
    return res.status(201).json({ success: true });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
