"use client";
import { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";
import PaymentGateway from "../components/PaymentGateway";

export default function WalletPage() {
  const { formatPrice, currency, convertCurrency, getSymbol } = useCurrency();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(100);

  // Mock wallet data (in INR)
  const walletBalanceINR = 2500;
  const transactionHistory = [
    { id: 1, type: "credit", amount: 1000, method: "UPI", date: "2024-01-15", status: "completed" },
    { id: 2, type: "debit", amount: 250, method: "Plugin Purchase", date: "2024-01-14", status: "completed" },
    { id: 3, type: "credit", amount: 500, method: "Razorpay", date: "2024-01-10", status: "completed" },
    { id: 4, type: "debit", amount: 100, method: "CrownPlus", date: "2024-01-09", status: "completed" },
  ];

  const quickAmounts = [100, 250, 500, 1000, 2500];

  const handlePaymentSuccess = (paymentData) => {
    console.log("Payment successful:", paymentData);
    setShowPaymentModal(false);
    // Here you would update the wallet balance and transaction history
  };

  const handlePaymentError = (error) => {
    console.error("Payment failed:", error);
    // Handle payment error
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-violet-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary mb-4 drop-shadow-lg">
            💰 Bujji Wallet
          </h1>
          <p className="text-lg text-gray-600">
            Manage your funds, add money, and track transactions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallet Balance Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-primary">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">💳</div>
                <h2 className="text-2xl font-bold text-primary">Current Balance</h2>
                <div className="text-5xl font-extrabold text-primary mt-4">
                  {formatPrice(walletBalanceINR)}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Available in {currency}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
                >
                  💰 Add Money
                </button>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                  💸 Withdraw
                </button>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                  📊 View Analytics
                </button>
              </div>
            </div>
          </div>

          {/* Quick Add Money */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-accent">
              <h2 className="text-2xl font-bold text-primary mb-6">Quick Add Money</h2>
              
              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Amount ({currency})
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedAmount === amount
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <div className="text-lg font-bold">{formatPrice(amount)}</div>
                      <div className="text-xs text-gray-500">Quick Add</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {getSymbol()}
                  </span>
                  <input
                    type="number"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                    placeholder="Enter amount (minimum $10, maximum $10,000)"
                  />
                </div>
              </div>

              {/* Payment Methods Preview */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Available Payment Methods</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">💳 Cards</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">📱 UPI</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">🍎 Apple Pay</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">🤖 Google Pay</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">🔵 PayPal</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">🏦 Net Banking</span>
                </div>
              </div>

              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300 text-lg"
              >
                💳 Pay {formatPrice(selectedAmount)}
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-gray-200">
            <h2 className="text-2xl font-bold text-primary mb-6">Transaction History</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600">{transaction.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'credit' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {transaction.type === 'credit' ? '➕ Credit' : '➖ Debit'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {transaction.type === 'credit' ? '+' : '-'}{formatPrice(transaction.amount)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{transaction.method}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Add Money to Wallet</h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6 p-4 bg-primary/10 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{formatPrice(selectedAmount)}</div>
                  <div className="text-sm text-gray-600">Amount to add</div>
                </div>
              </div>

              <PaymentGateway 
                amount={selectedAmount}
                currency={currency}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onCancel={handlePaymentCancel}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 