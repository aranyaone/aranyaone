// Authentication API endpoints
import { auth } from '../../../lib/auth-manager'
import { logger } from '../../../lib/logger'

export default async function handler(req, res) {
  // Set security headers
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'POST') {
    try {
      const { email, password } = req.body

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          error: 'Email and password are required'
        })
      }

      // Attempt login
      const result = await auth.login(email, password)
      
      // Set secure HTTP-only cookie for refresh token
      res.setHeader('Set-Cookie', [
        `refreshToken=${result.tokens.refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`, // 30 days
        `accessToken=${result.tokens.accessToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}` // 7 days
      ])

      logger.securityEvent('user_login', result.user.id, {
        email: result.user.email,
        ip: req.ip || req.connection.remoteAddress,
        user_agent: req.headers['user-agent']
      })

      res.status(200).json({
        success: true,
        user: result.user,
        accessToken: result.tokens.accessToken // Also send in body for client storage
      })
    } catch (error) {
      logger.securityEvent('login_failed', null, {
        email: req.body.email,
        error: error.message,
        ip: req.ip || req.connection.remoteAddress,
        user_agent: req.headers['user-agent']
      })

      res.status(401).json({
        error: error.message
      })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: 'Method not allowed' })
  }
}