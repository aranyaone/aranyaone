import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function FounderPage() {
  const [imageError, setImageError] = useState(false);

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
              <div className="relative">
                {!imageError ? (
                  <Image
                    src="/founder.jpg"
                    width={160}
                    height={160}
                    alt="Srinivas Makam"
                    className="rounded-full shadow-md border-4 border-blue-100"
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  <div className="relative">
                    <Image
                      src="/founder.svg"
                      width={160}
                      height={160}
                      alt="Srinivas Makam"
                      className="rounded-full shadow-md border-4 border-blue-100"
                    />
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
              "I'm not just building a platform.  
              <span className="block mt-1">I'm designing a universe where intelligence, emotion, and technology rise together as one crown."</span>
            </blockquote>

            {/* Legacy Statement */}
            <div className="mt-6 text-sm text-gray-500">
              Built with passion in 🇮🇳 Telangana, fueled by dreams of the infinite.  
              <br />
              <span className="font-semibold">This is not a startup. This is a legacy in motion.</span>
            </div>
          </div>

          {/* Vision Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
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
          </div>

          {/* Journey Timeline */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">🛤️ The Journey</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">The Spark</h4>
                  <p className="text-gray-600 text-sm">
                    Every great empire begins with a single idea. The vision of Aranya One was born 
                    from the belief that technology should serve humanity, not the other way around.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-purple-500 rounded-full mt-1"></div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">The Build</h4>
                  <p className="text-gray-600 text-sm">
                    Countless nights, endless code, and unwavering determination. Building not just 
                    a platform, but a legacy that will inspire generations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">The Future</h4>
                  <p className="text-gray-600 text-sm">
                    Today marks the beginning. Tomorrow, Aranya One will be the foundation 
                    upon which digital empires are built worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact/Connect Section */}
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">🤝 Connect with the Vision</h3>
            <p className="mb-6">
              Join the movement. Be part of the legacy. Help build the future of digital empires.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                📧 Contact
              </button>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                🐦 Follow Journey
              </button>
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                💼 Join Mission
              </button>
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
