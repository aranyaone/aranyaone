export default function FullstackAppsPage() {
  return (
    <main style={{
      padding: '60px',
      fontFamily: 'Arial',
      background: 'linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1 style={{
        fontSize: '36px',
        marginBottom: '20px',
        color: '#00ffd5',
        textShadow: '1px 1px 8px #00ffd5'
      }}>
        🌐 Full-Stack Website & App Building
      </h1>
      <p style={{ fontSize: '20px' }}>
        We build high-performance websites and apps using modern frameworks, backed by strong architecture and great UI/UX design.
      </p>
      <ul style={{ marginTop: '20px', fontSize: '18px', lineHeight: '2em' }}>
        <li>✅ Next.js, React, Tailwind, Node.js</li>
        <li>✅ Secure databases (MongoDB, PostgreSQL, Firebase)</li>
        <li>✅ Progressive Web Apps (PWAs)</li>
        <li>✅ SEO-optimized static sites</li>
        <li>✅ Admin dashboards with real-time data</li>
      </ul>
    </main>
  );
}
