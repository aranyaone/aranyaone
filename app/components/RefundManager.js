"use client";
import { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";

export default function RefundManager() {
  const { formatPrice, currency } = useCurrency();
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundStep, setRefundStep] = useState("request");

  // Mock refund data
  const refunds = [
    {
      id: 1,
      service: "CrownPlus",
      amount: 30,
      currency: "INR",
      reason: "Technical issues",
      status: "pending",
      requestDate: "2024-01-15",
      description: "Service was not working properly for 3 days",
      evidence: ["screenshot1.png", "error_log.txt"],
      priority: "high",
      category: "technical"
    },
    {
      id: 2,
      service: "SEO Optimizer",
      amount: 50,
      currency: "INR",
      reason: "Not satisfied with service",
      status: "approved",
      requestDate: "2024-01-10",
      approvedDate: "2024-01-12",
      description: "Didn't meet expectations",
      evidence: ["feedback.pdf"],
      priority: "medium",
      category: "satisfaction"
    },
    {
      id: 3,
      service: "Analytics Dashboard",
      amount: 25,
      currency: "INR",
      reason: "Duplicate charge",
      status: "completed",
      requestDate: "2024-01-08",
      completedDate: "2024-01-09",
      description: "Charged twice for the same service",
      evidence: ["bank_statement.pdf", "invoice.pdf"],
      priority: "high",
      category: "billing"
    },
    {
      id: 4,
      service: "Social Media Manager",
      amount: 40,
      currency: "INR",
      reason: "Service unavailable",
      status: "rejected",
      requestDate: "2024-01-05",
      rejectedDate: "2024-01-07",
      description: "Service was down for maintenance",
      evidence: ["downtime_log.pdf"],
      priority: "low",
      category: "service"
    }
  ];

  const refundReasons = [
    "Technical issues",
    "Service not working",
    "Not satisfied with service",
    "Duplicate charge",
    "Unauthorized charge",
    "Service unavailable",
    "Wrong amount charged",
    "Billing error",
    "Other"
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "approved": return "bg-green-100 text-green-700";
      case "completed": return "bg-blue-100 text-blue-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return "⏳";
      case "approved": return "✅";
      case "completed": return "💰";
      case "rejected": return "❌";
      default: return "❓";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleRefundAction = (refund, action) => {
    setSelectedRefund(refund);
    setShowRefundModal(true);
  };

  const renderRefundRequest = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-4">💰</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Request Refund
        </h3>
        <p className="text-gray-600">
          We want to make sure you're satisfied. Let's process your refund request.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">📋 Refund Policy</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Full refund within 7 days of purchase</li>
          <li>• Partial refund for technical issues</li>
          <li>• No refund for usage-based services</li>
          <li>• Processing time: 3-5 business days</li>
        </ul>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service *
          </label>
          <select className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none">
            <option>Select a service</option>
            <option>CrownPlus</option>
            <option>SEO Optimizer</option>
            <option>Analytics Dashboard</option>
            <option>Social Media Manager</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Refund Reason *
          </label>
          <select className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none">
            <option>Select a reason</option>
            {refundReasons.map((reason) => (
              <option key={reason}>{reason}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Refund *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {currency === "INR" ? "₹" : "$"}
            </span>
            <input
              type="number"
              className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description *
          </label>
          <textarea
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            rows={4}
            placeholder="Please provide detailed information about your refund request..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supporting Evidence (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="text-2xl mb-2">📎</div>
            <p className="text-gray-600">Drag and drop files here or click to browse</p>
            <p className="text-sm text-gray-500 mt-1">Screenshots, logs, invoices, etc.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Refund Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-yellow-300">
          <div className="text-center">
            <div className="text-3xl mb-2">⏳</div>
            <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
            <div className="text-3xl font-bold text-yellow-600 mt-2">1</div>
            <p className="text-sm text-gray-500 mt-1">Awaiting Review</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-green-300">
          <div className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-lg font-semibold text-gray-800">Approved</h3>
            <div className="text-3xl font-bold text-green-600 mt-2">1</div>
            <p className="text-sm text-gray-500 mt-1">Ready to Process</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-blue-300">
          <div className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
            <div className="text-3xl font-bold text-blue-600 mt-2">1</div>
            <p className="text-sm text-gray-500 mt-1">Refunded</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-red-300">
          <div className="text-center">
            <div className="text-3xl mb-2">❌</div>
            <h3 className="text-lg font-semibold text-gray-800">Rejected</h3>
            <div className="text-3xl font-bold text-red-600 mt-2">1</div>
            <p className="text-sm text-gray-500 mt-1">Not Eligible</p>
          </div>
        </div>
      </div>

      {/* Refund Requests */}
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-primary">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Refund Requests</h2>
          <button
            onClick={() => setShowRefundModal(true)}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            + New Refund Request
          </button>
        </div>

        <div className="space-y-4">
          {refunds.map((refund) => (
            <div
              key={refund.id}
              className="border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{refund.service}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(refund.status)}`}>
                      {getStatusIcon(refund.status)} {refund.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(refund.priority)}`}>
                      {refund.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{refund.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(refund.amount)}
                  </div>
                  <div className="text-sm text-gray-500">{refund.currency}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                <div>
                  <strong>Reason:</strong> {refund.reason}
                </div>
                <div>
                  <strong>Requested:</strong> {refund.requestDate}
                </div>
                <div>
                  <strong>Category:</strong> {refund.category}
                </div>
              </div>

              {refund.evidence && (
                <div className="mb-4">
                  <strong className="text-sm text-gray-700">Evidence:</strong>
                  <div className="flex gap-2 mt-1">
                    {refund.evidence.map((file, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        📎 {file}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleRefundAction(refund, "view")}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  View Details
                </button>
                {refund.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleRefundAction(refund, "approve")}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRefundAction(refund, "reject")}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Refund Management</h2>
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {renderRefundRequest()}

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 