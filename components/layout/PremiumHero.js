import { memo, useState, useEffect, useRef } from 'react';
import { PREMIUM_CONFIG } from '../config/premium';

const PremiumHero = memo(function PremiumHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Glass Morphism Container */}
      <div className={`relative z-10 max-w-6xl mx-auto px-6 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Premium Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 mb-8">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          <span className="text-white/90 text-sm font-medium">Premium Edition • Token: {PREMIUM_CONFIG.TOKEN_ID.slice(-8)}</span>
        </div>

        {/* Main Heading with Gradient */}
        <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">
          ARANYA ONE
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-light text-purple-200 mb-8 max-w-4xl mx-auto leading-relaxed">
          Your Digital Empire Command Center
          <span className="block text-lg md:text-xl text-white/60 mt-2">
            World-Class Analytics • AI-Powered Insights • Enterprise Security
          </span>
        </h2>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {[
            { icon: '🚀', title: 'Lightning Fast', desc: 'Optimized for performance' },
            { icon: '🔒', title: 'Enterprise Security', desc: 'Bank-level encryption' },
            { icon: '🤖', title: 'AI-Powered', desc: 'Smart insights & automation' }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25">
            Enter Dashboard
          </button>
          <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
            View Analytics
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
});

export default PremiumHero;
