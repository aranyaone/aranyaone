// Database abstraction layer for multiple backends
import { createClient } from '@supabase/supabase-js'

class DatabaseManager {
  constructor() {
    this.db = null
    this.type = process.env.DATABASE_TYPE || 'memory'
    this.initialize()
  }

  async initialize() {
    switch (this.type) {
      case 'supabase':
        this.db = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_ANON_KEY
        )
        break
      case 'postgresql':
        // PostgreSQL connection would go here
        console.log('PostgreSQL database configured')
        break
      case 'memory':
      default:
        this.db = new MemoryDatabase()
        console.log('Using in-memory database for development')
        break
    }
  }

  // User management
  async getUser(id) {
    if (this.type === 'supabase') {
      const { data, error } = await this.db
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    }
    
    return this.db.getUser(id)
  }

  async createUser(userData) {
    if (this.type === 'supabase') {
      const { data, error } = await this.db
        .from('users')
        .insert([userData])
        .select()
        .single()
      
      if (error) throw error
      return data
    }
    
    return this.db.createUser(userData)
  }

  async updateUser(id, updates) {
    if (this.type === 'supabase') {
      const { data, error } = await this.db
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    }
    
    return this.db.updateUser(id, updates)
  }

  // Analytics data
  async getAnalytics(userId, timeRange = '30d') {
    if (this.type === 'supabase') {
      const { data, error } = await this.db
        .from('analytics')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', this.getTimeRangeDate(timeRange))
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
    
    return this.db.getAnalytics(userId, timeRange)
  }

  async recordAnalyticsEvent(event) {
    if (this.type === 'supabase') {
      const { data, error } = await this.db
        .from('analytics')
        .insert([{
          ...event,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()
      
      if (error) throw error
      return data
    }
    
    return this.db.recordAnalyticsEvent(event)
  }

  // Subscription management
  async getSubscription(userId) {
    if (this.type === 'supabase') {
      const { data, error } = await this.db
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (error && error.code !== 'PGRST116') throw error
      return data
    }
    
    return this.db.getSubscription(userId)
  }

  async updateSubscription(userId, subscriptionData) {
    if (this.type === 'supabase') {
      const { data, error } = await this.db
        .from('subscriptions')
        .upsert([{
          user_id: userId,
          ...subscriptionData,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()
      
      if (error) throw error
      return data
    }
    
    return this.db.updateSubscription(userId, subscriptionData)
  }

  // Admin features
  async getAdminStats() {
    if (this.type === 'supabase') {
      // Complex queries for admin dashboard
      const [users, analytics, subscriptions] = await Promise.all([
        this.db.from('users').select('count'),
        this.db.from('analytics').select('*').gte('created_at', this.getTimeRangeDate('7d')),
        this.db.from('subscriptions').select('*')
      ])
      
      return {
        totalUsers: users.count,
        weeklyAnalytics: analytics.data,
        subscriptions: subscriptions.data
      }
    }
    
    return this.db.getAdminStats()
  }

  // Utility methods
  getTimeRangeDate(range) {
    const now = new Date()
    const days = parseInt(range.replace('d', '')) || 30
    const past = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000))
    return past.toISOString()
  }
}

// In-memory database for development
class MemoryDatabase {
  constructor() {
    this.users = new Map()
    this.analytics = []
    this.subscriptions = new Map()
    this.setupMockData()
  }

  setupMockData() {
    // Mock users
    this.users.set('1', {
      id: '1',
      email: 'admin@aranyaone.com',
      name: 'Aranya Admin',
      role: 'admin',
      created_at: new Date().toISOString()
    })

    // Mock analytics
    for (let i = 0; i < 30; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      this.analytics.push({
        id: i + 1,
        user_id: '1',
        event_type: 'page_view',
        page: '/dashboard',
        value: Math.floor(Math.random() * 100),
        created_at: date.toISOString()
      })
    }

    // Mock subscription
    this.subscriptions.set('1', {
      user_id: '1',
      plan: 'pro',
      status: 'active',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    })
  }

  getUser(id) {
    return this.users.get(id)
  }

  createUser(userData) {
    const id = (this.users.size + 1).toString()
    const user = {
      id,
      ...userData,
      created_at: new Date().toISOString()
    }
    this.users.set(id, user)
    return user
  }

  updateUser(id, updates) {
    const user = this.users.get(id)
    if (!user) throw new Error('User not found')
    
    const updated = { ...user, ...updates, updated_at: new Date().toISOString() }
    this.users.set(id, updated)
    return updated
  }

  getAnalytics(userId, timeRange) {
    const cutoff = new Date()
    const days = parseInt(timeRange.replace('d', '')) || 30
    cutoff.setDate(cutoff.getDate() - days)

    return this.analytics
      .filter(a => a.user_id === userId && new Date(a.created_at) >= cutoff)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  }

  recordAnalyticsEvent(event) {
    const analyticsEvent = {
      id: this.analytics.length + 1,
      ...event,
      created_at: new Date().toISOString()
    }
    this.analytics.push(analyticsEvent)
    return analyticsEvent
  }

  getSubscription(userId) {
    return this.subscriptions.get(userId)
  }

  updateSubscription(userId, subscriptionData) {
    const subscription = {
      user_id: userId,
      ...subscriptionData,
      updated_at: new Date().toISOString()
    }
    this.subscriptions.set(userId, subscription)
    return subscription
  }

  getAdminStats() {
    return {
      totalUsers: this.users.size,
      weeklyAnalytics: this.analytics.slice(0, 50),
      subscriptions: Array.from(this.subscriptions.values())
    }
  }
}

// Singleton instance
export const db = new DatabaseManager()
export default db