import Head from 'next/head'
import { useState } from 'react'

export default function SEOOptimizer() {
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [seoScore, setSeoScore] = useState(null)
  const [recommendations, setRecommendations] = useState([])

  const analyzeSEO = async () => {
    if (!url.trim()) return

    setIsAnalyzing(true)
    
    // Simulate SEO analysis
    setTimeout(() => {
      setSeoScore({
        overall: 78,
        technical: 85,
        content: 72,
        performance: 81,
        accessibility: 76
      })
      
      setRecommendations([
        {
          category: 'Technical SEO',
          priority: 'high',
          issue: 'Missing meta description',
          solution: 'Add descriptive meta descriptions for better search snippets',
          impact: '+12% CTR improvement'
        },
        {
          category: 'Performance',
          priority: 'medium',
          issue: 'Large image files',
          solution: 'Optimize images with WebP format and compression',
          impact: '35% faster load time'
        },
        {
          category: 'Content',
          priority: 'high',
          issue: 'Missing H1 tags',
          solution: 'Add proper heading structure with H1 tags',
          impact: 'Better content hierarchy'
        },
        {
          category: 'Accessibility',
          priority: 'medium',
          issue: 'Low color contrast',
          solution: 'Improve color contrast ratio to meet WCAG standards',
          impact: 'Better user experience'
        }
      ])
      
      setIsAnalyzing(false)
    }, 3000)
  }

  const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${url}/dashboard</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${url}/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${url}/analytics</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${url}/bujji-ai</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`

    const blob = new Blob([sitemap], { type: 'application/xml' })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = 'sitemap.xml'
    link.click()
  }

  const seoTools = [
    {
      name: 'Keyword Research',
      icon: '🔍',
      description: 'AI-powered keyword analysis and suggestions',
      action: 'Research Keywords'
    },
    {
      name: 'Meta Tag Generator',
      icon: '🏷️',
      description: 'Generate optimized meta titles and descriptions',
      action: 'Generate Meta Tags'
    },
    {
      name: 'Schema Markup',
      icon: '📊',
      description: 'Add structured data for better search results',
      action: 'Add Schema'
    },
    {
      name: 'Sitemap Generator',
      icon: '🗺️',
      description: 'Create XML sitemaps for search engines',
      action: 'Generate Sitemap'
    },
    {
      name: 'Speed Optimization',
      icon: '⚡',
      description: 'Performance recommendations for better rankings',
      action: 'Optimize Speed'
    },
    {
      name: 'Content Analysis',
      icon: '📝',
      description: 'SEO content scoring and improvement suggestions',
      action: 'Analyze Content'
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>SEO Optimizer - Aranya One</title>
        <meta name="description" content="Comprehensive SEO analysis and optimization tools" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
            🔍 SEO Optimizer
          </h1>
          <p className="text-gray-600 text-lg">
            Advanced SEO analysis, optimization tools, and search engine ranking improvements
          </p>
        </div>

        {/* URL Analysis */}
        <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 mb-8">
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
            📊 Website SEO Analysis
          </h2>
          <div className="flex space-x-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website URL (e.g., https://aranyaone.vercel.app)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-purple-500 focus:border-transparent"
            />
            <button
              onClick={analyzeSEO}
              disabled={!url.trim() || isAnalyzing}
              className="bg-royal-purple-500 hover:bg-royal-purple-600 disabled:bg-gray-300 text-white px-8 py-3 rounded-xl transition-colors duration-300 flex items-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Analyze SEO</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* SEO Score Dashboard */}
        {seoScore && (
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 mb-8">
            <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
              📈 SEO Score Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#9333ea"
                      strokeWidth="3"
                      strokeDasharray={`${seoScore.overall}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{seoScore.overall}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">Overall Score</h3>
              </div>

              {Object.entries(seoScore).filter(([key]) => key !== 'overall').map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={value >= 80 ? "#10b981" : value >= 60 ? "#f59e0b" : "#ef4444"}
                        strokeWidth="3"
                        strokeDasharray={`${value}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">{value}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-700 capitalize">{key}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 mb-8">
            <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
              💡 SEO Recommendations
            </h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className={`p-4 rounded-xl border-l-4 ${
                  rec.priority === 'high' ? 'bg-red-50 border-red-400' : 'bg-yellow-50 border-yellow-400'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {rec.priority.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-600">{rec.category}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{rec.issue}</h3>
                      <p className="text-gray-700 text-sm mb-2">{rec.solution}</p>
                      <div className="text-green-600 text-sm font-medium">{rec.impact}</div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Fix Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Tools */}
        <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">
            🛠️ SEO Tools & Utilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seoTools.map((tool, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <button 
                  onClick={tool.name === 'Sitemap Generator' ? generateSitemap : undefined}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  {tool.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}