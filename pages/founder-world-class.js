import Head from "next/head";
import { useState } from "react";

export default function FounderWorldClass() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>👑 Srinivas Makam - AI Empire Emperor | Aranya One</title>
        <meta name="description" content="Meet Srinivas Makam - The Emperor who proved you don't need coding skills to build world-class digital empires. Royal pioneer of AI-powered business innovation." />
        <meta name="keywords" content="AI Empire Emperor, No-Code Royal, Digital Innovation, Srinivas Makam, Aranya One" />
        <meta property="og:title" content="👑 AI Empire Emperor - Srinivas Makam" />
        <meta property="og:description" content="From zero coding background to royal digital empire. The emperor's blueprint for the AI revolution." />
        <meta property="og:type" content="profile" />
        
        {/* Premium Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Orbitron:wght@400;700;900&family=Montserrat:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen relative overflow-hidden">
        {/* Soft Classic Light Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-pink-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-slate-50 to-rose-50 opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-50 via-white to-pink-50 opacity-60"></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>
        
        {/* Gentle Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-bounce"
              style={{
                width: `${Math.random() * 4 + 3}px`,
                height: `${Math.random() * 4 + 3}px`,
                background: i % 3 === 0 ? 'rgba(59, 130, 246, 0.3)' : i % 3 === 1 ? 'rgba(236, 72, 153, 0.3)' : 'rgba(148, 163, 184, 0.3)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="max-w-4xl w-full">
            
            {/* Hero Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 mb-8">
              
              {/* Header Section */}
              <div className="text-center mb-10">
                <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tight text-gray-800 transform hover:scale-105 transition-transform duration-300" 
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      textShadow: '3px 3px 6px rgba(59, 130, 246, 0.3), 1px 1px 2px rgba(0,0,0,0.1)',
                      color: '#1f2937'
                    }}>
                  👑 THE EMPEROR
                </h1>
                <p className="text-xl md:text-3xl font-bold mb-4 text-gray-700 leading-relaxed"
                   style={{
                     fontFamily: '"Montserrat", sans-serif',
                     textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                   }}>
                  From <span className="font-black text-blue-600">ZERO CODING</span> to 
                  <span className="font-black text-pink-600"> INFINITE EMPIRE</span>
                </p>
                <div className="text-lg md:text-xl text-gray-600 font-semibold"
                     style={{
                       fontFamily: '"Cinzel", serif',
                       textShadow: '1px 1px 1px rgba(0,0,0,0.1)'
                     }}>
                  ⚡ Where Vision Meets Artificial Intelligence ⚡
                </div>
              </div>

              {/* Founder Profile Section */}
              <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
                
                {/* Photo Container */}
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-300 via-sky-300 to-pink-300 rounded-full blur-md opacity-60 group-hover:opacity-80 transition duration-1000 animate-pulse"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-200 via-white to-rose-200 rounded-full blur-sm opacity-40 group-hover:opacity-60 transition duration-1000"></div>
                  <img
                    src="/srinivas-makam.jpg"
                    alt="Srinivas Makam - AI Empire Emperor"
                    className="relative w-72 h-72 rounded-full object-cover border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    style={{
                      border: '6px solid white',
                      boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2), 0 0 30px rgba(236, 72, 153, 0.1)'
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      e.target.src = '/srinivas-makam.png';
                    }}
                  />
                  {imageLoaded && (
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-blue-200 shadow-lg">
                      <span className="text-gray-700 text-lg font-bold"
                            style={{fontFamily: '"Cinzel", serif'}}>
                        ✨ AI EMPIRE EMPEROR ✨
                      </span>
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-5xl md:text-7xl font-black mb-4 text-gray-800"
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        textShadow: '2px 2px 4px rgba(59, 130, 246, 0.2), 1px 1px 2px rgba(0,0,0,0.1)'
                      }}>
                    Srinivas Makam
                  </h2>
                  <p className="text-3xl font-bold mb-3 text-blue-700"
                     style={{
                       fontFamily: '"Cinzel", serif',
                       textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                     }}>
                    🚀 Emperor & Visionary
                  </p>
                  <p className="text-2xl mb-4 text-pink-600 font-bold"
                     style={{fontFamily: '"Montserrat", sans-serif'}}>
                    🇮🇳 Telangana, India
                  </p>
                  
                  {/* Achievement Badges */}
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <span className="bg-blue-100 border-2 border-blue-300 rounded-2xl px-6 py-3 text-lg text-blue-800 font-bold shadow-lg"
                          style={{fontFamily: '"Orbitron", monospace'}}>
                      🤖 AI-POWERED
                    </span>
                    <span className="bg-pink-100 border-2 border-pink-300 rounded-2xl px-6 py-3 text-lg text-pink-800 font-bold shadow-lg"
                          style={{fontFamily: '"Orbitron", monospace'}}>
                      👑 ZERO-CODE EMPEROR
                    </span>
                    <span className="bg-cyan-100 border-2 border-cyan-300 rounded-2xl px-6 py-3 text-lg text-cyan-800 font-bold shadow-lg"
                          style={{fontFamily: '"Orbitron", monospace'}}>
                      🌍 GLOBAL IMPACT
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Revolutionary Quote Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-orange-200 shadow-xl p-8 mb-8">
              <div className="text-center">
                <div className="text-8xl mb-8 animate-bounce">�</div>
                <blockquote className="text-3xl md:text-4xl font-black leading-relaxed mb-8 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent"
                           style={{
                             fontFamily: '"Playfair Display", serif',
                             textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                           }}>
                  "They said you need <span className="text-red-400 line-through animate-pulse">coding skills</span> to rule empires.
                  <span className="block mt-6 text-yellow-300 font-black text-5xl animate-pulse">
                    I PROVED THAT <span className="text-cyan-300">VISION + AI</span> = UNLIMITED POWER
                  </span>
                  <span className="block mt-6 text-green-300 text-2xl font-bold">
                    This isn't just success - this is the ROYAL BLUEPRINT for the AI REVOLUTION.
                  </span>
                </blockquote>
                <div className="text-amber-200 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                     style={{fontFamily: '"Cinzel", serif'}}>
                  — Srinivas Makam, Emperor of AI-Powered Innovation
                </div>
              </div>
            </div>

            {/* Revolutionary Advantages Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              
              {/* Why No-Code is POWERFUL */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-blue-200 shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"
                    style={{fontFamily: '"Cinzel", serif'}}>
                  🎯 Why "Zero Coding" is My SUPERPOWER
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">✅</span>
                    <span><strong className="text-blue-700">Pure Innovation Focus</strong> - No technical limitations, unlimited creativity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">✅</span>
                    <span><strong className="text-blue-700">Represents 99% of Entrepreneurs</strong> - I'm building for the majority</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">✅</span>
                    <span><strong className="text-blue-700">AI-First Mindset</strong> - Leveraging the future, not the past</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">✅</span>
                    <span><strong className="text-blue-700">Faster Innovation</strong> - Ideas to reality at light speed</span>
                  </li>
                </ul>
              </div>

              {/* Business Revolution */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-200 shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"
                    style={{fontFamily: '"Cinzel", serif'}}>
                  🚀 The Business Revolution
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-3 font-bold">🔥</span>
                    <span><strong className="text-pink-700">$13+ Billion No-Code Market</strong> - Riding the biggest wave</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-3 font-bold">🔥</span>
                    <span><strong className="text-pink-700">Democratizing Technology</strong> - Making empires accessible to all</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-3 font-bold">🔥</span>
                    <span><strong className="text-pink-700">AI Partnership Model</strong> - Human creativity + AI execution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-3 font-bold">🔥</span>
                    <span><strong className="text-pink-700">Future-Proof Strategy</strong> - Building for tomorrow, not yesterday</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* The Empire Showcase */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-cyan-200 shadow-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6"
                  style={{fontFamily: '"Playfair Display", serif'}}>
                🏆 The Proof: Aranya One Empire
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto"
                 style={{fontFamily: '"Montserrat", sans-serif'}}>
                From a visionary with <span className="font-bold text-red-600">zero coding background</span> to a 
                <span className="font-bold text-blue-600"> world-class digital empire</span> with 220+ premium files, 
                advanced AI integration, and enterprise-grade architecture. 
                <span className="block mt-3 font-bold text-green-600">
                  This is what happens when unlimited vision meets unlimited AI potential.
                </span>
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="backdrop-blur-md bg-white/20 rounded-xl p-4 border border-white/30">
                  <div className="text-2xl font-bold text-white">220+</div>
                  <div className="text-sm text-white/80">Premium Files</div>
                </div>
                <div className="backdrop-blur-md bg-white/20 rounded-xl p-4 border border-white/30">
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-sm text-white/80">Lines Coded</div>
                </div>
                <div className="backdrop-blur-md bg-white/20 rounded-xl p-4 border border-white/30">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-white/80">AI-Powered</div>
                </div>
                <div className="backdrop-blur-md bg-white/20 rounded-xl p-4 border border-white/30">
                  <div className="text-2xl font-bold text-white">∞</div>
                  <div className="text-sm text-white/80">Possibilities</div>
                </div>
              </div>

              {/* Authentication */}
              <div className="backdrop-blur-md bg-white/20 rounded-xl p-4 border border-white/30 inline-block">
                <div className="text-white/80 text-sm mb-1">🔐 Premium Empire Authentication</div>
                <div className="font-mono text-xs text-yellow-300">Mn7HYW5eZVBMIX2ea73uXwNG</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-8">
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6 inline-block">
                <p className="text-white text-lg mb-4">
                  🌟 Ready to build your AI-powered empire?
                </p>
                <div className="space-x-4">
                  <a 
                    href="/" 
                    className="inline-block backdrop-blur-md bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-xl border border-white/30 transition-all duration-300 transform hover:scale-105"
                  >
                    Explore Empire
                  </a>
                  <a 
                    href="/founder" 
                    className="inline-block backdrop-blur-md bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-xl border border-white/30 transition-all duration-300 transform hover:scale-105"
                  >
                    Full Story
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Orbitron:wght@400;700;900&family=Montserrat:wght@300;400;600;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes gentleGlow {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(236, 72, 153, 0.2);
          }
          50% { 
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.4), 0 0 40px rgba(236, 72, 153, 0.3);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-gentle-glow {
          animation: gentleGlow 3s ease-in-out infinite;
        }
        
        /* Improved 3D Text Effects - Softer */
        .text-3d-soft {
          text-shadow: 
            1px 1px 1px rgba(0,0,0,0.1),
            2px 2px 2px rgba(59, 130, 246, 0.2),
            3px 3px 3px rgba(0,0,0,0.1);
        }
        
        /* Glass morphism Light */
        .glass-light {
          backdrop-filter: blur(10px) saturate(180%);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(59, 130, 246, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        /* Soft Button Effects */
        .soft-button {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1));
          border: 2px solid rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }
        
        .soft-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </>
  );
}
