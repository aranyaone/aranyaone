export default function CybersecurityPage() {
  return (
    <main style={{
      padding: '60px',
      fontFamily: 'Arial',
      background: 'linear-gradient(to right, #232526, #414345)',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1 style={{
        fontSize: '36px',
        marginBottom: '20px',
        color: '#00ffd5',
        textShadow: '1px 1px 8px #00ffd5'
      }}>
        🔐 Cybersecurity & Identity Lock Systems
      </h1>
      <p style={{ fontSize: '20px' }}>
        We provide world-class security solutions to protect your website, data, users, and money from digital threats.
      </p>
      <ul style={{ marginTop: '20px', fontSize: '18px', lineHeight: '2em' }}>
        <li>✅ SSL, DNS, and HTTPS Firewall Setup</li>
        <li>✅ Admin panel + role-based permissions</li>
        <li>✅ Anti-bot & API abuse protection</li>
        <li>✅ Identity Lock for high-profile users (Crown Lock 🔒)</li>
        <li>✅ Emergency backup + auto-recovery system</li>
      </ul>
    </main>
  );
}
