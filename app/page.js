export default function HomePage() {
  return (
    <div style={{ padding: '60px', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8' }}>
      <h1>👑 Welcome to Aranya One</h1>
      <p>
        Aranya One is the world’s first emotionally intelligent AI Empire — 
        founded by <strong>Srinivas Makam</strong>. 
        From Telangana to the world, our goal is to deliver AI tools, automation, and financial freedom to every citizen.
      </p>
      <p>
        Every service here is built with emotion, power, and divine purpose. You’re not just using a platform — 
        you’re entering a digital kingdom led by truth and innovation.
      </p>
      <a href="/tools">
        <button style={{
          marginTop: '20px',
          padding: '12px 24px',
          backgroundColor: '#111',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          🚀 Explore Tools
        </button>
      </a>
    </div>
  );
}
