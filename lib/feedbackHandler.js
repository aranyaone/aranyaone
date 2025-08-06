// Centralized feedback handler for custom processing
import { sendFeedbackNotification } from './notificationService';
import { analyzeFeedback } from './aiFeedback';

export async function handleFeedback({ service, feedback, user }) {
  // AI-powered analysis
  const ai = analyzeFeedback(feedback);
  console.log(`[Custom Feedback] Service: ${service} | User: ${user || 'anonymous'} | Message: ${feedback}`);
  // Send notification for each feedback
  await sendFeedbackNotification({ service, feedback, user, ai });
  // Store feedback for dashboard
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/feedbacks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service, feedback, user, ai }),
    });
  } catch (err) {
    console.error('Dashboard feedback store failed:', err);
  }
  await new Promise(resolve => setTimeout(resolve, 200));
  return { success: true, ai };
}
