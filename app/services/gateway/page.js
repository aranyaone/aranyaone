export default function GatewayPage() {
  return (
    <main style={{
      padding: '60px',
      fontFamily: 'Arial',
      background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1 style={{
        fontSize: '36px',
        marginBottom: '20px',
        color: '#00ffd5',
        textShadow: '1px 1px 8px #00ffd5'
      }}>
        💳 Global Payment Gateway Setup
      </h1>
      <p style={{ fontSize: '20px' }}>
        We set up secure, high-speed payment gateways for UPI, Razorpay, PayPal, Stripe, and global currency acceptance.
      </p>
      <ul style={{ marginTop: '20px', fontSize: '18px', lineHeight: '2em' }}>
        <li>✅ UPI, Credit/Debit Card, Netbanking</li>
        <li>✅ Razorpay, Cashfree, PayPal, Stripe</li>
        <li>✅ International payment routing & tax logic</li>
        <li>✅ Gateway dashboard + payout system</li>
        <li>✅ Auto-fallback if one mode fails</li>
      </ul>
    </main>
  );
}
