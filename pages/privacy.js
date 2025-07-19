import SEOHead from '../components/SEOHead'
import LuxuryFooter from '../components/LuxuryFooter'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-platinum-950 via-platinum-900 to-royal-950">
      <SEOHead 
        title="Privacy Policy"
        description="Aranya One Privacy Policy - Learn how we protect and handle your personal information with enterprise-grade security and transparency."
        url="/privacy"
      />
      
      <main className="relative">
        {/* Header Navigation */}
        <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-royal-gradient rounded-xl flex items-center justify-center shadow-royal">
                  <span className="text-xl">👑</span>
                </div>
                <span className="text-xl font-bold text-gradient">Aranya One</span>
              </a>
              <a href="/" className="nav-link text-platinum-300">← Back to Home</a>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="card-luxury">
            <h1 className="text-4xl font-bold text-platinum-800 mb-8">🔐 Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-platinum-700">
              <p className="text-xl text-platinum-600 mb-8">
                At Aranya One, we take your privacy seriously. This policy outlines how we collect, use, and protect your information.
              </p>

              <h2 className="text-2xl font-bold text-platinum-800 mt-8 mb-4">Information We Collect</h2>
              <ul className="space-y-2">
                <li>Account information (name, email, preferences)</li>
                <li>Usage analytics and performance metrics</li>
                <li>Technical data (IP address, browser type, device info)</li>
                <li>Service usage patterns and feature interactions</li>
              </ul>

              <h2 className="text-2xl font-bold text-platinum-800 mt-8 mb-4">How We Use Your Information</h2>
              <ul className="space-y-2">
                <li>Provide and improve our services</li>
                <li>Personalize your experience</li>
                <li>Send important updates and notifications</li>
                <li>Analyze usage patterns for optimization</li>
                <li>Ensure security and prevent fraud</li>
              </ul>

              <h2 className="text-2xl font-bold text-platinum-800 mt-8 mb-4">Data Protection</h2>
              <p>We implement enterprise-grade security measures including:</p>
              <ul className="space-y-2">
                <li>End-to-end encryption for sensitive data</li>
                <li>Regular security audits and penetration testing</li>
                <li>SOC 2 Type II compliance</li>
                <li>GDPR and CCPA compliance</li>
              </ul>

              <h2 className="text-2xl font-bold text-platinum-800 mt-8 mb-4">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <div className="bg-royal-50 border border-royal-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-royal-800 mb-2">Questions?</h3>
                <p className="text-royal-700">
                  Contact our privacy team at <strong>privacy@aranyaone.com</strong> or visit our <a href="/support" className="text-royal-600 hover:text-royal-800 underline">support center</a>.
                </p>
              </div>

              <p className="text-sm text-platinum-500 mt-8">
                Last updated: January 19, 2025 | Effective Date: January 19, 2025
              </p>
            </div>
          </div>
        </div>
      </main>

      <LuxuryFooter />
    </div>
  )
}