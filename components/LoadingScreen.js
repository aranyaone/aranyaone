import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-platinum-950 via-platinum-900 to-royal-950 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo */}
        <div className="w-20 h-20 bg-royal-gradient rounded-2xl flex items-center justify-center shadow-royal animate-float mb-8">
          <span className="text-3xl">👑</span>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gradient mb-6">Aranya One</h2>
        <p className="text-platinum-300 mb-8">Loading your digital empire...</p>
        
        {/* Progress Bar */}
        <div className="w-64 bg-platinum-700 rounded-full h-2 mb-4">
          <div 
            className="bg-royal-gradient h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        
        {/* Spinner */}
        <div className="inline-flex items-center space-x-2">
          <div className="spinner"></div>
          <span className="text-platinum-400 text-sm">{Math.round(Math.min(progress, 100))}%</span>
        </div>
      </div>
    </div>
  )
}