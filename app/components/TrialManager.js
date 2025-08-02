"use client";
import { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";

export default function TrialManager() {
  const { formatPrice, currency } = useCurrency();
  const [selectedTrial, setSelectedTrial] = useState(null);
  const [showTrialModal, setShowTrialModal] = useState(false);

  // Mock trial data
  const trials = [
    {
      id: 1,
      service: "CrownPlus",
      status: "active",
      startDate: "2024-01-10",
      endDate: "2024-01-17",
      daysLeft: 3,
      usage: {
        current: 75,
        limit: 100,
        unit: "messages"
      },
      features: ["Unlimited AI Chat", "Priority Support", "Early Access"],
      conversionRate: 85,
      upgradePrompt: true
    },
    {
      id: 2,
      service: "SEO Optimizer",
      status: "expired",
      startDate: "2024-01-01",
      endDate: "2024-01-08",
      daysLeft: 0,
      usage: {
        current: 45,
        limit: 50,
        unit: "optimizations"
      },
      features: ["Keyword Analysis", "Content Optimization", "Ranking Tracking"],
      conversionRate: 60,
      upgradePrompt: false
    },
    {
      id: 3,
      service: "Analytics Dashboard",
      status: "converted",
      startDate: "2023-12-25",
      endDate: "2024-01-01",
      daysLeft: 0,
      usage: {
        current: 100,
        limit: 100,
        unit: "reports"
      },
      features: ["Real-time Analytics", "Custom Reports", "Data Export"],
      conversionRate: 100,
      upgradePrompt: false,
      convertedTo: "Premium Plan"
    },
    {
      id: 4,
      service: "Social Media Manager",
      status: "available",
      startDate: null,
      endDate: null,
      daysLeft: 7,
      usage: {
        current: 0,
        limit: 50,
        unit: "posts"
      },
      features: ["Auto-posting", "Content Scheduling", "Performance Tracking"],
      conversionRate: 0,
      upgradePrompt: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "expired": return "bg-red-100 text-red-700";
      case "converted": return "bg-blue-100 text-blue-700";
      case "available": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return "✅";
      case "expired": return "⏰";
      case "converted": return "💰";
      case "available": return "🎁";
      default: return "❓";
    }
  };

  const getUsagePercentage = (current, limit) => {
    return Math.round((current / limit) * 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleTrialAction = (trial, action) => {
    setSelectedTrial(trial);
    setShowTrialModal(true);
  };

  const renderTrialCard = (trial) => (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{trial.service}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trial.status)}`}>
              {getStatusIcon(trial.status)} {trial.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {trial.status === "active" && `${trial.daysLeft} days left`}
            {trial.status === "expired" && "Trial expired"}
            {trial.status === "converted" && `Converted to ${trial.convertedTo}`}
            {trial.status === "available" && "Ready to start"}
          </p>
        </div>
        <div className="text-right">
          {trial.status === "converted" ? (
            <div className="text-green-600 font-bold">Converted</div>
          ) : (
            <div className="text-2xl font-bold text-primary">Free</div>
          )}
        </div>
      </div>

      {/* Usage Bar */}
      {trial.status === "active" && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Usage: {trial.usage.current}/{trial.usage.limit} {trial.usage.unit}</span>
            <span>{getUsagePercentage(trial.usage.current, trial.usage.limit)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getUsageColor(getUsagePercentage(trial.usage.current, trial.usage.limit))}`}
              style={{ width: `${getUsagePercentage(trial.usage.current, trial.usage.limit)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Trial Features:</h4>
        <div className="flex flex-wrap gap-1">
          {trial.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
            >
              {feature}
            </span>
          ))}
          {trial.features.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
              +{trial.features.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Conversion Rate */}
      {trial.status !== "available" && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">Conversion Rate</span>
            <span className="font-bold text-blue-700">{trial.conversionRate}%</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {trial.status === "active" && (
          <>
            <button
              onClick={() => handleTrialAction(trial, "upgrade")}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Upgrade Now
            </button>
            <button
              onClick={() => handleTrialAction(trial, "extend")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Extend Trial
            </button>
          </>
        )}
        {trial.status === "expired" && (
          <>
            <button
              onClick={() => handleTrialAction(trial, "upgrade")}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Upgrade Now
            </button>
            <button
              onClick={() => handleTrialAction(trial, "restart")}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Restart Trial
            </button>
          </>
        )}
        {trial.status === "available" && (
          <button
            onClick={() => handleTrialAction(trial, "start")}
            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Start Free Trial
          </button>
        )}
        {trial.status === "converted" && (
          <button
            onClick={() => handleTrialAction(trial, "manage")}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Manage Subscription
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Trial Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-green-300">
          <div className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-lg font-semibold text-gray-800">Active Trials</h3>
            <div className="text-3xl font-bold text-green-600 mt-2">1</div>
            <p className="text-sm text-gray-500 mt-1">Currently Running</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-blue-300">
          <div className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-lg font-semibold text-gray-800">Conversions</h3>
            <div className="text-3xl font-bold text-blue-600 mt-2">1</div>
            <p className="text-sm text-gray-500 mt-1">Trial to Paid</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-yellow-300">
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-lg font-semibold text-gray-800">Avg Conversion</h3>
            <div className="text-3xl font-bold text-yellow-600 mt-2">75%</div>
            <p className="text-sm text-gray-500 mt-1">Success Rate</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-purple-300">
          <div className="text-center">
            <div className="text-3xl mb-2">🎁</div>
            <h3 className="text-lg font-semibold text-gray-800">Available</h3>
            <div className="text-3xl font-bold text-purple-600 mt-2">1</div>
            <p className="text-sm text-gray-500 mt-1">Ready to Start</p>
          </div>
        </div>
      </div>

      {/* Trial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trials.map((trial) => renderTrialCard(trial))}
      </div>

      {/* Trial Modal */}
      {showTrialModal && selectedTrial && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">
                  {selectedTrial.service} Trial
                </h2>
                <button
                  onClick={() => setShowTrialModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎁</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedTrial.status === "available" ? "Start Free Trial" : "Upgrade Your Trial"}
                  </h3>
                  <p className="text-gray-600">
                    {selectedTrial.status === "available" 
                      ? "Try {selectedTrial.service} for free for 7 days"
                      : "Upgrade to continue using all features"
                    }
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">✨ What's included:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {selectedTrial.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>

                {selectedTrial.status === "active" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">⏰ Trial ending soon</h4>
                    <p className="text-sm text-yellow-700">
                      Your trial ends in {selectedTrial.daysLeft} days. Upgrade now to continue.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-800">Free</div>
                    <div className="text-sm text-gray-600">7-day trial</div>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(selectedTrial.service === "CrownPlus" ? 30 : 50)}
                    </div>
                    <div className="text-sm text-primary">per month</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowTrialModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    {selectedTrial.status === "available" ? "Start Trial" : "Upgrade Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 