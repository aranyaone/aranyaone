'use client';
import Link from 'next/link';

export default function ServicesPage() {
  const linkStyle = {
    fontSize: '20px',
    margin: '12px 0',
    display: 'block',
    color: '#00ffd5',
    textDecoration: 'none',
    textShadow: '1px 1px 6px rgba(0,255,213,0.4)'
  };

  return (
    <main style={{
      padding: '60px',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to right, #1c1c3c, #27273f)',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1 style={{
        fontSize: '42px',
        marginBottom: '30px',
        color: '#00ffd5',
        textShadow: '2px 2px 10px rgba(0, 255, 213, 0.5)'
      }}>
        💼 Our Royal Services
      </h1>

      <Link href="/services/plugin-dev" style={linkStyle}>🛠️ Custom AI Plugin Development</Link>
      <Link href="/services/fullstack-apps" style={linkStyle}>🌐 Full-Stack Website & App Building</Link>
      <Link href="/services/cybersecurity" style={linkStyle}>🔐 Cybersecurity & Identity Lock Systems</Link>
      <Link href="/services/gateway" style={linkStyle}>💳 Global Payment Gateway Setup</Link>
      <Link href="/services/dashboards" style={linkStyle}>📊 Business Dashboards & Automation</Link>
      <Link href="/services/brain-room" style={linkStyle}>🧠 Brain Room AI Control Panel</Link>
      <Link href="/services/branding" style={linkStyle}>🎯 Branding, SEO & Strategy</Link>
      <Link href="/services/engagement-ai" style={linkStyle}>💬 24/7 AI Customer Engagement Systems</Link>
    </main>
  );
}
