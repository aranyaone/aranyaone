// Real-time communication system with WebSocket support
import { WebSocketServer } from 'ws'
import { auth } from './auth-manager'
import { db } from './database'

class RealTimeManager {
  constructor() {
    this.clients = new Map()
    this.rooms = new Map()
    this.server = null
  }

  // Initialize WebSocket server
  initialize(httpServer) {
    this.server = new WebSocketServer({ 
      server: httpServer,
      path: '/ws'
    })

    this.server.on('connection', this.handleConnection.bind(this))
    console.log('WebSocket server initialized')
  }

  // Handle new WebSocket connections
  async handleConnection(ws, req) {
    try {
      // Authenticate connection
      const token = this.extractTokenFromRequest(req)
      if (!token) {
        ws.close(1008, 'Authentication required')
        return
      }

      const user = await auth.verifyToken(token)
      if (!user) {
        ws.close(1008, 'Invalid token')
        return
      }

      // Setup client
      const clientId = this.generateClientId()
      const client = {
        id: clientId,
        ws,
        user,
        rooms: new Set(),
        lastActivity: Date.now()
      }

      this.clients.set(clientId, client)
      ws.clientId = clientId

      // Send welcome message
      this.sendToClient(clientId, {
        type: 'connected',
        data: { clientId, user: { id: user.id, name: user.name } }
      })

      // Setup event handlers
      ws.on('message', (data) => this.handleMessage(clientId, data))
      ws.on('close', () => this.handleDisconnection(clientId))
      ws.on('error', (error) => this.handleError(clientId, error))

      // Join user to their personal room
      this.joinRoom(clientId, `user_${user.id}`)

      console.log(`Client ${clientId} connected for user ${user.id}`)
    } catch (error) {
      console.error('Connection error:', error)
      ws.close(1008, 'Connection failed')
    }
  }

  // Extract token from WebSocket request
  extractTokenFromRequest(req) {
    const url = new URL(req.url, 'ws://localhost')
    return url.searchParams.get('token')
  }

  // Handle incoming messages
  async handleMessage(clientId, data) {
    try {
      const client = this.clients.get(clientId)
      if (!client) return

      client.lastActivity = Date.now()

      const message = JSON.parse(data.toString())
      await this.processMessage(clientId, message)
    } catch (error) {
      console.error('Message handling error:', error)
      this.sendToClient(clientId, {
        type: 'error',
        data: { message: 'Invalid message format' }
      })
    }
  }

  // Process different message types
  async processMessage(clientId, message) {
    const client = this.clients.get(clientId)
    const { type, data } = message

    switch (type) {
      case 'join_room':
        this.joinRoom(clientId, data.room)
        break

      case 'leave_room':
        this.leaveRoom(clientId, data.room)
        break

      case 'analytics_update':
        await this.handleAnalyticsUpdate(clientId, data)
        break

      case 'dashboard_subscribe':
        await this.subscribeToDashboard(clientId)
        break

      case 'chat_message':
        await this.handleChatMessage(clientId, data)
        break

      case 'ping':
        this.sendToClient(clientId, { type: 'pong', data: { timestamp: Date.now() } })
        break

      default:
        this.sendToClient(clientId, {
          type: 'error',
          data: { message: `Unknown message type: ${type}` }
        })
    }
  }

  // Handle analytics updates
  async handleAnalyticsUpdate(clientId, data) {
    const client = this.clients.get(clientId)
    
    // Record analytics event
    await db.recordAnalyticsEvent({
      user_id: client.user.id,
      event_type: data.eventType,
      page: data.page,
      value: data.value || 1,
      metadata: data.metadata
    })

    // Broadcast to admin users if this is significant
    if (['conversion', 'purchase', 'signup'].includes(data.eventType)) {
      this.broadcastToAdmins({
        type: 'analytics_alert',
        data: {
          eventType: data.eventType,
          user: client.user.name,
          timestamp: new Date().toISOString()
        }
      })
    }
  }

  // Subscribe to dashboard updates
  async subscribeToDashboard(clientId) {
    const client = this.clients.get(clientId)
    
    // Join dashboard room
    this.joinRoom(clientId, 'dashboard')

    // Send initial dashboard data
    const dashboardData = await this.getDashboardData(client.user.id)
    this.sendToClient(clientId, {
      type: 'dashboard_data',
      data: dashboardData
    })
  }

  // Handle chat messages
  async handleChatMessage(clientId, data) {
    const client = this.clients.get(clientId)
    const { room, message } = data

    // Validate room access
    if (!this.canAccessRoom(client, room)) {
      this.sendToClient(clientId, {
        type: 'error',
        data: { message: 'Access denied to room' }
      })
      return
    }

    // Broadcast message to room
    const chatMessage = {
      type: 'chat_message',
      data: {
        id: this.generateMessageId(),
        room,
        user: { id: client.user.id, name: client.user.name },
        message,
        timestamp: new Date().toISOString()
      }
    }

    this.broadcastToRoom(room, chatMessage)
  }

  // Room management
  joinRoom(clientId, room) {
    const client = this.clients.get(clientId)
    if (!client) return

    if (!this.rooms.has(room)) {
      this.rooms.set(room, new Set())
    }

    this.rooms.get(room).add(clientId)
    client.rooms.add(room)

    this.sendToClient(clientId, {
      type: 'joined_room',
      data: { room }
    })
  }

