export default function handler(req, res) {
  // Return a static version string for auto-update notification
  res.status(200).json({ version: '2025.08.01' });
}
