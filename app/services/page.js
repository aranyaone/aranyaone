'use client';
import React from 'react';
import ServiceManager from '@/components/ServiceManager';

export default function DashboardPage() {
  return (
    <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-screen-2xl mx-auto">

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Active */}
          <StatCard icon="✅" title="Active Services" count="2" status="Currently Running" border="green" />
          {/* Paused */}
          <StatCard icon="⏸️" title="Paused Services" count="1" status="Temporarily Stopped" border="yellow" />
          {/* Cancelled */}
          <StatCard icon="❌" title="Cancelled Services" count="1" status="Stopped Services" border="red" />
          {/* Usage */}
          <StatCard icon="📊" title="Total Usage" count="75%" status="Average Usage" border="blue" />
        </div>

        {/* Service Manager Section */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-primary">
          <ServiceManager />
        </div>

        {/* Categories */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ServiceCategory title="Core Services" color="green" services={[
            { icon: "🤖", name: "AI Chat Service", status: "Active", usage: "75%" },
            { icon: "📊", name: "Analytics Dashboard", status: "Paused", usage: "0%" },
          ]} />

          <ServiceCategory title="Plugin Services" color="blue" services={[
            { icon: "🔍", name: "SEO Optimizer", status: "Active", usage: "45%" },
            { icon: "📱", name: "Social Media Manager", status: "Cancelled", usage: "0%" },
          ]} />

          <QuickActions />
        </div>

        {/* Recommendations */}
        <Recommendations />

        {/* Founder Panel (Optional) */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          <hr className="my-6 border-gray-300" />
          <p>👑 Founder: <span className="font-bold">Srinivas Makam</span> – AranyaOne Empire</p>
          {/* You can also show your photo or link to admin panel here */}
        </div>

      </div>
    </main>
  );
}

/* Reusable Components */

function StatCard({ icon, title, count, status, border }) {
  return (
    <div className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-4 border-${border}-300`}>
      <div className="text-center">
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className={`text-3xl font-bold text-${border}-600 mt-2`}>{count}</div>
        <p className="text-sm text-gray-500 mt-1">{status}</p>
      </div>
    </div>
  );
}

function ServiceCategory({ title, color, services }) {
  return (
    <div className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-${color}-200`}>
      <h2 className="text-2xl font-bold text-primary mb-6">{title}</h2>
      <div className="space-y-4">
        {services.map((s, idx) => (
          <div key={idx} className={`flex items-center justify-between p-4 bg-${color}-50 rounded-xl`}>
            <div className="flex items-center gap-3">
              <div className="text-2xl">{s.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-800">{s.name}</h4>
                <p className="text-sm text-gray-600">{s.status} • {s.usage} usage</p>
              </div>
            </div>
            <span className={`px-2 py-1 text-${statusColor(s.status)}-700 bg-${statusColor(s.status)}-100 rounded-full text-xs font-medium`}>
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function statusColor(status) {
  return status === "Active" ? "green" : status === "Paused" ? "yellow" : "red";
}

function QuickActions() {
  const actions = [
    { icon: "➕", label: "Add New Service", desc: "Browse available services", bg: "primary" },
    { icon: "📈", label: "View Analytics", desc: "Service performance", bg: "green" },
    { icon: "⚙️", label: "Settings", desc: "Configure preferences", bg: "blue" },
    { icon: "💬", label: "Support", desc: "Get help", bg: "purple" },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-purple-200">
      <h2 className="text-2xl font-bold text-primary mb-6">Quick Actions</h2>
      <div className="space-y-4">
        {actions.map((a, i) => (
          <button key={i} className={`w-full p-4 bg-${a.bg}-500 text-white rounded-xl hover:bg-${a.bg}-600 transition-colors text-left`}>
            <div className="flex items-center gap-3">
              <div className="text-2xl">{a.icon}</div>
              <div>
                <div className="font-semibold">{a.label}</div>
                <div className="text-sm opacity-90">{a.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Recommendations() {
  const services = [
    { icon: "🎯", name: "Content Optimizer", desc: "AI-powered content optimization", price: "₹25/month", color: "blue" },
    { icon: "📧", name: "Email Marketing", desc: "Automated email campaigns", price: "₹35/month", color: "green" },
    { icon: "🎨", name: "Design Studio", desc: "AI-generated design templates", price: "₹40/month", color: "purple" },
  ];

  return (
    <div className="mt-8">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-orange-200">
        <h2 className="text-2xl font-bold text-primary mb-6">Recommended Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className={`p-6 bg-gradient-to-br from-${s.color}-50 to-${s.color}-100 rounded-xl border border-${s.color}-200`}>
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{s.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">{s.price}</span>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                  Try Free
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
