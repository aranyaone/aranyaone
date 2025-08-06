import Head from "next/head";
import { useState } from "react";

export default function FounderSimple() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>👑 Founder Simple | Aranya One</title>
        <meta name="description" content="Meet Srinivas Makam - Founder of Aranya One" />
      </Head>

      <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-50 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            👑 Meet the Founder
          </h1>

          {/* Founder Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
            {/* Photo Section */}
            <div className="mb-8">
              <img
                src="/srinivas-makam.jpg"
                alt="Srinivas Makam - Founder of Aranya One"
                className="w-48 h-48 rounded-full mx-auto border-4 border-blue-200 shadow-lg object-cover"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  console.log('JPG failed, trying PNG...');
                  e.target.src = '/srinivas-makam.png';
                }}
                style={{ display: 'block' }}
              />
              {imageLoaded && (
                <div className="mt-4 text-green-600 text-sm">✅ Photo loaded successfully</div>
              )}
            </div>

            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Srinivas Makam</h2>
              <p className="text-xl text-blue-600 font-semibold mb-1">Founder & Visionary</p>
              <p className="text-gray-500 mb-6">🇮🇳 Telangana, India</p>

              {/* Powerful AI Quote */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 mb-6 border border-purple-100">
                <blockquote className="italic text-xl text-gray-800 font-medium mb-4 leading-relaxed">
                  "They said you need to code to build an empire. I proved them wrong. 
                  <span className="block mt-3 text-purple-700 font-semibold">
                    With AI as my co-pilot, I didn't write a single line of code - yet built a digital empire that rivals the greatest tech giants.
                  </span>
                  <span className="block mt-3 text-blue-700 font-bold">
                    This is the future: Where vision meets artificial intelligence, impossibility becomes inevitable.
                  </span>
                </blockquote>
                <div className="text-sm text-gray-600 font-medium">
                  🤖 Built entirely with AI assistance • 🏗️ Zero traditional coding • 🚀 Maximum innovation
                </div>
              </div>

              {/* Vision Statement */}
              <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-2xl p-6 mb-6 border border-indigo-100">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  🌟 The AI Revolution Vision
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  "Aranya One isn't just a platform - it's proof that the democratization of technology has arrived. 
                  When creativity meets AI, when vision partners with artificial intelligence, we don't just build websites - 
                  <span className="font-semibold text-indigo-700"> we architect the future itself</span>."
                </p>
              </div>

              {/* Mission */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6 border border-emerald-100">
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                  🚀 The AI-Powered Empire
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Where others see limitations, I see possibilities. Aranya One represents the dawn of a new era - 
                  where artificial intelligence becomes the great equalizer, empowering visionaries to build 
                  world-class digital empires without writing a single line of code.
                </p>
                <div className="mt-3 text-sm text-emerald-700 font-medium">
                  💡 Vision-Driven • 🤖 AI-Powered • 🌍 Globally Impactful
                </div>
              </div>

              {/* Token & Achievement Badge */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                <div className="text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm font-bold text-amber-800 mb-1">AI Empire Builder</div>
                  <div className="text-xs text-gray-600 mb-2">
                    Proof that vision + AI = Unlimited possibility
                  </div>
                  <div className="text-xs text-gray-400">
                    🔐 Authenticated by Premium Token: Mn7HYW5eZVBMIX2ea73uXwNG
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 space-x-4">
            <a 
              href="/founder" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Full Founder Page
            </a>
            <a 
              href="/" 
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
