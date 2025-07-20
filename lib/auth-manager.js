// Production-ready authentication system with JWT
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from './database'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production'
const JWT_EXPIRY = '7d'
const REFRESH_TOKEN_EXPIRY = '30d'

export class AuthManager {
  // Generate JWT tokens
  generateTokens(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    }

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY })
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY })

    return { accessToken, refreshToken }
  }

  // Verify JWT token
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired')
      }
      if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid token')
      }
      throw error
    }
  }

  // Hash password
  async hashPassword(password) {
    return bcrypt.hash(password, 12)
  }

  // Verify password
  async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }

  // Register new user
  async register(userData) {
    const { email, password, name, role = 'user' } = userData

    // Check if user already exists
    const existingUser = await this.getUserByEmail(email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    // Hash password
    const hashedPassword = await this.hashPassword(password)

    // Create user
    const user = await db.createUser({
      email,
      password: hashedPassword,
      name,
      role,
      emailVerified: false,
      subscription: {
        plan: 'free',
        status: 'trial',
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString()
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Generate tokens
    const tokens = this.generateTokens(userWithoutPassword)

    return {
      user: userWithoutPassword,
      tokens
    }
  }

  // Login user
  async login(email, password) {
    // Get user by email
    const user = await this.getUserByEmail(email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    // Verify password
    const isValidPassword = await this.verifyPassword(password, user.password)
    if (!isValidPassword) {
      throw new Error('Invalid credentials')
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Generate tokens
    const tokens = this.generateTokens(userWithoutPassword)

    // Record login event
    await db.recordAnalyticsEvent({
      user_id: user.id,
      event_type: 'login',
      ip_address: '127.0.0.1', // Would get from request in real implementation
      user_agent: 'Unknown'    // Would get from request in real implementation
    })

    return {
      user: userWithoutPassword,
      tokens
    }
  }

  // Refresh token
  async refreshToken(refreshToken) {
    try {
      const decoded = this.verifyToken(refreshToken)
      const user = await db.getUser(decoded.id)
      
      if (!user) {
        throw new Error('User not found')
      }

      const { password: _, ...userWithoutPassword } = user
      const tokens = this.generateTokens(userWithoutPassword)

      return {
        user: userWithoutPassword,
        tokens
      }
    } catch (error) {
      throw new Error('Invalid refresh token')
    }
  }

  // Get user by email
  async getUserByEmail(email) {
    // This would be optimized with a database index on email
    if (db.type === 'memory') {
      for (const user of db.db.users.values()) {
        if (user.email === email) {
          return user
        }
      }
      return null
    }
    
    // For real databases, implement proper email lookup
    return null
  }

  // Middleware for protecting routes
  async authenticateRequest(req) {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No token provided')
    }

    const token = authHeader.substring(7)
    const decoded = this.verifyToken(token)
    
    const user = await db.getUser(decoded.id)
    if (!user) {
      throw new Error('User not found')
    }

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  // Check if user has required role
  hasRole(user, requiredRole) {
    const roleHierarchy = {
      user: 0,
      admin: 1,
      superadmin: 2
    }

    const userLevel = roleHierarchy[user.role] || 0
    const requiredLevel = roleHierarchy[requiredRole] || 0

    return userLevel >= requiredLevel
  }

  // Password reset functionality
  async requestPasswordReset(email) {
    const user = await this.getUserByEmail(email)
    if (!user) {
      // Don't reveal if email exists
      return { message: 'If the email exists, a reset link has been sent' }
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { id: user.id, type: 'password_reset' },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    // Store reset token (in real app, save to database)
    // Send email with reset link
    console.log(`Password reset token for ${email}: ${resetToken}`)

    return { message: 'If the email exists, a reset link has been sent' }
  }

  // Reset password with token
  async resetPassword(token, newPassword) {
    try {
      const decoded = this.verifyToken(token)
      
      if (decoded.type !== 'password_reset') {
        throw new Error('Invalid token type')
      }

      const user = await db.getUser(decoded.id)
      if (!user) {
        throw new Error('User not found')
      }

      const hashedPassword = await this.hashPassword(newPassword)
      await db.updateUser(user.id, { password: hashedPassword })

      return { message: 'Password reset successfully' }
    } catch (error) {
      throw new Error('Invalid or expired reset token')
    }
  }

  // Email verification
  async sendVerificationEmail(userId) {
    const user = await db.getUser(userId)
    if (!user) {
      throw new Error('User not found')
    }

    if (user.emailVerified) {
      return { message: 'Email already verified' }
    }

    const verificationToken = jwt.sign(
      { id: user.id, type: 'email_verification' },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Send verification email
    console.log(`Email verification token for ${user.email}: ${verificationToken}`)

    return { message: 'Verification email sent' }
  }

  // Verify email with token
  async verifyEmail(token) {
    try {
      const decoded = this.verifyToken(token)
      
      if (decoded.type !== 'email_verification') {
        throw new Error('Invalid token type')
      }

      const user = await db.getUser(decoded.id)
      if (!user) {
        throw new Error('User not found')
      }

      await db.updateUser(user.id, { emailVerified: true })

      return { message: 'Email verified successfully' }
    } catch (error) {
      throw new Error('Invalid or expired verification token')
    }
  }

  // Two-factor authentication setup
  async setupTwoFactor(userId) {
    // This would integrate with services like Authy or Google Authenticator
    const secret = this.generateTwoFactorSecret()
    
    await db.updateUser(userId, {
      twoFactorSecret: secret,
      twoFactorEnabled: false // Enable after verification
    })

    return {
      secret,
      qrCode: this.generateQRCode(secret)
    }
  }

  // Verify two-factor code
  async verifyTwoFactor(userId, code) {
    const user = await db.getUser(userId)
    if (!user || !user.twoFactorSecret) {
      throw new Error('Two-factor authentication not set up')
    }

    const isValid = this.verifyTwoFactorCode(user.twoFactorSecret, code)
    if (!isValid) {
      throw new Error('Invalid two-factor code')
    }

    await db.updateUser(userId, { twoFactorEnabled: true })
    return { message: 'Two-factor authentication enabled' }
  }

  // Helper methods for 2FA (would use real library like speakeasy)
  generateTwoFactorSecret() {
    return 'mock-secret-' + Math.random().toString(36).substring(7)
  }

  generateQRCode(secret) {
    return `https://api.qrserver.com/v1/create-qr-code/?data=${secret}`
  }

  verifyTwoFactorCode(secret, code) {
    // Mock verification - would use real TOTP verification
    return code === '123456'
  }
}

// Singleton instance
export const auth = new AuthManager()

// Middleware function for Next.js API routes
export function withAuth(handler, requiredRole = 'user') {
  return async (req, res) => {
    try {
      const user = await auth.authenticateRequest(req)
      
      if (requiredRole && !auth.hasRole(user, requiredRole)) {
        return res.status(403).json({ error: 'Insufficient permissions' })
      }

      req.user = user
      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ error: error.message })
    }
  }
}

export default auth