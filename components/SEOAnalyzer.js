import { useState, useEffect } from 'react'

export default function SEOAnalyzer({ url = 'https://aranyaone.vercel.app' }) {
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    performSEOAnalysis()
  }, [url])

  const performSEOAnalysis = async () => {
    setIsAnalyzing(true)
    
    // Simulate SEO analysis
    setTimeout(() => {
      const mockAnalysis = {
        overallScore: 87,
        performance: {
          score: 92,
          issues: ['Consider lazy loading images', 'Optimize CSS delivery'],
          improvements: ['Great Core Web Vitals', 'Fast loading times']
        },
        seo: {
          score: 85,
          issues: ['Missing alt text on 2 images', 'Some headings out of order'],
          improvements: ['Good meta descriptions', 'Proper heading structure', 'Clean URLs']
        },
        accessibility: {
          score: 90,
          issues: ['Low contrast on some buttons', 'Missing form labels'],
          improvements: ['Good ARIA support', 'Keyboard navigation', 'Screen reader friendly']
        },
        bestPractices: {
          score: 88,
          issues: ['Some console errors detected', 'HTTP/HTTPS mixed content'],
          improvements: ['Security headers present', 'No vulnerable libraries']
        },
        keywords: {
          primary: ['AI dashboard', 'digital empire', 'analytics platform'],
          secondary: ['business intelligence', 'automation tools', 'data visualization'],
          density: 2.3,
          distribution: 'Good'
        },
        technical: {
          sitemap: true,
          robotsTxt: true,
          structuredData: true,
          mobileOptimized: true,
          pageSpeed: '2.1s',
          https: true
        }
      }
      
      setAnalysis(mockAnalysis)
      setScore(mockAnalysis.overallScore)
      setIsAnalyzing(false)
    }, 3000)
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const ScoreCard = ({ title, score, issues, improvements }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(score)}`}>
          {score}/100
        </div>
      </div>
      
      {improvements.length > 0 && (
        <div className="mb-3">
          <p className="text-sm font-medium text-green-800 mb-1">✅ Strengths:</p>
          <ul className="text-sm text-green-700 space-y-1">
            {improvements.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {issues.length > 0 && (
        <div>
          <p className="text-sm font-medium text-red-800 mb-1">⚠️ Issues to fix:</p>
          <ul className="text-sm text-red-700 space-y-1">
            {issues.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
          <h3 className="font-heading font-semibold text-lg text-gray-900">
            Analyzing SEO Performance...
          </h3>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-100 rounded p-3">
            <div className="flex items-center space-x-2">
              <div className="animate-pulse h-2 bg-blue-300 rounded w-1/4"></div>
              <span className="text-sm text-gray-600">Checking page structure...</span>
            </div>
          </div>
          <div className="bg-gray-100 rounded p-3">
            <div className="flex items-center space-x-2">
              <div className="animate-pulse h-2 bg-green-300 rounded w-1/3"></div>
              <span className="text-sm text-gray-600">Analyzing keywords...</span>
            </div>
          </div>
          <div className="bg-gray-100 rounded p-3">
            <div className="flex items-center space-x-2">
              <div className="animate-pulse h-2 bg-purple-300 rounded w-1/2"></div>
              <span className="text-sm text-gray-600">Evaluating performance...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <button
          onClick={performSEOAnalysis}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          🔍 Start SEO Analysis
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-xl text-gray-900 mb-2">
              🎯 SEO Performance Score
            </h3>
            <p className="text-gray-600">
              Overall website optimization rating
            </p>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold mb-1 ${getScoreColor(score).split(' ')[0]}`}>
              {score}
            </div>
            <div className="text-gray-500 text-sm">out of 100</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-3 w-full">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreCard
          title="🚀 Performance"
          score={analysis.performance.score}
          issues={analysis.performance.issues}
          improvements={analysis.performance.improvements}
        />
        <ScoreCard
          title="🔍 SEO"
          score={analysis.seo.score}
          issues={analysis.seo.issues}
          improvements={analysis.seo.improvements}
        />
        <ScoreCard
          title="♿ Accessibility"
          score={analysis.accessibility.score}
          issues={analysis.accessibility.issues}
          improvements={analysis.accessibility.improvements}
        />
        <ScoreCard
          title="⚡ Best Practices"
          score={analysis.bestPractices.score}
          issues={analysis.bestPractices.issues}
          improvements={analysis.bestPractices.improvements}
        />
      </div>

      {/* Keywords Analysis */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">🎯 Keyword Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Primary Keywords:</p>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.primary.map((keyword, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Secondary Keywords:</p>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.secondary.map((keyword, i) => (
                <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Keyword Density:</span>
            <span className="ml-2 font-medium">{analysis.keywords.density}%</span>
          </div>
          <div>
            <span className="text-gray-600">Distribution:</span>
            <span className="ml-2 font-medium text-green-600">{analysis.keywords.distribution}</span>
          </div>
        </div>
      </div>

      {/* Technical SEO */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">⚙️ Technical SEO</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(analysis.technical).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </span>
              <span className={`text-sm font-medium ${
                typeof value === 'boolean' 
                  ? value ? 'text-green-600' : 'text-red-600'
                  : 'text-gray-900'
              }`}>
                {typeof value === 'boolean' ? (value ? '✅' : '❌') : value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={performSEOAnalysis}
          className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          🔄 Re-analyze
        </button>
        <button className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
          📊 Export Report
        </button>
        <button className="flex-1 bg-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors">
          🚀 Auto-optimize
        </button>
      </div>
    </div>
  )
}