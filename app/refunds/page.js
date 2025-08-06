"use client";
import RefundManager from "../components/RefundManager";

export default function RefundsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-violet-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary mb-4 drop-shadow-lg">
            💰 Refund Management
          </h1>
          <p className="text-lg text-gray-600">
            Process refunds, track requests, and manage customer satisfaction
          </p>
        </div>

        {/* Refund Manager */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-primary">
          <RefundManager />
        </div>

        {/* Refund Policy & Information */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Refund Policy */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-blue-200">
            <h2 className="text-2xl font-bold text-primary mb-6">📋 Refund Policy</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✅ Full Refund (7 days)</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Any reason within 7 days</li>
                  <li>• No questions asked</li>
                  <li>• 100% money back guarantee</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Partial Refund (30 days)</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Technical issues</li>
                  <li>• Service unavailability</li>
                  <li>• Billing errors</li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">❌ No Refund</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Usage-based services</li>
                  <li>• After 30 days</li>
                  <li>• Violation of terms</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Processing Information */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-green-200">
            <h2 className="text-2xl font-bold text-primary mb-6">⚡ Processing Info</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🕒 Processing Time</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div>• Credit/Debit Cards: 3-5 business days</div>
                  <div>• UPI: 1-2 business days</div>
                  <div>• Bank Transfer: 5-7 business days</div>
                  <div>• PayPal: 2-3 business days</div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">📧 Communication</h4>
                <div className="space-y-2 text-sm text-purple-700">
                  <div>• Email confirmation within 24 hours</div>
                  <div>• SMS notification when processed</div>
                  <div>• Dashboard status updates</div>
                  <div>• Support ticket creation</div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">📊 Analytics</h4>
                <div className="space-y-2 text-sm text-orange-700">
                  <div>• Average processing time: 3.2 days</div>
                  <div>• Customer satisfaction: 94%</div>
                  <div>• Resolution rate: 98%</div>
                  <div>• Appeal success rate: 12%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-purple-200">
            <h2 className="text-2xl font-bold text-primary mb-6">🚀 Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="p-6 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:scale-105 transition-all duration-300 text-left">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">💰</div>
                  <div>
                    <div className="font-semibold">New Refund Request</div>
                    <div className="text-sm opacity-90">Submit a new refund</div>
                  </div>
                </div>
              </button>

              <button className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:scale-105 transition-all duration-300 text-left">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">📊</div>
                  <div>
                    <div className="font-semibold">Refund Analytics</div>
                    <div className="text-sm opacity-90">View detailed reports</div>
                  </div>
                </div>
              </button>

              <button className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:scale-105 transition-all duration-300 text-left">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">📋</div>
                  <div>
                    <div className="font-semibold">Policy Settings</div>
                    <div className="text-sm opacity-90">Configure refund rules</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Support & Help */}
        <div className="mt-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-yellow-200">
            <h2 className="text-2xl font-bold text-primary mb-6">💬 Need Help?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="text-3xl mb-2">📞</div>
                <h3 className="font-semibold text-gray-800 mb-2">Contact Support</h3>
                <p className="text-sm text-gray-600 mb-3">Get help with refund issues</p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                  Contact Us
                </button>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-semibold text-gray-800 mb-2">Refund FAQ</h3>
                <p className="text-sm text-gray-600 mb-3">Common refund questions</p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                  View FAQ
                </button>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-3">Chat with our team</p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 