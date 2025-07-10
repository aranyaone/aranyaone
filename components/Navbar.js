// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ddd'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        👑 Aranya Empire
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link href="/"><span>🏠 Home</span></Link>
        <Link href="/services"><span>🛠️ Services</span></Link>
        <Link href="/founder"><span>🧑‍💼 Founder</span></Link>
        <Link href="/tools"><span>🧰 Tools</span></Link>
      </div>
    </nav>
  );
}
