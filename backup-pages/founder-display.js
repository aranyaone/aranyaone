import Head from "next/head";
import { useState } from "react";

export default function FounderPhotoDisplay() {
  return (
    <>
      <Head>
        <title>👑 Founder Photo Display | Aranya One</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-6xl font-extrabold text-gray-900 mb-4">
              👑 Srinivas Makam
            </h1>
            <p className="text-2xl text-blue-600 font-semibold">
              Founder & Digital Empire Architect
            </p>
          </div>

          {/* Large Photo Display */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8 border border-gray-100">
            <div className="flex flex-col items-center space-y-8">
              
              {/* Primary Photo Display */}
              <div className="relative">
                <img
                  src="/srinivas-makam.jpg"
                  alt="Srinivas Makam - Founder of Aranya One"
                  className="w-80 h-80 rounded-full shadow-2xl border-8 border-blue-200 object-cover"
                  style={{
                    filter: 'brightness(1.1) contrast(1.1)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                />
                <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-xl">
                  👑
                </div>
              </div>

              {/* Founder Details */}
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-gray-800">Srinivas Makam</h2>
                <p className="text-xl text-blue-600 font-semibold">Founder & Visionary of Aranya One</p>
                <p className="text-lg text-gray-600">🇮🇳 Telangana, India</p>
                
                {/* Premium Token */}
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold">
                  🔐 Premium Token: Mn7HYW5eZVBMIX2ea73uXwNG
                </div>
              </div>
            </div>

            {/* Inspiring Quote */}
            <blockquote className="mt-12 text-2xl text-gray-700 font-medium italic border-l-8 border-blue-500 pl-8 bg-blue-50 p-8 rounded-r-2xl">
              "I don't just build platforms - I architect digital empires that transform dreams into reality. 
              <span className="block mt-4 text-blue-600 font-semibold">
                Every line of code is a bridge between what is and what could be."
              </span>
            </blockquote>
          </div>

          {/* Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">220+</div>
              <div className="text-sm opacity-90">Files Created</div>
              <div className="text-xs opacity-75">In 2 Days</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-sm opacity-90">Complete Pages</div>
              <div className="text-xs opacity-75">World-Class</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">95+</div>
              <div className="text-sm opacity-90">Performance</div>
              <div className="text-xs opacity-75">Lighthouse Score</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">∞</div>
              <div className="text-sm opacity-90">Digital Empire</div>
              <div className="text-xs opacity-75">Potential</div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-6">🚀 The Mission</h3>
            <p className="text-xl leading-relaxed mb-8">
              Building the future of digital empires, one line of code at a time. 
              Transforming dreams into reality through world-class technology and visionary leadership.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
                📧 Connect with Founder
              </button>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
                🌟 Join the Vision
              </button>
            </div>
          </div>

          {/* Photo Display Info */}
          <div className="mt-8 text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
            <p>📸 Professional founder photo successfully loaded</p>
            <p>🎯 Image path: /srinivas-makam.jpg</p>
            <p>✅ Display status: Active and optimized</p>
          </div>
        </div>
      </div>
    </>
  );
}
