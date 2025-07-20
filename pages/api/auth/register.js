// User registration API endpoint
import { auth } from '../../../lib/auth-manager'
import { logger } from '../../../lib/logger'

export default async function handler(req, res) {
  // Set security headers
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'POST') {
    try {
      const { email, password, name, role } = req.body

      // Validate input
      if (!email || !password || !name) {
        return res.status(400).json({
          error: 'Email, password, and name are required'
        })
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: 'Please provide a valid email address'
        })
      }

      // Password strength validation
      if (password.length < 8) {
        return res.status(400).json({
          error: 'Password must be at least 8 characters long'
        })
      }

      // Register user
      const result = await auth.register({
        email,
        password,
        name,
        role: role || 'user'
      })

      // Set secure HTTP-only cookies
      res.setHeader('Set-Cookie', [
        `refreshToken=${result.tokens.refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`,
        `accessToken=${result.tokens.accessToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`
      ])

      logger.businessEvent('user_registered', result.user.id, {
        email: result.user.email,
        name: result.user.name,
        ip: req.ip || req.connection.remoteAddress
      })

      res.status(201).json({
        success: true,
        user: result.user,
        accessToken: result.tokens.accessToken
      })
    } catch (error) {
      logger.warn('Registration failed', {
        email: req.body.email,
        error: error.message,
        ip: req.ip || req.connection.remoteAddress
      })

      if (error.message.includes('already exists')) {
        res.status(409).json({ error: error.message })
      } else {
        res.status(400).json({ error: error.message })
      }
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: 'Method not allowed' })
  }
}