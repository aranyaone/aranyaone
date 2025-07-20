// Comprehensive logging and monitoring system
import fs from 'fs'
import path from 'path'

class Logger {
  constructor() {
    this.logLevels = {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3
    }
    
    this.currentLevel = this.logLevels[process.env.LOG_LEVEL] ?? this.logLevels.INFO
    this.logDir = process.env.LOG_DIR || './logs'
    this.maxLogSize = 10 * 1024 * 1024 // 10MB
    this.maxLogFiles = 5
    
    this.ensureLogDirectory()
    this.setupPerformanceMonitoring()
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true })
    }
  }

  // Core logging methods
  log(level, message, metadata = {}) {
    if (this.logLevels[level] > this.currentLevel) return

    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata: {
        ...metadata,
        pid: process.pid,
        hostname: process.env.HOSTNAME || 'localhost',
        service: 'aranya-one'
      }
    }

    // Console output with colors
    this.outputToConsole(logEntry)
    
    // File output
    this.outputToFile(logEntry)
    
    // External monitoring (if configured)
    this.sendToExternalMonitoring(logEntry)
  }

  error(message, error = null, metadata = {}) {
    const errorMetadata = {
      ...metadata,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code
      } : null
    }
    
    this.log('ERROR', message, errorMetadata)
  }

  warn(message, metadata = {}) {
    this.log('WARN', message, metadata)
  }

  info(message, metadata = {}) {
    this.log('INFO', message, metadata)
  }

  debug(message, metadata = {}) {
    this.log('DEBUG', message, metadata)
  }

  // Performance logging
  performance(operation, duration, metadata = {}) {
    this.log('INFO', `Performance: ${operation}`, {
      ...metadata,
      duration_ms: duration,
      operation,
      type: 'performance'
    })
  }

  // API request logging
  apiRequest(req, res, duration) {
    const logData = {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration_ms: duration,
      user_agent: req.headers['user-agent'],
      ip: req.ip || req.connection.remoteAddress,
      user_id: req.user?.id,
      type: 'api_request'
    }

    if (res.statusCode >= 400) {
      this.warn(`API Error: ${req.method} ${req.url}`, logData)
    } else {
      this.info(`API Request: ${req.method} ${req.url}`, logData)
    }
  }

  // Database operation logging
  dbOperation(operation, table, duration, success = true, error = null) {
    const logData = {
      operation,
      table,
      duration_ms: duration,
      success,
      type: 'database_operation'
    }

    if (!success && error) {
      this.error(`Database Error: ${operation} on ${table}`, error, logData)
    } else {
      this.debug(`Database Operation: ${operation} on ${table}`, logData)
    }
  }

  // Business event logging
  businessEvent(event, userId, metadata = {}) {
    this.info(`Business Event: ${event}`, {
      ...metadata,
      event,
      user_id: userId,
      type: 'business_event'
    })
  }

  // Security event logging
  securityEvent(event, userId = null, metadata = {}) {
    this.warn(`Security Event: ${event}`, {
      ...metadata,
      event,
      user_id: userId,
      type: 'security_event'
    })
  }

  // Console output with colors
  outputToConsole(logEntry) {
    const colors = {
      ERROR: '\x1b[31m', // Red
      WARN: '\x1b[33m',  // Yellow
      INFO: '\x1b[36m',  // Cyan
      DEBUG: '\x1b[90m'  // Gray
    }
    
    const reset = '\x1b[0m'
    const color = colors[logEntry.level] || ''
    
    const timestamp = logEntry.timestamp.substring(11, 19) // HH:MM:SS
    const level = logEntry.level.padEnd(5)
    
    console.log(
      `${color}[${timestamp}] ${level}${reset} ${logEntry.message}`,
      Object.keys(logEntry.metadata).length > 3 ? logEntry.metadata : ''
    )
  }

  // File output with rotation
  outputToFile(logEntry) {
    const filename = `${logEntry.level.toLowerCase()}.log`
    const filepath = path.join(this.logDir, filename)
    const logLine = JSON.stringify(logEntry) + '\n'

    try {
      // Check file size and rotate if necessary
      if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath)
        if (stats.size > this.maxLogSize) {
          this.rotateLogFile(filepath)
        }
      }

      fs.appendFileSync(filepath, logLine)
    } catch (error) {
      console.error('Failed to write to log file:', error)
    }
  }

  // Log file rotation
  rotateLogFile(filepath) {
    const dir = path.dirname(filepath)
    const filename = path.basename(filepath, '.log')
    
    // Remove oldest log file
    const oldestFile = path.join(dir, `${filename}.${this.maxLogFiles}.log`)
    if (fs.existsSync(oldestFile)) {
      fs.unlinkSync(oldestFile)
    }

    // Shift existing log files
    for (let i = this.maxLogFiles - 1; i >= 1; i--) {
      const currentFile = path.join(dir, `${filename}.${i}.log`)
      const nextFile = path.join(dir, `${filename}.${i + 1}.log`)
      
      if (fs.existsSync(currentFile)) {
        fs.renameSync(currentFile, nextFile)
      }
    }

    // Move current log to .1
    const firstRotatedFile = path.join(dir, `${filename}.1.log`)
    fs.renameSync(filepath, firstRotatedFile)
  }

  // External monitoring integration
  sendToExternalMonitoring(logEntry) {
    if (process.env.NODE_ENV === 'production') {
      // Would integrate with services like DataDog, New Relic, etc.
      // For now, just console output for demo
      if (logEntry.level === 'ERROR') {
        console.log('Would send to external monitoring:', logEntry)
      }
    }
  }

  // Performance monitoring setup
  setupPerformanceMonitoring() {
    if (typeof process !== 'undefined') {
      // Monitor memory usage
      setInterval(() => {
        const memUsage = process.memoryUsage()
        
        if (memUsage.heapUsed / memUsage.heapTotal > 0.9) {
          this.warn('High memory usage detected', {
            heap_used_mb: Math.round(memUsage.heapUsed / 1024 / 1024),
            heap_total_mb: Math.round(memUsage.heapTotal / 1024 / 1024),
            usage_percentage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100)
          })
        }
      }, 30000) // Check every 30 seconds
    }
  }

  // Get log statistics
  getStats() {
    const stats = {
      logFiles: [],
      totalSize: 0
    }

    try {
      const files = fs.readdirSync(this.logDir)
      
      for (const file of files) {
        if (file.endsWith('.log')) {
          const filepath = path.join(this.logDir, file)
          const fileStats = fs.statSync(filepath)
          
          stats.logFiles.push({
            name: file,
            size: fileStats.size,
            modified: fileStats.mtime
          })
          
          stats.totalSize += fileStats.size
        }
      }
    } catch (error) {
      this.error('Failed to get log stats', error)
    }

    return stats
  }
}

