// AI insights API endpoint for Brain Room
import { withAuth } from '../../../lib/auth-manager'
import { aiEngine } from '../../../lib/ai-engine'
import { db } from '../../../lib/database'
import { logger, performanceMonitor } from '../../../lib/logger'

async function handler(req, res) {
  const timer = performanceMonitor.startTimer('ai_insights_generation')

  try {
    // Set headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Cache-Control', 'private, max-age=300') // Cache for 5 minutes
    
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }

    if (req.method === 'GET') {
      const userId = req.user.id
      const timeRange = req.query.range || '30d'
      const type = req.query.type || 'comprehensive'

      // Check subscription plan for AI access
      const subscription = await db.getSubscription(userId)
      if (subscription?.plan === 'free') {
        return res.status(403).json({
          error: 'AI insights require a Pro or Enterprise plan',
          code: 'PLAN_UPGRADE_REQUIRED',
          upgradeUrl: '/pricing'
        })
      }

      let insights
      
      switch (type) {
        case 'comprehensive':
          insights = await aiEngine.generateInsights(userId, timeRange)
          break
        case 'trends':
          const analytics = await db.getAnalytics(userId, timeRange)
          insights = { trends: await aiEngine.analyzeTrends(analytics) }
          break
        case 'predictions':
          const analyticsData = await db.getAnalytics(userId, timeRange)
          insights = { predictions: await aiEngine.generatePredictions(analyticsData) }
          break
        case 'recommendations':
          const analyticsForRecs = await db.getAnalytics(userId, timeRange)
          insights = { 
            recommendations: await aiEngine.generateRecommendations(analyticsForRecs, subscription) 
          }
          break
        default:
          return res.status(400).json({
            error: 'Invalid insight type',
            validTypes: ['comprehensive', 'trends', 'predictions', 'recommendations']
          })
      }

      const duration = timer.stop()

      logger.businessEvent('ai_insights_generated', userId, {
        type,
        timeRange,
        processingTime: duration,
        plan: subscription.plan
      })

      res.status(200).json({
        insights,
        meta: {
          type,
          timeRange,
          generatedAt: new Date().toISOString(),
          processingTime: duration,
          userId,
          plan: subscription.plan
        }
      })
    }
    
    else if (req.method === 'POST') {
      const userId = req.user.id
      const { eventType, eventData } = req.body

      if (!eventType) {
        return res.status(400).json({ error: 'Event type is required' })
      }

      // Process real-time event
      const analysis = await aiEngine.processRealTimeEvent({
        user_id: userId,
        event_type: eventType,
        ...eventData,
        timestamp: new Date().toISOString()
      })

      const duration = timer.stop()

      res.status(200).json({
        analysis,
        processed: true,
        processingTime: duration
      })
    }
    
    else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    timer.stop()
    logger.error('AI insights API error', error, { 
      userId: req.user?.id,
      method: req.method,
      query: req.query 
    })
    
    res.status(500).json({
      error: 'Failed to generate AI insights',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}

export default withAuth(handler, 'user')