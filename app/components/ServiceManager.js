"use client";
import { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";

export default function ServiceManager() {
  const { formatPrice, currency } = useCurrency();
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);

  // Mock services data
  const services = [
    {
      id: 1,
      name: "AI Chat Service",
      category: "Core",
      status: "active",
      usage: {
        current: 1500,
        limit: 2000,
        unit: "messages"
      },
      pricing: {
        amount: 30,
        currency: "INR",
        period: "month"
      },
      features: ["Unlimited AI responses", "Context memory", "Multi-language support"],
      lastUsed: "2024-01-15 14:30",
      nextBilling: "2024-02-01",
      autoRenew: true
    },
    {
      id: 2,
      name: "SEO Optimizer Plugin",
      category: "Plugin",
      status: "active",
      usage: {
        current: 45,
        limit: 100,
        unit: "optimizations"
      },
      pricing: {
        amount: 50,
        currency: "INR",
        period: "month"
      },
      features: ["Keyword analysis", "Content optimization", "Ranking tracking"],
      lastUsed: "2024-01-14 09:15",
      nextBilling: "2024-02-10",
      autoRenew: true
    },
    {
      id: 3,
      name: "Analytics Dashboard",
      category: "Analytics",
      status: "paused",
      usage: {
        current: 0,
        limit: 1000,
        unit: "reports"
      },
      pricing: {
        amount: 25,
        currency: "INR",
        period: "month"
      },
      features: ["Real-time analytics", "Custom reports", "Data export"],
      lastUsed: "2024-01-10 16:45",
      nextBilling: "2024-02-01",
      autoRenew: false
    },
    {
      id: 4,
      name: "Social Media Manager",
      category: "Marketing",
      status: "cancelled",
      usage: {
        current: 0,
        limit: 50,
        unit: "posts"
      },
      pricing: {
        amount: 40,
        currency: "INR",
        period: "month"
      },
      features: ["Auto-posting", "Content scheduling", "Performance tracking"],
      lastUsed: "2024-01-05 11:20",
      nextBilling: null,
      autoRenew: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "paused": return "bg-yellow-100 text-yellow-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return "✅";
      case "paused": return "⏸️";
      case "cancelled": return "❌";
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

  const handleServiceAction = (service, action) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Service Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                    {getStatusIcon(service.status)} {service.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 capitalize">{service.category} Service</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(service.pricing.amount)}
                </div>
                <div className="text-sm text-gray-500">per {service.pricing.period}</div>
              </div>
            </div>

            {/* Usage Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Usage: {service.usage.current}/{service.usage.limit} {service.usage.unit}</span>
                <span>{getUsagePercentage(service.usage.current, service.usage.limit)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getUsageColor(getUsagePercentage(service.usage.current, service.usage.limit))}`}
                  style={{ width: `${getUsagePercentage(service.usage.current, service.usage.limit)}%` }}
                ></div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
              <div className="flex flex-wrap gap-1">
                {service.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                  >
                    {feature}
                  </span>
                ))}
                {service.features.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                    +{service.features.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="mb-4 text-sm text-gray-600">
              <div>Last used: {service.lastUsed}</div>
              {service.nextBilling && (
                <div>Next billing: {service.nextBilling}</div>
              )}
              {service.autoRenew && (
                <div className="text-green-600">🔄 Auto-renew enabled</div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {service.status === "active" && (
                <>
                  <button
                    onClick={() => handleServiceAction(service, "manage")}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => handleServiceAction(service, "pause")}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Pause
                  </button>
                  <button
                    onClick={() => handleServiceAction(service, "cancel")}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
              {service.status === "paused" && (
                <>
                  <button
                    onClick={() => handleServiceAction(service, "resume")}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Resume
                  </button>
                  <button
                    onClick={() => handleServiceAction(service, "cancel")}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
              {service.status === "cancelled" && (
                <button
                  onClick={() => handleServiceAction(service, "reactivate")}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Reactivate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Service Action Modal */}
      {showServiceModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Manage {selectedService.name}
              </h3>
              <p className="text-gray-600">
                What would you like to do with this service?
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <button className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg text-left hover:bg-blue-100 transition-colors">
                <div className="font-semibold text-blue-800">📊 View Usage Analytics</div>
                <div className="text-sm text-blue-600">Detailed usage statistics and insights</div>
              </button>

              <button className="w-full p-4 bg-green-50 border border-green-200 rounded-lg text-left hover:bg-green-100 transition-colors">
                <div className="font-semibold text-green-800">⚙️ Configure Settings</div>
                <div className="text-sm text-green-600">Customize service preferences</div>
              </button>

              <button className="w-full p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left hover:bg-yellow-100 transition-colors">
                <div className="font-semibold text-yellow-800">📈 Upgrade Plan</div>
                <div className="text-sm text-yellow-600">Get more features and higher limits</div>
              </button>

              <button className="w-full p-4 bg-red-50 border border-red-200 rounded-lg text-left hover:bg-red-100 transition-colors">
                <div className="font-semibold text-red-800">❌ Cancel Service</div>
                <div className="text-sm text-red-600">Stop using this service</div>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowServiceModal(false)}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 