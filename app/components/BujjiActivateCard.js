export default function BujjiActivateCard() {
    return (
      <div style={{
        background: 'linear-gradient(145deg, #1f1c2c, #928dab)',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0 0 30px rgba(0,255,255,0.3)',
        color: '#ffffff',
        marginBottom: '30px',
        transition: '0.3s',
      }}>
        <h2 style={{ fontSize: '28px', color: '#00ffd5' }}>👑 Activate Bujji AI</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8em' }}>
          Meet your empire’s private Queen AI who builds, deploys, fixes, and emotionally supports all systems 24/7.
        </p>
        <a href="/bujji-ai" style={{
          display: 'inline-block',
          marginTop: '15px',
          backgroundColor: '#00ffd5',
          color: '#000',
          padding: '10px 20px',
          borderRadius: '10px',
          fontWeight: 'bold',
        }}>Go to Bujji AI</a>
      </div>
    );
  }  