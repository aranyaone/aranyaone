'use client';

import Link from 'next/link';

export default function Navbar() {
  const navItemStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    background: 'linear-gradient(90deg, #ff8a00, #e52e71, #9b00ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease, text-shadow 0.3s ease',
  };

  const navItemHover = {
    transform: 'scale(1.1)',
    textShadow: '4px 4px 10px rgba(255, 255, 255, 0.4)',
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '50px',
      padding: '20px 30px',
      background: 'linear-gradient(to right, #1e1e2f, #202040)',
      boxShadow: '0px 8px 20px rgba(0,0,0,0.5)',
      borderBottom: '2px solid #444',
    }}>
      {[
        { href: '/', label: '🏠 Home' },
        { href: '/services', label: '🛠️ Services' },
        { href: '/founder', label: '👑 Founder' },
        { href: '/tools', label: '🧰 Tools' }
      ].map((item, index) => (
        <Link
          key={index}
          href={item.href}
          style={navItemStyle}
          onMouseOver={e => Object.assign(e.target.style, navItemHover)}
          onMouseOut={e => Object.assign(e.target.style, navItemStyle)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
