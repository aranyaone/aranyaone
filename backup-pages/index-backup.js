import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const PremiumHero = dynamic(() => import("../components/layout/PremiumHero"), { ssr: false });
const PremiumNavigation = dynamic(() => import("../components/navigation/PremiumNavigation"), {
  ssr: false,
});
const PremiumAnalytics = dynamic(() => import("../components/analytics/PremiumAnalytics"), {
  ssr: false,
});
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>Aranya One - Premium Digital Empire Platform</title>
        <meta
          name="description"
          content="World-class digital empire management platform with AI-powered analytics and enterprise security"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Performance optimizations */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
        {/* PWA optimizations */}
        <meta name="theme-color" content="#1e293b" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Aranya One - Premium Edition" />
        <meta property="og:description" content="Your complete digital empire command center" />
        <meta property="og:type" content="website" />
      </Head>
      <PremiumNavigation />
      <PremiumHero />
      <section className="py-20 px-6">
        <PremiumAnalytics />
      </section>
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen transition-opacity duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-gray-800 mb-4 gpu-accelerated">🌟 Aranya One</h1>
            <p className="text-2xl text-gray-600 mb-6">Your Digital Empire Starts Here</p>
            <p className="text-lg text-green-600 font-semibold">
              🚀 Performance Optimized - July 17, 2025
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-green-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              🎯 Empire Control Center
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Add NavCards here if needed */}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Add StatCards here if needed */}
          </div>
          <div className="mt-12 text-center text-gray-600">
            <p>🏗️ Built with Next.js & Tailwind CSS | Optimized for Performance</p>
            <p className="text-sm mt-2">🌟 Aranya One Digital Empire Platform</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
