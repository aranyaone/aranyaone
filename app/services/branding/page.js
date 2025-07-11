export default function BrandingPage() {
  return (
    <main style={{
      padding: '60px',
      fontFamily: 'Arial',
      background: 'linear-gradient(to right, #2c3e50, #4ca1af)',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1 style={{
        fontSize: '36px',
        marginBottom: '20px',
        color: '#00ffd5',
        textShadow: '1px 1px 8px #00ffd5'
      }}>
        🎯 Branding, SEO & Strategy
      </h1>
      <p style={{ fontSize: '20px' }}>
        We help your empire grow in search engines, user minds, and global trust — with world-class branding, SEO and psychology.
      </p>
      <ul style={{ marginTop: '20px', fontSize: '18px', lineHeight: '2em' }}>
        <li>✅ Logo, Colors, Fonts, Theme Consistency</li>
        <li>✅ On-page SEO (Meta, Sitemap, Keywords)</li>
        <li>✅ Emotion-based UI/UX Flows</li>
        <li>✅ Human behavior study for engagement</li>
        <li>✅ Full brand story & business alignment</li>
      </ul>
    </main>
  );
}
