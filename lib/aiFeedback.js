// AI-powered feedback utilities
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export function analyzeFeedback(feedback) {
  // Sentiment analysis
  const sentimentResult = sentiment.analyze(feedback);
  // Simple categorization (can be replaced with advanced ML)
  let category = 'General';
  if (/bug|error|issue|problem/i.test(feedback)) category = 'Bug Report';
  else if (/feature|request|suggest/i.test(feedback)) category = 'Feature Request';
  else if (/love|like|awesome|great|good/i.test(feedback)) category = 'Praise';

  return {
    sentiment: sentimentResult,
    category,
  };
}
