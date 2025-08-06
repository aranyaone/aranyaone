"use client";
import SubscriptionManager from "../components/SubscriptionManager";

export default function SubscriptionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-violet-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary mb-4 drop-shadow-lg">
            📋 Subscription Management
          </h1>
          <p className="text-lg text-gray-600">
            Manage your subscriptions, cancel services, and track billing
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-green-300">
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-lg font-semibold text-gray-800">Active</h3>
              <div className="text-3xl font-bold text-green-600 mt-2">2</div>
              <p className="text-sm text-gray-500 mt-1">Subscriptions</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-red-300">
            <div className="text-center">
              <div className="text-3xl mb-2">❌</div>
              <h3 className="text-lg font-semibold text-gray-800">Cancelled</h3>
              <div className="text-3xl font-bold text-red-600 mt-2">1</div>
              <p className="text-sm text-gray-500 mt-1">Subscriptions</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-gray-300">
            <div className="text-center">
              <div className="text-3xl mb-2">⏰</div>
              <h3 className="text-lg font-semibold text-gray-800">Expired</h3>
              <div className="text-3xl font-bold text-gray-600 mt-2">1</div>
              <p className="text-sm text-gray-500 mt-1">Subscriptions</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-blue-300">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="text-lg font-semibold text-gray-800">Monthly Cost</h3>
              <div className="text-3xl font-bold text-blue-600 mt-2">₹80</div>
              <p className="text-sm text-gray-500 mt-1">Total</p>
            </div>
          </div>
        </div>

        {/* Subscription Manager */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-primary">
          <SubscriptionManager />
        </div>

        {/* Billing Information */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-accent">
            <h2 className="text-2xl font-bold text-primary mb-6">Payment Methods</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">💳</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Visa ending in 4242</h4>
                    <p className="text-sm text-gray-600">Expires 12/25</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Default
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">📱</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">UPI: user@paytm</h4>
                    <p className="text-sm text-gray-600">Paytm</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                  Set Default
                </button>
              </div>
            </div>

            <button className="w-full mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              + Add Payment Method
            </button>
          </div>

          {/* Billing History */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-gray-200">
            <h2 className="text-2xl font-bold text-primary mb-6">Billing History</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-semibold text-gray-800">CrownPlus - January 2024</h4>
                  <p className="text-sm text-gray-600">Jan 1, 2024</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">₹30.00</div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    Paid
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-semibold text-gray-800">Plugin Bundle - January 2024</h4>
                  <p className="text-sm text-gray-600">Jan 10, 2024</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">₹50.00</div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    Paid
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-semibold text-gray-800">Basic Plan - December 2023</h4>
                  <p className="text-sm text-gray-600">Dec 1, 2023</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">₹15.00</div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                    Cancelled
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
              View All Invoices
            </button>
          </div>
        </div>

        {/* Help & Support */}
        <div className="mt-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-yellow-200">
            <h2 className="text-2xl font-bold text-primary mb-6">Need Help?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="text-3xl mb-2">📞</div>
                <h3 className="font-semibold text-gray-800 mb-2">Contact Support</h3>
                <p className="text-sm text-gray-600 mb-3">Get help with billing issues</p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                  Contact Us
                </button>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-semibold text-gray-800 mb-2">Billing FAQ</h3>
                <p className="text-sm text-gray-600 mb-3">Common billing questions</p>
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