import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false)

  const coreNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '🎯' },
    { name: 'Services', href: '/services', icon: '⚙️' },
    { name: 'Analytics', href: '/analytics', icon: '📊' },
  ]

  const advancedTools = [
    { name: 'AI Website Builder', href: '/ai-website-builder', icon: '🚀', description: 'Generate websites with AI' },
    { name: 'Collaboration', href: '/collaboration', icon: '🤝', description: 'Real-time team workspace' },
    { name: 'API Management', href: '/api-management', icon: '🔗', description: 'Manage APIs and webhooks' },
    { name: 'Notifications', href: '/notifications', icon: '🔔', description: 'Smart alert system' },
    { name: 'Bujji AI', href: '/bujji-ai', icon: '🤖', description: 'Advanced AI assistant' },
    { name: 'Admin Panel', href: '/admin', icon: '🔧', description: 'System management' },
    { name: 'AI Generator', href: '/ai-generator', icon: '✨', description: 'Content generation' },
  ]

  const userNavigation = [
    { name: 'Support', href: '/support', icon: '💬' },
    { name: 'Docs', href: '/docs', icon: '📚' },
    { name: 'Profile', href: '/profile', icon: '👤' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-100 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl group-hover:scale-110 transition-transform">🌟</div>
            <span className="font-heading font-bold text-xl bg-royal-gradient bg-clip-text text-transparent">
              Aranya One
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Core Navigation */}
            {coreNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-gray-600 hover:text-royal-purple-600 transition-colors duration-200 group"
              >
                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* AI Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className="flex items-center space-x-1 text-gray-600 hover:text-royal-purple-600 transition-colors duration-200 group"
              >
                <span className="group-hover:scale-110 transition-transform">🤖</span>
                <span className="font-medium">AI Tools</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isToolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
                  {advancedTools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors group"
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg group-hover:scale-110 transition-transform">{tool.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-royal-purple-600">
                            {tool.name}
                          </div>
                          <div className="text-sm text-gray-500">{tool.description}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* User Navigation */}
            {userNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-1 transition-colors duration-200 group ${
                  item.name === 'Profile' 
                    ? 'bg-royal-purple-500 hover:bg-royal-purple-600 text-white px-3 py-2 rounded-lg font-medium'
                    : 'text-gray-600 hover:text-royal-purple-600'
                }`}
              >
                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* Theme Toggle */}
            <div className="bg-royal-gradient rounded-lg p-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="bg-royal-gradient rounded-lg p-2">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-royal-purple-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-soft-lg mt-2 border border-gray-100">
              {/* Core Navigation */}
              {coreNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-royal-purple-600 hover:bg-royal-purple-50 px-3 py-2 rounded-md transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              
              {/* AI Tools Section */}
              <div className="px-3 py-2">
                <div className="text-gray-500 text-sm font-medium mb-2 flex items-center space-x-1">
                  <span>🤖</span>
                  <span>AI Tools</span>
                </div>
                <div className="space-y-1 ml-4">
                  {advancedTools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="block py-1 text-gray-600 hover:text-royal-purple-600 transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {tool.icon} {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* User Navigation */}
              {userNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 transition-all duration-200 px-3 py-2 rounded-md ${
                    item.name === 'Profile'
                      ? 'bg-royal-purple-500 text-white'
                      : 'text-gray-600 hover:text-royal-purple-600 hover:bg-royal-purple-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}