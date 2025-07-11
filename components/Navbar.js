'use client';

import Link from 'next/link';

export default function Navbar() {
  const navItemBaseStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    background: 'linear-gradient(90deg, #ff8a00, #e52e71, #9b00ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '2px 2px 6px rgba(255, 255, 255, 0.5)',
    transition: 'transform 0.3s ease, text-shadow 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '60px',
      padding: '20px',
      background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
      boxShadow: '0px 10px 30px rgba(0,0,0,0.6)',
      borderBottom: '2px solid #5f5f5f',
    }}>
      <Link href="/" style={navItemBaseStyle}>
        Home
      </Link>
      <Link href="/services" style={navItemBaseStyle}>
        Services
      </Link>
      <Link href="/founder" style={navItemBaseStyle}>
        Founder
      </Link>
      <Link href="/tools" style={navItemBaseStyle}>
        Tools
      </Link>
    </nav>
  );
}
