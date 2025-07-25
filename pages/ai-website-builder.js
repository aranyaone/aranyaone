import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import SyntaxHighlighter to reduce initial bundle size
const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then(mod => mod.Prism),
  { ssr: false, loading: () => <div className="bg-gray-100 p-4 rounded">Loading syntax highlighter...</div> }
)

const atomDark = dynamic(
  () => import('react-syntax-highlighter/dist/cjs/styles/prism').then(mod => mod.atomDark),
  { ssr: false }
)

export default function AIWebsiteBuilder() {
  const [prompt, setPrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewMode, setPreviewMode] = useState('code')
  const [selectedTemplate, setSelectedTemplate] = useState('landing')
  const iframeRef = useRef(null)

  const templates = [
    { id: 'landing', name: '🚀 Landing Page', description: 'Modern hero section with CTA' },
    { id: 'dashboard', name: '📊 Dashboard', description: 'Analytics and data visualization' },
    { id: 'ecommerce', name: '🛒 E-commerce', description: 'Product showcase and store' },
    { id: 'portfolio', name: '🎨 Portfolio', description: 'Creative showcase design' },
    { id: 'blog', name: '📝 Blog', description: 'Content-focused layout' },
    { id: 'saas', name: '💼 SaaS', description: 'Software as a service platform' }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    
    // Simulate AI code generation
    setTimeout(() => {
      const code = generateWebsiteCode(prompt, selectedTemplate)
      setGeneratedCode(code)
      setIsGenerating(false)
      
      // Update preview iframe
      if (iframeRef.current && previewMode === 'preview') {
        const iframe = iframeRef.current
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
        iframeDoc.open()
        iframeDoc.write(code)
        iframeDoc.close()
      }
    }, 2000)
  }

  const generateWebsiteCode = (userPrompt, template) => {
    const baseStyles = `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #9333ea 100%); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .btn { padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: all 0.3s; }
        .btn-primary { background: #9333ea; color: white; }
        .btn-primary:hover { background: #7c3aed; transform: translateY(-2px); }
        .card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .fade-in { animation: fadeIn 0.6s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      </style>
    `

    const templates = {
      landing: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AI Generated Landing Page</title>
          ${baseStyles}
        </head>
        <body>
          <div class="gradient-bg" style="min-height: 100vh; color: white; display: flex; align-items: center;">
            <div class="container fade-in">
              <div style="text-align: center; max-width: 800px; margin: 0 auto;">
                <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 1rem;">${userPrompt || 'Revolutionary Platform'}</h1>
                <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">Transform your ideas into reality with our cutting-edge AI-powered solutions.</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                  <button class="btn btn-primary">Get Started Free</button>
                  <button class="btn" style="background: rgba(255,255,255,0.2); color: white;">Watch Demo</button>
                </div>
              </div>
            </div>
          </div>
          <div style="padding: 4rem 0; background: #f8fafc;">
            <div class="container">
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div class="card fade-in">
                  <h3 style="color: #9333ea; margin-bottom: 1rem;">🚀 Fast Deployment</h3>
                  <p>Launch your projects in minutes, not hours. Our AI optimizes everything automatically.</p>
                </div>
                <div class="card fade-in">
                  <h3 style="color: #9333ea; margin-bottom: 1rem;">🎯 Smart Analytics</h3>
                  <p>Get actionable insights with our advanced AI-powered analytics dashboard.</p>
                </div>
                <div class="card fade-in">
                  <h3 style="color: #9333ea; margin-bottom: 1rem;">🔒 Enterprise Security</h3>
                  <p>Bank-level security with end-to-end encryption and compliance standards.</p>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      dashboard: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AI Generated Dashboard</title>
          ${baseStyles}
        </head>
        <body style="background: #f8fafc;">
          <div style="padding: 2rem 0;">
            <div class="container">
              <h1 style="color: #1f2937; margin-bottom: 2rem;">📊 Analytics Dashboard</h1>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                <div class="card">
                  <h3 style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.5rem;">TOTAL USERS</h3>
                  <div style="font-size: 2rem; font-weight: 700; color: #1f2937;">12,847</div>
                  <div style="color: #10b981; font-size: 0.875rem;">+12% this month</div>
                </div>
                <div class="card">
                  <h3 style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.5rem;">REVENUE</h3>
                  <div style="font-size: 2rem; font-weight: 700; color: #1f2937;">$45,231</div>
                  <div style="color: #10b981; font-size: 0.875rem;">+23% this month</div>
                </div>
                <div class="card">
                  <h3 style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.5rem;">CONVERSION</h3>
                  <div style="font-size: 2rem; font-weight: 700; color: #1f2937;">3.24%</div>
                  <div style="color: #10b981; font-size: 0.875rem;">+0.5% this month</div>
                </div>
              </div>
              <div class="card">
                <h2 style="margin-bottom: 1rem;">📈 Performance Overview</h2>
                <div style="height: 300px; background: linear-gradient(45deg, #9333ea, #3b82f6); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">
                  <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📈</div>
                    <div>Interactive Charts Loading...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      ecommerce: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AI Generated Store</title>
          ${baseStyles}
        </head>
        <body>
          <header class="gradient-bg" style="padding: 4rem 0; color: white;">
            <div class="container">
              <h1 style="font-size: 3rem; font-weight: 800; text-align: center; margin-bottom: 1rem;">${userPrompt || 'Premium Store'}</h1>
              <p style="text-align: center; font-size: 1.25rem; opacity: 0.9;">Discover amazing products crafted with care</p>
            </div>
          </header>
          <div style="padding: 4rem 0;">
            <div class="container">
              <h2 style="text-align: center; margin-bottom: 3rem; color: #1f2937;">Featured Products</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
                <div class="card" style="text-align: center;">
                  <div style="width: 100%; height: 200px; background: linear-gradient(45deg, #f3e8ff, #e9d5ff); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">🎧</div>
                  <h3 style="margin-bottom: 0.5rem;">Premium Headphones</h3>
                  <p style="color: #6b7280; margin-bottom: 1rem;">High-quality audio experience</p>
                  <div style="font-size: 1.5rem; font-weight: 700; color: #9333ea; margin-bottom: 1rem;">$299</div>
                  <button class="btn btn-primary" style="width: 100%;">Add to Cart</button>
                </div>
                <div class="card" style="text-align: center;">
                  <div style="width: 100%; height: 200px; background: linear-gradient(45deg, #dbeafe, #bfdbfe); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">💻</div>
                  <h3 style="margin-bottom: 0.5rem;">Smart Laptop</h3>
                  <p style="color: #6b7280; margin-bottom: 1rem;">AI-powered productivity</p>
                  <div style="font-size: 1.5rem; font-weight: 700; color: #9333ea; margin-bottom: 1rem;">$1,299</div>
                  <button class="btn btn-primary" style="width: 100%;">Add to Cart</button>
                </div>
                <div class="card" style="text-align: center;">
                  <div style="width: 100%; height: 200px; background: linear-gradient(45deg, #dcfce7, #bbf7d0); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">📱</div>
                  <h3 style="margin-bottom: 0.5rem;">Smart Phone</h3>
                  <p style="color: #6b7280; margin-bottom: 1rem;">Next-gen mobile technology</p>
                  <div style="font-size: 1.5rem; font-weight: 700; color: #9333ea; margin-bottom: 1rem;">$899</div>
                  <button class="btn btn-primary" style="width: 100%;">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    }

    return templates[template] || templates.landing
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
  }

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-generated-website.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>AI Website Builder - Aranya One</title>
        <meta name="description" content="Build stunning websites with AI-powered code generation" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-2">
            🚀 AI Website Builder
          </h1>
          <p className="text-gray-600 text-lg">
            Generate stunning websites with AI-powered code generation and live preview
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Template Selection */}
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-4">
                🎨 Choose Template
              </h2>
              <div className="space-y-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-300 ${
                      selectedTemplate === template.id
                        ? 'border-royal-purple-500 bg-royal-purple-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Prompt */}
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-4">
                🤖 AI Prompt
              </h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your website idea... e.g., 'A modern SaaS landing page for project management software with dark theme and pricing section'"
                className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-purple-500 focus:border-transparent resize-none"
              />
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full mt-4 bg-royal-purple-500 hover:bg-royal-purple-600 disabled:bg-gray-300 text-white py-3 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Generate Website</span>
                  </>
                )}
              </button>
            </div>

            {/* Generation Stats */}
            {generatedCode && (
              <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
                <h2 className="font-heading font-semibold text-xl text-gray-900 mb-4">
                  📊 Code Stats
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lines of Code</span>
                    <span className="font-semibold">{generatedCode.split('\n').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">File Size</span>
                    <span className="font-semibold">{(generatedCode.length / 1024).toFixed(1)} KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Template</span>
                    <span className="font-semibold capitalize">{selectedTemplate}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Code/Preview Panel */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setPreviewMode('code')}
                    className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors duration-300 ${
                      previewMode === 'code'
                        ? 'border-royal-purple-500 text-royal-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    💻 Code
                  </button>
                  <button
                    onClick={() => setPreviewMode('preview')}
                    className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors duration-300 ${
                      previewMode === 'preview'
                        ? 'border-royal-purple-500 text-royal-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    👁️ Preview
                  </button>
                  {generatedCode && (
                    <div className="ml-auto flex items-center space-x-2 px-6">
                      <button
                        onClick={copyToClipboard}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy to clipboard"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button
                        onClick={downloadCode}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Download HTML file"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-4-4V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                        </svg>
                      </button>
                    </div>
                  )}
                </nav>
              </div>

              {/* Content */}
              <div className="p-6" style={{ height: '600px' }}>
                {previewMode === 'code' ? (
                  <div className="h-full overflow-auto">
                    {generatedCode ? (
                      <SyntaxHighlighter
                        language="html"
                        style={atomDark}
                        className="rounded-lg"
                        showLineNumbers
                      >
                        {generatedCode}
                      </SyntaxHighlighter>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <div className="text-6xl mb-4">💻</div>
                          <p>Your generated code will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full">
                    {generatedCode ? (
                      <iframe
                        ref={iframeRef}
                        srcDoc={generatedCode}
                        className="w-full h-full border border-gray-200 rounded-lg"
                        title="Website Preview"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500 border border-gray-200 rounded-lg">
                        <div className="text-center">
                          <div className="text-6xl mb-4">👁️</div>
                          <p>Live preview will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}