import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function FounderPage() {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>👑 Founder | Aranya One</title>
        <meta name="description" content="Meet the visionary founder of Aranya One, building the future of intelligent digital empires." />
        <meta name="keywords" content="Srinivas Makam, Aranya One founder, digital empire, visionary leader" />
        <meta property="og:title" content="👑 Founder | Aranya One" />
        <meta property="og:description" content="Meet the visionary founder of Aranya One, building the future of intelligent digital empires." />
        <meta property="og:type" content="profile" />
      </Head>

      <div className="min-h-screen bg-gradient-to-tr from-white via-slate-50 to-white py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
              🌍 Meet the Founder
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Vision. Legacy. Evolution. Behind every empire is a soul who never gave up.
            </p>
          </div>

          {/* Main Founder Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
            <div className="flex flex-col items-center space-y-6">
              {/* Founder Image */}
              <div className="relative w-40 h-40">
                <Image
                  src="/srinivas-makam.jpg"
                  width={160}
                  height={160}
                  alt="Srinivas Makam - Founder of Aranya One"
                  className={`rounded-full shadow-md border-4 border-blue-100 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-50'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    console.log('JPG failed, trying PNG...');
                    setImageError(true);
                  }}
                  priority
                />
                {imageError && (
                  <Image
                    src="/srinivas-makam.png"
                    width={160}
                    height={160}
                    alt="Srinivas Makam - Founder of Aranya One"
                    className="rounded-full shadow-md border-4 border-blue-100 absolute inset-0"
                    onLoad={() => setImageLoaded(true)}
                    priority
                  />
                )}
                {!imageLoaded && !imageError && (
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-md border-4 border-blue-100 flex items-center justify-center absolute inset-0">
                    <div className="text-white text-2xl font-bold">SM</div>
                  </div>
                )}
              </div>

              {/* Founder Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Srinivas Makam</h2>
                <p className="text-blue-600 font-medium">Founder & Visionary of Aranya One</p>
                <p className="text-sm text-gray-500 mt-1">🇮🇳 Telangana, India</p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="mt-8 italic text-xl text-gray-700 border-l-4 border-blue-500 pl-4">
              "I don't just build platforms - I architect digital empires that transform dreams into reality.  
              <span className="block mt-2">Every line of code is a bridge between what is and what could be.</span>
              <span className="block mt-2 font-semibold text-blue-600">The future doesn't wait - it's created by those who dare to build it."</span>
            </blockquote>

            {/* Legacy Statement */}
            <div className="mt-6 text-sm text-gray-500">
              Built with passion and precision in 🇮🇳 Telangana, India, fueled by an unwavering vision of the infinite.  
              <br />
              <span className="font-semibold text-blue-600">This is not just a startup - this is a legacy in motion, a digital empire rising.</span>
              <br />
              <span className="text-xs mt-1 block">🔐 Authenticated by Premium Token: Mn7HYW5eZVBMIX2ea73uXwNG</span>
            </div>
          </div>

          {/* Vision Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">The Vision</h3>
              <p className="text-gray-600 text-sm">
                Creating intelligent digital empires that evolve, learn, and grow beyond imagination. 
                Every line of code is a step toward the future.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">The Mission</h3>
              <p className="text-gray-600 text-sm">
                Empowering individuals and businesses to build, manage, and scale their digital presence 
                with world-class tools and intelligence.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
              <div className="text-3xl mb-3">👑</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">The Achievement</h3>
              <p className="text-gray-600 text-sm">
                Built 220+ files in 2 days, creating a world-class platform that rivals 
                enterprise solutions with premium features and stunning design.
              </p>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">🛤️ The Extraordinary Journey</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">The Visionary Spark</h4>
                  <p className="text-gray-600 text-sm">
                    Every great empire begins with a single idea. The vision of Aranya One was born 
                    from the belief that technology should serve humanity's highest potential.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-purple-500 rounded-full mt-1"></div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">The Rapid Build - 220+ Files in 2 Days</h4>
                  <p className="text-gray-600 text-sm">
                    An unprecedented development velocity: 220+ files, world-class design, premium features, 
                    and production-ready deployment - all crafted with precision and passion.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">The Global Impact</h4>
                  <p className="text-gray-600 text-sm">
                    Today marks the beginning. Tomorrow, Aranya One will be the foundation 
                    upon which digital empires are built worldwide, serving millions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact/Connect Section */}
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-4">🤝 Connect with the Visionary</h3>
            <p className="mb-6">
              Join the movement. Be part of the legacy. Help build the future of digital empires.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                📧 Contact Founder
              </button>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                🐦 Follow Journey
              </button>
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                💼 Join Mission
              </button>
            </div>
          </div>

          {/* Achievement Stats */}
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">🏆 Extraordinary Development Achievement</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">220+</div>
                <div className="text-sm opacity-90">Files Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2</div>
                <div className="text-sm opacity-90">Days Duration</div>
              </div>
              <div>
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm opacity-90">Complete Pages</div>
              </div>
              <div>
                <div className="text-3xl font-bold">95+</div>
                <div className="text-sm opacity-90">Performance Score</div>
              </div>
            </div>
          </div>

          {/* Premium Token Display */}
          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 text-white">
            <div className="text-sm font-semibold">
              🔐 Premium Platform Token: <code className="bg-white/20 px-2 py-1 rounded">Mn7HYW5eZVBMIX2ea73uXwNG</code>
            </div>
            <div className="text-xs mt-1 opacity-90">
              Powered by world-class technology and visionary leadership
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
