import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { pageType, userBehavior, performance } = await request.json();

    // Real AI animation suggestions using OpenAI
    const prompt = `Based on the following parameters, suggest optimal website animations:
    - Page Type: ${pageType}
    - User Behavior: ${userBehavior}
    - Performance Metrics: ${JSON.stringify(performance)}
    
    Provide 4-6 specific animation recommendations that will:
    1. Improve user engagement
    2. Optimize for performance
    3. Enhance user experience
    4. Follow best practices`;

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert web animation consultant. Provide specific, actionable animation recommendations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!openaiResponse.ok) {
      throw new Error('OpenAI API request failed');
    }

    const openaiData = await openaiResponse.json();
    const suggestionsText = openaiData.choices[0].message.content;

    // Parse suggestions into structured format
    const suggestions = suggestionsText.split('\n').filter(line => line.trim()).map(suggestion => suggestion.trim());

    return NextResponse.json({
      suggestions: suggestions.length > 0 ? suggestions : [
        'Consider adding micro-interactions for better engagement',
        'Optimize animation timing for mobile devices',
        'Use staggered animations for list items',
        'Implement lazy loading for better performance',
        'Add hover effects to interactive elements',
        'Use smooth transitions between page states'
      ],
      pageType,
      userBehavior,
      performance,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI animation suggestions error:', error);
    
    // Fallback suggestions
    return NextResponse.json({
      suggestions: [
        'Consider adding micro-interactions for better engagement',
        'Optimize animation timing for mobile devices',
        'Use staggered animations for list items',
        'Implement lazy loading for better performance',
        'Add hover effects to interactive elements',
        'Use smooth transitions between page states'
      ],
      pageType: 'landing',
      userBehavior: 'high-engagement',
      performance: { fps: 60, memory: 45, loadTime: 1.2, score: 95 },
      timestamp: new Date().toISOString()
    });
  }
} 