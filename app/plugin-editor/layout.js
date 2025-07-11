export default function PluginEditorLayout({ children }) {
  return (
    <section style={{
      padding: '40px',
      background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h1 style={{
        fontSize: '36px',
        marginBottom: '20px',
        textAlign: 'center',
        textShadow: '0px 0px 10px #00ffdd'
      }}>
        🔧 Plugin Editor
      </h1>
      {children}
    </section>
  );
}
