// File: app/dashboard/page.js
"use client";

export default function DashboardPage() {
  return (
    <div style={{
      background: "linear-gradient(to right, #1f4037, #99f2c8)",
      minHeight: "100vh",
      padding: "50px",
      color: "#fff",
    }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>📊 Aranya Dashboard</h1>
      <p style={{ fontSize: "1.5rem", marginTop: "20px" }}>
        Welcome to your empire's control room. Monitor everything here.
      </p>
    </div>
  );
}