// Error handling utilities
export class ErrorHandler {
  constructor(logger) {
    this.logger = logger
    this.setupGlobalHandlers()
  }

  setupGlobalHandlers() {
    // Unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      this.logger.error('Unhandled Promise Rejection', reason, {
        promise: promise.toString(),
        type: 'unhandled_rejection'
      })
    })

    // Uncaught exceptions
    process.on('uncaughtException', (error) => {
      this.logger.error('Uncaught Exception', error, {
        type: 'uncaught_exception'
      })
      
      // Graceful shutdown
      process.exit(1)
    })
  }

  // Wrap async functions with error handling
  wrapAsync(fn) {
    return async (...args) => {
      try {
        return await fn(...args)
      } catch (error) {
        this.logger.error(`Error in ${fn.name}`, error)
        throw error
      }
    }
  }

  // API error handler middleware
  apiErrorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    
    this.logger.error('API Error', err, {
      url: req.url,
      method: req.method,
      user_id: req.user?.id,
      status_code: statusCode
    })

    res.status(statusCode).json({
      error: {
        message,
        code: err.code,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      }
    })
  }

  // Database error handler
  handleDatabaseError(error, operation, table) {
    this.logger.error(`Database Error: ${operation}`, error, {
      operation,
      table,
      error_code: error.code
    })

    // Return user-friendly error message
    return {
      success: false,
      error: 'Database operation failed',
      code: 'DB_ERROR'
    }
  }

  // Validation error handler
  handleValidationError(errors, context) {
    this.logger.warn('Validation Error', {
      errors,
      context,
      type: 'validation_error'
    })

    return {
      success: false,
      error: 'Validation failed',
      details: errors
    }
  }
}

// Performance monitoring utilities
export class PerformanceMonitor {
  constructor(logger) {
    this.logger = logger
    this.metrics = new Map()
  }

  // Start timing an operation
  startTimer(operation) {
    const startTime = process.hrtime.bigint()
    return {
      stop: () => {
        const endTime = process.hrtime.bigint()
        const duration = Number((endTime - startTime) / BigInt(1000000)) // Convert to milliseconds
        this.logger.performance(operation, duration)
        return duration
      }
    }
  }

  // Middleware for timing API requests
  timingMiddleware(req, res, next) {
    const timer = this.startTimer(`${req.method} ${req.route?.path || req.url}`)
    
    res.on('finish', () => {
      const duration = timer.stop()
      this.logger.apiRequest(req, res, duration)
    })

    next()
  }

  // Database operation timer
  timeDbOperation(operation, table, fn) {
    return async (...args) => {
      const timer = this.startTimer(`${operation}_${table}`)
      let success = true
      let error = null

      try {
        const result = await fn(...args)
        return result
      } catch (err) {
        success = false
        error = err
        throw err
      } finally {
        const duration = timer.stop()
        this.logger.dbOperation(operation, table, duration, success, error)
      }
    }
  }

  // Memory usage tracking
  trackMemoryUsage() {
    const usage = process.memoryUsage()
    
    this.logger.debug('Memory Usage', {
      heap_used_mb: Math.round(usage.heapUsed / 1024 / 1024),
      heap_total_mb: Math.round(usage.heapTotal / 1024 / 1024),
      external_mb: Math.round(usage.external / 1024 / 1024),
      rss_mb: Math.round(usage.rss / 1024 / 1024)
    })

    return usage
  }
}

// Singleton instances
export const logger = new Logger()
export const errorHandler = new ErrorHandler(logger)
export const performanceMonitor = new PerformanceMonitor(logger)

// Utility decorators
export function logPerformance(target, propertyName, descriptor) {
  const method = descriptor.value

  descriptor.value = async function (...args) {
    const timer = performanceMonitor.startTimer(`${target.constructor.name}.${propertyName}`)
    
    try {
      const result = await method.apply(this, args)
      timer.stop()
      return result
    } catch (error) {
      timer.stop()
      throw error
    }
  }

  return descriptor
}

export function handleErrors(target, propertyName, descriptor) {
  const method = descriptor.value

  descriptor.value = async function (...args) {
    try {
      return await method.apply(this, args)
    } catch (error) {
      logger.error(`Error in ${target.constructor.name}.${propertyName}`, error)
      throw error
    }
  }

  return descriptor
}

export default logger