"use client";
import { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";

export default function SubscriptionManager() {
  const { formatPrice, currency } = useCurrency();
  const [activeTab, setActiveTab] = useState("active");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // Mock subscription data
  const subscriptions = {
    active: [
      {
        id: 1,
        name: "CrownPlus",
        status: "active",
        amount: 30, // ₹30/month
        currency: "INR",
        startDate: "2024-01-01",
        nextBilling: "2024-02-01",
        features: ["Unlimited AI Chat", "Priority Support", "Early Access", "Premium Plugins"],
        autoRenew: true,
      },
      {
        id: 2,
        name: "Plugin Bundle",
        status: "active",
        amount: 50,
        currency: "INR",
        startDate: "2024-01-10",
        nextBilling: "2024-02-10",
        features: ["SEO Optimizer", "Analytics Pro", "Social Media Manager"],
        autoRenew: true,
      },
    ],
    cancelled: [
      {
        id: 3,
        name: "Basic Plan",
        status: "cancelled",
        amount: 15,
        currency: "INR",
        startDate: "2023-12-01",
        endDate: "2024-01-01",
        features: ["Basic AI Chat", "Email Support"],
        autoRenew: false,
      },
    ],
    expired: [
      {
        id: 4,
        name: "Trial Plan",
        status: "expired",
        amount: 0,
        currency: "INR",
        startDate: "2023-11-01",
        endDate: "2023-12-01",
        features: ["Limited AI Chat", "Community Support"],
        autoRenew: false,
      },
    ],
  };

  const handleCancelSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    // Here you would integrate with your backend to cancel the subscription
    console.log("Cancelling subscription:", selectedSubscription);
    setShowCancelModal(false);
    setSelectedSubscription(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      case "expired": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return "✅";
      case "cancelled": return "❌";
      case "expired": return "⏰";
      default: return "❓";
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {Object.keys(subscriptions).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({subscriptions[tab].length})
          </button>
        ))}
      </div>

      {/* Subscription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subscriptions[activeTab].map((subscription) => (
          <div
            key={subscription.id}
            className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{subscription.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                    {getStatusIcon(subscription.status)} {subscription.status}
                  </span>
                  {subscription.autoRenew && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      🔄 Auto Renew
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(subscription.amount)}
                </div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
              <ul className="space-y-1">
                {subscription.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dates */}
            <div className="mb-4 text-sm text-gray-600">
              <div>Started: {subscription.startDate}</div>
              {subscription.nextBilling && (
                <div>Next billing: {subscription.nextBilling}</div>
              )}
              {subscription.endDate && (
                <div>Ended: {subscription.endDate}</div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {subscription.status === "active" && (
                <>
                  <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Manage
                  </button>
                  <button
                    onClick={() => handleCancelSubscription(subscription)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
              {subscription.status === "cancelled" && (
                <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Reactivate
                </button>
              )}
              {subscription.status === "expired" && (
                <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Renew
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedSubscription && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Cancel Subscription
              </h3>
              <p className="text-gray-600">
                Are you sure you want to cancel your <strong>{selectedSubscription.name}</strong> subscription?
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-800 mb-2">What happens when you cancel:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• You'll lose access to premium features</li>
                <li>• Your subscription will end on {selectedSubscription.nextBilling}</li>
                <li>• You can reactivate anytime</li>
                <li>• No refunds for partial months</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Keep Subscription
              </button>
              <button
                onClick={confirmCancellation}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 