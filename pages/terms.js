import SEOHead from '../components/SEOHead'
import LuxuryFooter from '../components/LuxuryFooter'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-platinum-950 via-platinum-900 to-royal-950">
      <SEOHead 
        title="Terms of Service"
        description="Aranya One Terms of Service - Understand your rights and responsibilities when using our digital empire management platform."
        url="/terms"
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
            <h1 className="text-4xl font-bold text-platinum-800 mb-8">📋 Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none text-platinum-700">
              <p className="text-xl text-platinum-600 mb-8">
                Welcome to Aranya One. These terms govern your use of our digital empire management platform.
              </p>

              <h2 className="text-2xl font-bold text-platinum-800 mt-8 mb-4">Acceptance of Terms</h2>
              <p>
                By accessing or using Aranya One, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
                If you do not agree with these terms, please do not use our service.
              </p>

              <h2 className="text-2xl font-bold text-platinum-800 mt-8 mb-4">Service Description</h2>
              <p>Aranya One provides:</p>
              <ul className="space-y-2">
                <li>Digital empire management tools and analytics</li>
                <li>Performance monitoring and optimization</li>
                <li>Business growth and automation services</li>
                <li>Enterprise-grade security and infrastructure</li>
              </ul>

              <h2 className="text-2xl font-bold text-platinum-800 mt-8 mb-4">User Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use our services in compliance with applicable laws</li>
                <li>Not engage in prohibited activities or abuse our platform</li>
                <li>Respect intellectual property rights</li>
              </ul>

              <h2 className="text-2xl font-bold text-platinum-800 mt-8 mb-4">Service Availability</h2>
              <p>
                We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. 
                Scheduled maintenance will be announced in advance when possible.
              </p>

              <h2 className="text-2xl font-bold text-platinum-800 mt-8 mb-4">Payment Terms</h2>
              <ul className="space-y-2">
                <li>Subscription fees are billed monthly or annually</li>
                <li>All payments are non-refundable unless required by law</li>
                <li>Price changes will be communicated 30 days in advance</li>
                <li>Free trial periods may be offered at our discretion</li>
              </ul>

              <h2 className="text-2xl font-bold text-platinum-800 mt-8 mb-4">Limitation of Liability</h2>
              <p>
                Aranya One shall not be liable for any indirect, incidental, special, or consequential damages 
                arising from your use of our services, except as required by applicable law.
              </p>

              <div className="bg-gold-50 border border-gold-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-gold-800 mb-2">Need Help?</h3>
                <p className="text-gold-700">
                  Questions about these terms? Contact our legal team at <strong>legal@aranyaone.com</strong> or 
                  visit our <a href="/support" className="text-gold-600 hover:text-gold-800 underline">support center</a>.
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