  leaveRoom(clientId, room) {
    const client = this.clients.get(clientId)
    if (!client) return

    if (this.rooms.has(room)) {
      this.rooms.get(room).delete(clientId)
      if (this.rooms.get(room).size === 0) {
        this.rooms.delete(room)
      }
    }

    client.rooms.delete(room)

    this.sendToClient(clientId, {
      type: 'left_room',
      data: { room }
    })
  }

  // Broadcasting
  sendToClient(clientId, message) {
    const client = this.clients.get(clientId)
    if (client && client.ws.readyState === 1) { // WebSocket.OPEN
      client.ws.send(JSON.stringify(message))
    }
  }

  broadcastToRoom(room, message) {
    const clients = this.rooms.get(room)
    if (clients) {
      for (const clientId of clients) {
        this.sendToClient(clientId, message)
      }
    }
  }

  broadcastToAdmins(message) {
    for (const [clientId, client] of this.clients) {
      if (client.user.role === 'admin') {
        this.sendToClient(clientId, message)
      }
    }
  }

  broadcastToAll(message) {
    for (const [clientId] of this.clients) {
      this.sendToClient(clientId, message)
    }
  }

  // Handle disconnection
  handleDisconnection(clientId) {
    const client = this.clients.get(clientId)
    if (!client) return

    // Leave all rooms
    for (const room of client.rooms) {
      this.leaveRoom(clientId, room)
    }

    this.clients.delete(clientId)
    console.log(`Client ${clientId} disconnected`)
  }

  // Handle errors
  handleError(clientId, error) {
    console.error(`Client ${clientId} error:`, error)
    this.handleDisconnection(clientId)
  }

  // Data providers
  async getDashboardData(userId) {
    const [analytics, subscription] = await Promise.all([
      db.getAnalytics(userId, '7d'),
      db.getSubscription(userId)
    ])

    return {
      analytics: this.processAnalyticsForDashboard(analytics),
      subscription,
      timestamp: new Date().toISOString()
    }
  }

  processAnalyticsForDashboard(analytics) {
    const dailyStats = new Map()
    
    analytics.forEach(event => {
      const date = new Date(event.created_at).toDateString()
      if (!dailyStats.has(date)) {
        dailyStats.set(date, { views: 0, events: 0 })
      }
      
      const stats = dailyStats.get(date)
      if (event.event_type === 'page_view') {
        stats.views++
      }
      stats.events++
    })

    return Array.from(dailyStats.entries()).map(([date, stats]) => ({
      date,
      ...stats
    }))
  }

  // Utility methods
  generateClientId() {
    return 'client_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  generateMessageId() {
    return 'msg_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  canAccessRoom(client, room) {
    // Basic room access control
    if (room.startsWith('user_')) {
      const userId = room.split('_')[1]
      return client.user.id === userId || client.user.role === 'admin'
    }
    
    if (room === 'admin') {
      return client.user.role === 'admin'
    }

    return true // Public rooms
  }

  // Periodic tasks
  startPeriodicTasks() {
    // Clean up inactive connections
    setInterval(() => {
      const now = Date.now()
      const timeout = 5 * 60 * 1000 // 5 minutes

      for (const [clientId, client] of this.clients) {
        if (now - client.lastActivity > timeout) {
          console.log(`Cleaning up inactive client ${clientId}`)
          this.handleDisconnection(clientId)
        }
      }
    }, 60000) // Check every minute

    // Send periodic dashboard updates
    setInterval(async () => {
      if (this.rooms.has('dashboard')) {
        const adminStats = await db.getAdminStats()
        this.broadcastToRoom('dashboard', {
          type: 'dashboard_update',
          data: {
            stats: adminStats,
            timestamp: new Date().toISOString()
          }
        })
      }
    }, 30000) // Every 30 seconds
  }

  // Statistics
  getStats() {
    return {
      connectedClients: this.clients.size,
      activeRooms: this.rooms.size,
      roomDistribution: Array.from(this.rooms.entries()).map(([room, clients]) => ({
        room,
        clientCount: clients.size
      }))
    }
  }
}

// Singleton instance
export const realtime = new RealTimeManager()

// Client-side WebSocket manager
export class WebSocketClient {
  constructor() {
    this.ws = null
    this.token = null
    this.listeners = new Map()
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
  }

  connect(token) {
    if (typeof window === 'undefined') return // Server-side guard

    this.token = token
    const wsUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws?token=${token}`
    
    this.ws = new WebSocket(wsUrl)
    
    this.ws.onopen = () => {
      console.log('WebSocket connected')
      this.reconnectAttempts = 0
      this.emit('connected')
    }

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        this.emit(message.type, message.data)
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
      }
    }

    this.ws.onclose = (event) => {
      console.log('WebSocket disconnected:', event.code, event.reason)
      this.emit('disconnected', { code: event.code, reason: event.reason })
      this.handleReconnect()
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      this.emit('error', error)
    }
  }

  send(type, data = {}) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }))
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event).push(callback)
  }

  off(event, callback) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  emit(event, data) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = Math.pow(2, this.reconnectAttempts) * 1000 // Exponential backoff
      
      setTimeout(() => {
        console.log(`Reconnecting... (attempt ${this.reconnectAttempts})`)
        this.connect(this.token)
      }, delay)
    } else {
      console.error('Max reconnect attempts reached')
      this.emit('max_reconnect_attempts')
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

export default realtime