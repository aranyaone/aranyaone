'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const QuantumPerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    pageLoadTime: 0,
    firstContentfulPaint: 0,
    timeToInteractive: 0,
    cumulativeLayoutShift: 0,
    performanceScore: 0
  })

  const [isMonitoring, setIsMonitoring] = useState(false)

  useEffect(() => {
    // Quantum Performance Monitoring
    const measurePerformance = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0]
        
        // Calculate advanced metrics
        const pageLoadTime = navigation.loadEventEnd - navigation.navigationStart
        const firstContentfulPaint = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
        const timeToInteractive = navigation.domInteractive - navigation.navigationStart
        
        // Calculate performance score (0-100)
        const calculateScore = () => {
          let score = 100
          if (pageLoadTime > 1000) score -= 20
          if (pageLoadTime > 2000) score -= 30
          if (firstContentfulPaint > 1000) score -= 15
          if (timeToInteractive > 1500) score -= 25
          return Math.max(score, 0)
        }

        setMetrics({
          pageLoadTime: Math.round(pageLoadTime),
          firstContentfulPaint: Math.round(firstContentfulPaint),
          timeToInteractive: Math.round(timeToInteractive),
          cumulativeLayoutShift: 0.01, // Simulated - would use Web Vitals API
          performanceScore: calculateScore()
        })
      }
    }

    // Initial measurement
    if (document.readyState === 'complete') {
      measurePerformance()
    } else {
      window.addEventListener('load', measurePerformance)
    }

    // Real-time monitoring
    const interval = setInterval(() => {
      measurePerformance()
      setIsMonitoring(prev => !prev)
    }, 5000)

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', measurePerformance)
    }
  }, [])

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 min-w-[300px] z-50"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800 flex items-center">
          <motion.div
            animate={{ rotate: isMonitoring ? 360 : 0 }}
            transition={{ duration: 1 }}
            className="w-3 h-3 bg-green-500 rounded-full mr-2"
          />
          Quantum Monitor
        </h3>
        <div className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(metrics.performanceScore)}`}>
          Score: {metrics.performanceScore}/100
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Page Load:</span>
          <span className="font-medium">{metrics.pageLoadTime}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">First Paint:</span>
          <span className="font-medium">{metrics.firstContentfulPaint}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Interactive:</span>
          <span className="font-medium">{metrics.timeToInteractive}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Layout Shift:</span>
          <span className="font-medium">{metrics.cumulativeLayoutShift}</span>
        </div>
      </div>

      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${metrics.performanceScore}%` }}
            transition={{ duration: 1 }}
            className={`h-2 rounded-full ${getScoreBg(metrics.performanceScore)}`}
          />
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-500 text-center">
        🚀 Quantum Performance Active
      </div>
    </motion.div>
  )
}

export default QuantumPerformanceMonitor
