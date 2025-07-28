import Head from "next/head";
import { useState } from "react";

export default function FounderPerfect() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>👑 Srinivas Makam - AI Empire Emperor | Aranya One</title>
        <meta name="description" content="Meet Srinivas Makam - The Emperor who proved you don't need coding skills to build world-class digital empires." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Orbitron:wght@400;700;900&family=Montserrat:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen relative overflow-hidden">
        {/* Soft Light Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-pink-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-slate-50 to-rose-50 opacity-70"></div>
        
        {/* Gentle Floating Elements - Fixed positions to prevent hydration errors */}
        <div className="absolute inset-0">
          {[
            { w: 4, h: 4, left: 10, top: 20, delay: 0, duration: 5 },
            { w: 3, h: 3, left: 80, top: 10, delay: 1, duration: 6 },
            { w: 5, h: 5, left: 60, top: 70, delay: 2, duration: 4 },
            { w: 2, h: 2, left: 30, top: 40, delay: 1.5, duration: 7 },
            { w: 4, h: 4, left: 90, top: 60, delay: 3, duration: 5 },
            { w: 3, h: 3, left: 15, top: 80, delay: 0.5, duration: 6 },
            { w: 5, h: 5, left: 70, top: 30, delay: 2.5, duration: 4 },
            { w: 2, h: 2, left: 45, top: 15, delay: 4, duration: 7 },
            { w: 4, h: 4, left: 25, top: 65, delay: 1, duration: 5 },
            { w: 3, h: 3, left: 85, top: 85, delay: 3.5, duration: 6 },
            { w: 5, h: 5, left: 55, top: 5, delay: 0, duration: 4 },
            { w: 2, h: 2, left: 5, top: 50, delay: 2, duration: 7 }
          ].map((item, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-bounce"
              style={{
                width: `${item.w}px`,
                height: `${item.h}px`,
                background: i % 3 === 0 ? 'rgba(59, 130, 246, 0.4)' : i % 3 === 1 ? 'rgba(236, 72, 153, 0.4)' : 'rgba(148, 163, 184, 0.4)',
                left: `${item.left}%`,
                top: `${item.top}%`,
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.duration}s`
              }}
            ></div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="max-w-4xl w-full">
            
            {/* Hero Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-blue-200 shadow-xl p-8 md:p-12 mb-8">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-6xl font-black mb-4 text-gray-800" 
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      textShadow: '2px 2px 4px rgba(59, 130, 246, 0.2)'
                    }}>
                  👑 THE EMPEROR
                </h1>
                <p className="text-lg md:text-2xl font-bold text-gray-700 leading-relaxed"
                   style={{fontFamily: '"Montserrat", sans-serif'}}>
                  From <span className="font-black text-blue-600">ZERO CODING</span> to 
                  <span className="font-black text-pink-600"> INFINITE EMPIRE</span>
                </p>
                <div className="text-base md:text-lg text-gray-600 font-semibold mt-2"
                     style={{fontFamily: '"Cinzel", serif'}}>
                  ⚡ Where Vision Meets Artificial Intelligence ⚡
                </div>
              </div>

              {/* Profile Section */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                
                {/* Photo */}
                <div className="relative group">
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-300 via-sky-300 to-pink-300 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition duration-1000 animate-pulse"></div>
                  <img
                    src="/srinivas-makam.jpg"
                    alt="Srinivas Makam - AI Empire Emperor"
                    className="relative w-64 h-64 rounded-full object-cover border-4 border-white shadow-xl transform hover:scale-105 transition-transform duration-500"
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      e.target.src = '/srinivas-makam.png';
                    }}
                  />
                  {imageLoaded && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-blue-200 shadow-lg">
                      <span className="text-gray-700 text-sm font-bold"
                            style={{fontFamily: '"Cinzel", serif'}}>
                        ✨ AI EMPIRE EMPEROR ✨
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-5xl font-black mb-3 text-gray-800"
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        textShadow: '1px 1px 2px rgba(59, 130, 246, 0.2)'
                      }}>
                    Srinivas Makam
                  </h2>
                  <p className="text-xl md:text-2xl font-bold mb-2 text-blue-700"
                     style={{fontFamily: '"Cinzel", serif'}}>
                    🚀 Emperor & Visionary
                  </p>
                  <p className="text-lg md:text-xl mb-4 text-pink-600 font-bold"
                     style={{fontFamily: '"Montserrat", sans-serif'}}>
                    🇮🇳 Telangana, India
                  </p>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className="bg-blue-100 border-2 border-blue-300 rounded-xl px-4 py-2 text-sm text-blue-800 font-bold"
                          style={{fontFamily: '"Orbitron", monospace'}}>
                      🤖 AI-POWERED
                    </span>
                    <span className="bg-pink-100 border-2 border-pink-300 rounded-xl px-4 py-2 text-sm text-pink-800 font-bold"
                          style={{fontFamily: '"Orbitron", monospace'}}>
                      👑 ZERO-CODE EMPEROR
                    </span>
                    <span className="bg-cyan-100 border-2 border-cyan-300 rounded-xl px-4 py-2 text-sm text-cyan-800 font-bold"
                          style={{fontFamily: '"Orbitron", monospace'}}>
                      🌍 GLOBAL IMPACT
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-orange-200 shadow-xl p-6 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-3 animate-bounce">👑</div>
                <blockquote className="text-base md:text-lg font-semibold leading-relaxed mb-4 text-gray-800"
                           style={{
                             fontFamily: '"Playfair Display", serif',
                             textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                           }}>
                  "They said you need <span className="text-red-600 line-through font-bold">coding skills</span> to rule empires.
                  <span className="block mt-3 text-blue-700 font-black text-lg md:text-2xl">
                    I PROVED THAT <span className="text-pink-600">VISION + AI</span> = UNLIMITED POWER
                  </span>
                  <span className="block mt-3 text-green-700 text-sm md:text-base font-semibold">
                    This isn't just success - this is the BLUEPRINT for the AI REVOLUTION.
                  </span>
                </blockquote>
                <div className="text-gray-600 text-sm md:text-base font-semibold"
                     style={{fontFamily: '"Cinzel", serif'}}>
                  — Srinivas Makam, Emperor of AI-Powered Innovation
                </div>
              </div>
            </div>

            {/* Advantages Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              
              {/* Why No-Code is POWERFUL */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-blue-200 shadow-xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center"
                    style={{fontFamily: '"Cinzel", serif'}}>
                  🎯 Why "Zero Coding" is My SUPERPOWER
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✅</span>
                    <span><strong className="text-blue-700">Pure Innovation Focus</strong> - No technical limitations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✅</span>
                    <span><strong className="text-blue-700">Represents 99% of Entrepreneurs</strong> - Building for majority</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✅</span>
                    <span><strong className="text-blue-700">AI-First Mindset</strong> - Leveraging the future</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✅</span>
                    <span><strong className="text-blue-700">Faster Innovation</strong> - Ideas to reality at light speed</span>
                  </li>
                </ul>
              </div>

              {/* Business Revolution */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-200 shadow-xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center"
                    style={{fontFamily: '"Cinzel", serif'}}>
                  🚀 The Business Revolution
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2 font-bold">🔥</span>
                    <span><strong className="text-pink-700">$13+ Billion No-Code Market</strong> - Riding the biggest wave</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2 font-bold">🔥</span>
                    <span><strong className="text-pink-700">Democratizing Technology</strong> - Making empires accessible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2 font-bold">🔥</span>
                    <span><strong className="text-pink-700">AI Partnership Model</strong> - Human creativity + AI execution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2 font-bold">🔥</span>
                    <span><strong className="text-pink-700">Future-Proof Strategy</strong> - Building for tomorrow</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Empire Showcase */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-cyan-200 shadow-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4"
                  style={{fontFamily: '"Playfair Display", serif'}}>
                🏆 The Proof: Aranya One Empire
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 max-w-3xl mx-auto"
                 style={{fontFamily: '"Montserrat", sans-serif'}}>
                From a visionary with <span className="font-bold text-red-600">zero coding background</span> to a 
                <span className="font-bold text-blue-600"> world-class digital empire</span> with 220+ premium files, 
                advanced AI integration, and enterprise-grade architecture. 
                <span className="block mt-2 font-bold text-green-600">
                  This is what happens when unlimited vision meets unlimited AI potential.
                </span>
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-blue-100 rounded-xl p-3 border border-blue-200">
                  <div className="text-xl font-bold text-blue-800">220+</div>
                  <div className="text-xs text-blue-600">Premium Files</div>
                </div>
                <div className="bg-red-100 rounded-xl p-3 border border-red-200">
                  <div className="text-xl font-bold text-red-800">0</div>
                  <div className="text-xs text-red-600">Lines Coded</div>
                </div>
                <div className="bg-green-100 rounded-xl p-3 border border-green-200">
                  <div className="text-xl font-bold text-green-800">100%</div>
                  <div className="text-xs text-green-600">AI-Powered</div>
                </div>
                <div className="bg-purple-100 rounded-xl p-3 border border-purple-200">
                  <div className="text-xl font-bold text-purple-800">∞</div>
                  <div className="text-xs text-purple-600">Possibilities</div>
                </div>
              </div>

              {/* Authentication */}
              <div className="bg-gray-100 rounded-xl p-3 border border-gray-200 inline-block">
                <div className="text-gray-600 text-xs mb-1">🔐 Premium Empire Authentication</div>
                <div className="font-mono text-xs text-orange-600">Mn7HYW5eZVBMIX2ea73uXwNG</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="text-center mt-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-gray-200 shadow-xl p-4 inline-block">
                <p className="text-gray-700 text-sm mb-3">
                  🌟 Ready to build your AI-powered empire?
                </p>
                <div className="space-x-3">
                  <a 
                    href="/" 
                    className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold px-4 py-2 rounded-xl border border-blue-300 transition-all duration-300 text-sm"
                  >
                    Explore Empire
                  </a>
                  <a 
                    href="/founder" 
                    className="inline-block bg-pink-100 hover:bg-pink-200 text-pink-800 font-semibold px-4 py-2 rounded-xl border border-pink-300 transition-all duration-300 text-sm"
                  >
                    Full Story
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
