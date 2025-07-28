"use client";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";

const trafficData = [
  { day: "Mon", visitors: 1200, signups: 80, installs: 30 },
  { day: "Tue", visitors: 1500, signups: 110, installs: 45 },
  { day: "Wed", visitors: 1700, signups: 130, installs: 60 },
  { day: "Thu", visitors: 1400, signups: 90, installs: 40 },
  { day: "Fri", visitors: 2000, signups: 160, installs: 80 },
  { day: "Sat", visitors: 2200, signups: 180, installs: 100 },
  { day: "Sun", visitors: 1800, signups: 120, installs: 70 },
];

const earningsData = [
  { month: "Jan", earnings: 12000 },
  { month: "Feb", earnings: 15000 },
  { month: "Mar", earnings: 18000 },
  { month: "Apr", earnings: 21000 },
  { month: "May", earnings: 25000 },
  { month: "Jun", earnings: 30000 },
];

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-yellow-50 p-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-primary max-w-5xl w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-primary mb-4 drop-shadow-lg">
          📊 Analytics & Traffic Dashboard
        </h1>
        <p className="text-lg text-subtle mb-8 text-center">
          Track your traffic, conversions, plugin installs, and earnings in real time.
        </p>

        {/* Traffic Line Chart */}
        <div className="w-full mb-12">
          <h2 className="text-xl font-bold text-primary mb-4">Website Traffic & Conversions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visitors" stroke="#7C3AED" strokeWidth={3} />
              <Line type="monotone" dataKey="signups" stroke="#F472B6" strokeWidth={3} />
              <Line type="monotone" dataKey="installs" stroke="#FBBF24" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Earnings Bar Chart */}
        <div className="w-full mb-12">
          <h2 className="text-xl font-bold text-primary mb-4">Monthly Earnings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="earnings" fill="#7C3AED" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Metrics */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          <div className="bg-gradient-to-r from-primary to-accent text-white rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-3xl font-bold">12,500</span>
            <span className="text-lg">Visitors</span>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-pink-400 text-white rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-3xl font-bold">1,200</span>
            <span className="text-lg">Signups</span>
          </div>
          <div className="bg-gradient-to-r from-pink-400 to-violet-400 text-white rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-3xl font-bold">350</span>
            <span className="text-lg">Plugin Installs</span>
          </div>
        </div>
      </div>
    </main>
  );
} 