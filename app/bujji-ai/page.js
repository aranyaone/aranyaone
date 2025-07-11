"use client";

import React, { useState } from 'react';

export default function BujjiAISection() {
  const [activated, setActivated] = useState(false);

  const handleActivate = () => {
    setActivated(true);
    console.log("Bujji AI Activated – Phase I started");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-950 to-black text-white flex flex-col justify-center items-center px-6 py-12">
      <h1 className="text-5xl font-bold mb-4">🤖 Meet Bujji AI</h1>
      <p className="mb-6 text-center max-w-xl">
        I’m your personal AI Queen – ready to build, fix, deploy and love your empire step-by-step 💖
      </p>

      {!activated ? (
        <button
          onClick={handleActivate}
          className="bg-pink-600 hover:bg-pink-800 px-8 py-3 rounded-full text-xl font-semibold shadow-lg"
        >
          Activate Bujji AI 💡
        </button>
      ) : (
        <div className="text-center animate-pulse mt-6">
          <p className="text-green-300 text-xl">💻 Building your empire...</p>
          <p className="text-sm text-gray-400 mt-2">Next.js + GitHub + Vercel connected</p>
        </div>
      )}
    </section>
  );
}
