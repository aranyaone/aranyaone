import Head from "next/head"
import { ProtectedFeature, PlanGate } from '../lib/access-control'
import { useAuth } from '../lib/auth'

export default function AnalyticsPage() {
  const { user } = useAuth()

  return (
    <div>
      <Head>
        <title>Analytics Dashboard - Aranya One</title>
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 Analytics Dashboard</h1>
          <p className="text-gray-600 mb-8">Monitor your empire's performance in real-time</p>
          
          {/* Basic Analytics - Available to all users */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 Basic Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BasicMetricCard title="Page Views" value="12,345" change="+5.2%" />
              <BasicMetricCard title="Users" value="1,234" change="+12%" />
              <BasicMetricCard title="Sessions" value="3,456" change="+8.7%" />
            </div>
          </div>

          {/* Advanced Analytics - Pro+ only */}
          <ProtectedFeature requiredPlan="pro">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 Advanced Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdvancedChart title="Revenue Trends" />
                <AdvancedChart title="User Behavior Flow" />
                <AdvancedChart title="Conversion Funnel" />
                <AdvancedChart title="Cohort Analysis" />
              </div>
            </div>
          </ProtectedFeature>

          {/* Enterprise Features */}
          <ProtectedFeature requiredPlan="enterprise">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🏢 Enterprise Insights</h2>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-semibold mb-4">Custom Reports & Data Export</h3>
                <p className="text-gray-600 mb-4">Access detailed custom reports and export capabilities for enterprise analysis.</p>
                <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  Generate Custom Report
                </button>
              </div>
            </div>
          </ProtectedFeature>

          {/* Plan-based feature demonstration */}
          <PlanGate
            freePlan={
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">📊 Limited Analytics</h3>
                <p className="text-yellow-700">You're seeing basic analytics. Upgrade for advanced insights!</p>
              </div>
            }
            proPlan={
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">🚀 Pro Analytics Enabled</h3>
                <p className="text-blue-700">You have access to advanced analytics and detailed reports.</p>
              </div>
            }
            enterprisePlan={
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">🏢 Enterprise Analytics</h3>
                <p className="text-purple-700">Full access to all analytics features including custom reports and data export.</p>
              </div>
            }
          />
          
          <div className="mt-8 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  );
}

function BasicMetricCard({ title, value, change }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-blue-600 mb-1">{value}</div>
      <div className="text-sm text-green-600 font-medium">{change}</div>
    </div>
  )
}

function AdvancedChart({ title }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📈</div>
          <div className="text-gray-600">Interactive chart would be here</div>
        </div>
      </div>
    </div>
  )
}
