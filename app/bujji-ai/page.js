<div style={{
  marginTop: '40px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px'
}}>
  {[
    { label: '🛠️ Plugin Builder', link: '/services/plugin-dev' },
    { label: '🌐 Website Builder', link: '/services/fullstack-apps' },
    { label: '🔐 Cybersecurity Setup', link: '/services/security-lock' },
    { label: '💳 Payment Gateway', link: '/services/gateway' },
    { label: '📬 Email Campaigns', link: '/tools/email' },
    { label: '📈 Earnings Dashboard', link: '/tools/earnings' }
  ].map((btn, i) => (
    <a key={i} href={btn.link} style={{
      background: 'linear-gradient(to right, #00f2fe, #4facfe)',
      padding: '15px 20px',
      borderRadius: '10px',
      textAlign: 'center',
      color: '#000',
      fontWeight: 'bold',
      textDecoration: 'none',
      boxShadow: '0 0 10px rgba(0,255,255,0.4)'
    }}>
      {btn.label}
    </a>
  ))}
</div>
