"use client";
import { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";

export default function EarningsPage() {
  const { formatPrice, currency, convertCurrency } = useCurrency();
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock earnings data (in INR)
  const earningsData = {
    totalEarningsINR: 15000,
    thisMonthINR: 3200,
    lastMonthINR: 2800,
    affiliateEarningsINR: 8500,
    pluginEarningsINR: 6500,
    withdrawalsINR: 12000,
    pendingINR: 3000,
  };

  const periods = [
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "quarter", label: "This Quarter" },
    { key: "year", label: "This Year" },
  ];

  const affiliatePartners = [
    { name: "Amazon", earnings: 2500, clicks: 150, conversions: 25 },
    { name: "Meesho", earnings: 1800, clicks: 120, conversions: 18 },
    { name: "Clickbank", earnings: 2200, clicks: 200, conversions: 22 },
    { name: "V Commission", earnings: 2000, clicks: 180, conversions: 20 },
  ];

  const recentTransactions = [
    { id: 1, type: "affiliate", amount: 500, partner: "Amazon", date: "2024-01-15", status: "completed" },
    { id: 2, type: "plugin", amount: 300, plugin: "SEO Optimizer", date: "2024-01-14", status: "completed" },
    { id: 3, type: "withdrawal", amount: -2000, method: "UPI", date: "2024-01-10", status: "completed" },
    { id: 4, type: "affiliate", amount: 400, partner: "Meesho", date: "2024-01-09", status: "pending" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-violet-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary mb-4 drop-shadow-lg">
            💰 Earnings Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Track your earnings, affiliate income, and plugin sales
          </p>
        </div>

        {/* Period Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {periods.map((period) => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedPeriod === period.key
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white/80 text-gray-700 hover:bg-primary/10"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-green-300">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="text-lg font-semibold text-gray-800">Total Earnings</h3>
              <div className="text-3xl font-bold text-green-600 mt-2">
                {formatPrice(earningsData.totalEarningsINR)}
              </div>
              <p className="text-sm text-gray-500 mt-1">All time</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-blue-300">
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="text-lg font-semibold text-gray-800">This Month</h3>
              <div className="text-3xl font-bold text-blue-600 mt-2">
                {formatPrice(earningsData.thisMonthINR)}
              </div>
              <p className="text-sm text-green-600 mt-1">+14.3% vs last month</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-purple-300">
            <div className="text-center">
              <div className="text-3xl mb-2">🔗</div>
              <h3 className="text-lg font-semibold text-gray-800">Affiliate Income</h3>
              <div className="text-3xl font-bold text-purple-600 mt-2">
                {formatPrice(earningsData.affiliateEarningsINR)}
              </div>
              <p className="text-sm text-gray-500 mt-1">From partnerships</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-orange-300">
            <div className="text-center">
              <div className="text-3xl mb-2">🔌</div>
              <h3 className="text-lg font-semibold text-gray-800">Plugin Sales</h3>
              <div className="text-3xl font-bold text-orange-600 mt-2">
                {formatPrice(earningsData.pluginEarningsINR)}
              </div>
              <p className="text-sm text-gray-500 mt-1">From marketplace</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Affiliate Partners */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-6">Affiliate Partners</h2>
            
            <div className="space-y-4">
              {affiliatePartners.map((partner, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {partner.name === "Amazon" && "🛒"}
                      {partner.name === "Meesho" && "🛍️"}
                      {partner.name === "Clickbank" && "💳"}
                      {partner.name === "V Commission" && "💰"}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{partner.name}</h4>
                      <p className="text-sm text-gray-600">
                        {partner.clicks} clicks • {partner.conversions} conversions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{formatPrice(partner.earnings)}</div>
                    <div className="text-xs text-gray-500">earned</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-primary">Total Affiliate Earnings</span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(affiliatePartners.reduce((sum, p) => sum + p.earnings, 0))}
                </span>
              </div>
            </div>
          </div>

          {/* Withdrawal & Pending */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-accent">
            <h2 className="text-2xl font-bold text-primary mb-6">Withdrawals & Pending</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-green-800">Available for Withdrawal</h4>
                    <p className="text-sm text-green-600">Ready to transfer to your account</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(earningsData.pendingINR)}
                    </div>
                  </div>
                </div>
                <button className="w-full mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  💸 Withdraw Now
                </button>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-800">Total Withdrawn</h4>
                    <p className="text-sm text-blue-600">All time withdrawals</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(earningsData.withdrawalsINR)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Withdrawal Methods */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-3">Withdrawal Methods</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">💳 UPI</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">🏦 Bank Transfer</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">🔵 PayPal</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">📱 Paytm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-gray-200">
            <h2 className="text-2xl font-bold text-primary mb-6">Recent Transactions</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Details</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600">{transaction.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'affiliate' 
                            ? 'bg-purple-100 text-purple-700'
                            : transaction.type === 'plugin'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {transaction.type === 'affiliate' && '🔗 Affiliate'}
                          {transaction.type === 'plugin' && '🔌 Plugin'}
                          {transaction.type === 'withdrawal' && '💸 Withdrawal'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {transaction.type === 'withdrawal' ? '-' : '+'}{formatPrice(transaction.amount)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {transaction.partner || transaction.plugin || transaction.method}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
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
    </main>
  );
} 