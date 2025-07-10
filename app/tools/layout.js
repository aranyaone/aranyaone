// app/tools/layout.js

export default function ToolsLayout({ children }) {
  return (
    <div style={{ padding: "20px", background: "#f5f5f5" }}>
      <h2>Welcome to Aranya Tools 🛠️</h2>
      <div>{children}</div>
    </div>
  );
}
