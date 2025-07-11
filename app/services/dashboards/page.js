export default function DashboardsPage() {
  return (
    <main style={{
      padding: '60px',
      fontFamily: 'Arial',
      background: 'linear-gradient(to right, #1e130c, #9a8478)',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1 style={{
        fontSize: '36px',
        marginBottom: '20px',
        color: '#00ffd5',
        textShadow: '1px 1px 8px #00ffd5'
      }}>
        📊 Business Dashboards & Automation
      </h1>
      <p style={{ fontSize: '20px' }}>
        We help you visualize your empire through real-time dashboards, AI analytics, and automation control systems.
      </p>
      <ul style={{ marginTop: '20px', fontSize: '18px', lineHeight: '2em' }}>
        <li>✅ Royal Earnings Dashboard</li>
        <li>✅ Plugin Reports, User Logs, Traffic Insights</li>
        <li>✅ Withdrawal & Payout Metrics</li>
        <li>✅ Control panels for all sectors</li>
        <li>✅ Integrated with Brain Room AI</li>
      </ul>
    </main>
  );
}
