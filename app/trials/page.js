"use client";
import TrialManager from "../components/TrialManager";

export default function TrialsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-violet-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary mb-4 drop-shadow-lg">
            🎁 Free Trial Management
          </h1>
          <p className="text-lg text-gray-600">
            Manage free trials, track conversions, and optimize customer acquisition
          </p>
        </div>

        {/* Trial Manager */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-primary">
          <TrialManager />
        </div>

        {/* Trial Analytics & Insights */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trial Analytics */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-blue-200">
            <h2 className="text-2xl font-bold text-primary mb-6">📊 Trial Analytics</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🎯 Conversion Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-blue-600 font-bold">75%</div>
                    <div className="text-gray-600">Avg Conversion Rate</div>
                  </div>
                  <div>
                    <div className="text-blue-600 font-bold">3.2 days</div>
                    <div className="text-gray-600">Avg Time to Convert</div>
                  </div>
                  <div>
                    <div className="text-blue-600 font-bold">85%</div>
                    <div className="text-gray-600">Feature Usage Rate</div>
                  </div>
                  <div>
                    <div className="text-blue-600 font-bold">92%</div>
                    <div className="text-gray-600">Satisfaction Score</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">💰 Revenue Impact</h4>
                <div className="space-y-2 text-sm text-green-700">
                  <div>• Trial-to-paid conversion: ₹2,400/month</div>
                  <div>• Average trial value: ₹180</div>
                  <div>• Customer lifetime value: ₹2,160</div>
                  <div>• Trial acquisition cost: ₹45</div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">📈 Growth Trends</h4>
                <div className="space-y-2 text-sm text-purple-700">
                  <div>• Trial signups: +15% this month</div>
                  <div>• Conversion rate: +8% improvement</div>
                  <div>• Feature adoption: +22% increase</div>
                  <div>• Customer retention: +12% boost</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trial Optimization */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-green-200">
            <h2 className="text-2xl font-bold text-primary mb-6">⚡ Trial Optimization</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">🎁 Trial Extensions</h4>
                <div className="space-y-2 text-sm text-yellow-700">
                  <div>• High-usage trials: +3 days</div>
                  <div>• Engaged users: +7 days</div>
                  <div>• Referral bonuses: +14 days</div>
                  <div>• Feedback providers: +5 days</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🎯 Smart Targeting</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div>• Usage-based prompts</div>
                  <div>• Feature discovery nudges</div>
                  <div>• Social proof integration</div>
                  <div>• Personalized onboarding</div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🚀 Conversion Boosters</h4>
                <div className="space-y-2 text-sm text-green-700">
                  <div>• Early upgrade discounts</div>
                  <div>• Feature unlock rewards</div>
                  <div>• Community access</div>
                  <div>• Priority support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trial Features & Benefits */}
        <div className="mt-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-purple-200">
            <h2 className="text-2xl font-bold text-primary mb-6">✨ Trial Features & Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="text-3xl mb-4">🎁</div>
                <h3 className="font-bold text-gray-800 mb-2">Free Trial Benefits</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Full feature access</li>
                  <li>• No credit card required</li>
                  <li>• 7-day trial period</li>
                  <li>• Easy cancellation</li>
                  <li>• Data preservation</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="font-bold text-gray-800 mb-2">Upgrade Incentives</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 50% off first month</li>
                  <li>• Extended trial periods</li>
                  <li>• Premium features unlock</li>
                  <li>• Priority support access</li>
                  <li>• Exclusive community access</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="font-bold text-gray-800 mb-2">Analytics & Insights</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Usage tracking</li>
                  <li>• Conversion analytics</li>
                  <li>• Feature adoption rates</li>
                  <li>• Customer behavior insights</li>
                  <li>• A/B testing capabilities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Trial Management Tools */}
        <div className="mt-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-orange-200">
            <h2 className="text-2xl font-bold text-primary mb-6">🛠️ Trial Management Tools</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button className="p-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:scale-105 transition-all duration-300 text-center">
                <div className="text-2xl mb-2">➕</div>
                <div className="font-semibold">Create Trial</div>
                <div className="text-sm opacity-90">New trial setup</div>
              </button>

              <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:scale-105 transition-all duration-300 text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-semibold">Analytics</div>
                <div className="text-sm opacity-90">View reports</div>
              </button>

              <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:scale-105 transition-all duration-300 text-center">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="font-semibold">Settings</div>
                <div className="text-sm opacity-90">Configure trials</div>
              </button>

              <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 text-center">
                <div className="text-2xl mb-2">📧</div>
                <div className="font-semibold">Automation</div>
                <div className="text-sm opacity-90">Email sequences</div>
              </button>
            </div>
          </div>
        </div>

        {/* Support & Resources */}
        <div className="mt-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-yellow-200">
            <h2 className="text-2xl font-bold text-primary mb-6">💬 Support & Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-semibold text-gray-800 mb-2">Trial Guide</h3>
                <p className="text-sm text-gray-600 mb-3">Complete trial management guide</p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                  Read Guide
                </button>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-800 mb-2">Best Practices</h3>
                <p className="text-sm text-gray-600 mb-3">Optimize trial conversions</p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                  View Tips
                </button>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-semibold text-gray-800 mb-2">Expert Support</h3>
                <p className="text-sm text-gray-600 mb-3">Get help from our team</p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 