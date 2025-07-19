import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, memo } from 'react';

// Icons (using Unicode for now, will be replaced with proper icons)
const CrownIcon = () => <span className="royal-icon crown-animation">👑</span>;
const StarIcon = () => <span className="royal-icon">⭐</span>;
const ShieldIcon = () => <span className="royal-icon">🛡️</span>;
const DiamondIcon = () => <span className="royal-icon">💎</span>;

const StatCard = memo(({ title, value, description, icon, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`royal-card transform transition-all duration-700 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="royal-icon-container">{icon}</div>
        <div className="status-online"></div>
      </div>
      <h3 className="text-2xl font-bold text-yellow-400 mb-2">{value}</h3>
      <p className="text-lg font-semibold text-white mb-1">{title}</p>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
});

const ServiceCard = memo(({ title, description, icon, link, isPrivate = false }) => (
  <div className="royal-card group cursor-pointer">
    <div className="flex items-center mb-4">
      {icon}
      {isPrivate && <span className="ml-2 text-xs bg-red-600 px-2 py-1 rounded text-white">PRIVATE</span>}
    </div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
      {title}
    </h3>
    <p className="text-gray-400 mb-4 leading-relaxed">{description}</p>
    <Link href={link} className="btn-royal inline-block text-center">
      {isPrivate ? '🔐 Admin Only' : 'Explore →'}
    </Link>
  </div>
));

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Preload critical resources
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    link.as = 'style';
    document.head.appendChild(link);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="royal-loader"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Aranya One - Royal Digital Empire | Premium AI Solutions</title>
        <meta name="description" content="Experience the power of Aranya One - Your premium digital empire with AI solutions, royal wallet management, and world-class tools." />
        <meta name="keywords" content="Aranya One, Digital Empire, AI Solutions, Royal Wallet, Premium Tools, Srinivas Makam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Aranya One - Royal Digital Empire" />
        <meta property="og:description" content="Premium AI solutions and digital empire management platform" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>

      {/* Navigation Header */}
      <header className="royal-header fixed top-0 w-full z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CrownIcon />
              <h1 className="text-2xl font-bold text-white">Aranya One</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/services" className="nav-link">Services</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/founder" className="nav-link">Founder</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
              <Link href="/admin-dashboard" className="btn-royal text-sm">
                👑 Royal Access
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <CrownIcon />
            <h1 className="royal-title mt-6 mb-6">
              Welcome to Aranya One
            </h1>
            <p className="royal-subtitle mb-8 max-w-2xl mx-auto">
              Your Premium Digital Empire - Powered by AI, Secured by Innovation, 
              Ruled by Excellence
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/services" className="btn-royal">
                🚀 Explore Services
              </Link>
              <Link href="/bujji-ai" className="btn-royal">
                🤖 Meet Bujji AI
              </Link>
              <Link href="/royal-wallet" className="btn-royal glow-gold">
                💰 Royal Wallet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 bg-opacity-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Empire Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard
              icon={<DiamondIcon />}
              title="Active Services"
              value="25+"
              description="Premium tools and AI solutions"
              delay={100}
            />
            <StatCard
              icon={<ShieldIcon />}
              title="Security Level"
              value="100%"
              description="Royal-grade protection"
              delay={200}
            />
            <StatCard
              icon={<StarIcon />}
              title="User Satisfaction"
              value="99.9%"
              description="Exceptional experience"
              delay={300}
            />
            <StatCard
              icon={<CrownIcon />}
              title="Empire Status"
              value="ACTIVE"
              description="Fully operational kingdom"
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Royal Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<span className="text-3xl">🤖</span>}
              title="Bujji AI Queen"
              description="Your intelligent AI companion for all empire operations and decision-making support."
              link="/bujji-ai"
            />
            <ServiceCard
              icon={<span className="text-3xl">🏪</span>}
              title="Plugin Store"
              description="Discover and install premium plugins to enhance your digital empire capabilities."
              link="/plugin-store"
            />
            <ServiceCard
              icon={<span className="text-3xl">📊</span>}
              title="Analytics Dashboard"
              description="Real-time insights and performance metrics for your entire digital kingdom."
              link="/analytics"
            />
            <ServiceCard
              icon={<span className="text-3xl">💳</span>}
              title="Royal Wallet"
              description="Secure financial management and transaction processing for your empire."
              link="/royal-wallet"
              isPrivate={true}
            />
            <ServiceCard
              icon={<span className="text-3xl">🛡️</span>}
              title="Security Center"
              description="Advanced protection systems and monitoring for your digital assets."
              link="/security"
            />
            <ServiceCard
              icon={<span className="text-3xl">👑</span>}
              title="Crown Control"
              description="Ultimate administrative control panel for empire management."
              link="/crown-control"
              isPrivate={true}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-900 bg-opacity-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            About Aranya One
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Aranya One is a premium digital empire platform created by 
              <span className="text-yellow-400 font-semibold"> King Srinivas Makam</span>. 
              Our mission is to provide world-class AI solutions, secure financial management, 
              and innovative tools for the digital age.
            </p>
            <div className="flex justify-center">
              <Link href="/founder" className="btn-royal">
                Meet the Founder 👑
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="royal-footer py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CrownIcon />
                <h3 className="text-xl font-bold text-white">Aranya One</h3>
              </div>
              <p className="text-gray-400">
                Your premium digital empire platform with AI-powered solutions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/bujji-ai" className="hover:text-yellow-400">Bujji AI</Link></li>
                <li><Link href="/plugin-store" className="hover:text-yellow-400">Plugin Store</Link></li>
                <li><Link href="/analytics" className="hover:text-yellow-400">Analytics</Link></li>
                <li><Link href="/security" className="hover:text-yellow-400">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Empire</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-yellow-400">About</Link></li>
                <li><Link href="/founder" className="hover:text-yellow-400">Founder</Link></li>
                <li><Link href="/legal" className="hover:text-yellow-400">Legal</Link></li>
                <li><Link href="/support" className="hover:text-yellow-400">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-yellow-400 text-2xl">📧</a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 text-2xl">🐦</a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 text-2xl">💼</a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 text-2xl">📱</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Aranya One Digital Empire. All rights reserved. | 
              Powered by <span className="text-yellow-400">King Srinivas Makam</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
