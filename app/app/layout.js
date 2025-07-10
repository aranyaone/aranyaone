export const metadata = {
  title: "AranyaOne – The AI Empire",
  description: "The World's First AI-Powered Business Empire by Srinivas Makam",
};

import { Geist, Geist_Mono } from 'next/font/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        {/* 🌐 Navbar */}
        <nav style={{ padding: "1rem", background: "#111", color: "#fff", textAlign: "center" }}>
          <a href="/" style={{ margin: "0 1rem", color: "#fff" }}>🏠 Home</a>
          <a href="/founder" style={{ margin: "0 1rem", color: "#fff" }}>👑 Founder</a>
          <a href="/services" style={{ margin: "0 1rem", color: "#fff" }}>🛠️ Services</a>
          <a href="/tools" style={{ margin: "0 1rem", color: "#fff" }}>🧰 Tools</a>
          <a href="/pricing" style={{ margin: "0 1rem", color: "#fff" }}>💰 Pricing</a>
          <a href="/admin" style={{ margin: "0 1rem", color: "#fff" }}>🛡️ Admin</a>
        </nav>

        {children}
<body
  className={`${geistSans.variable} ${geistMono.variable}`}
  style={{
    margin: 0,
    padding: 0,
    background: "linear-gradient(to bottom right, #FFECD2, #FCB69F)", // 🍑 Juicy Peach Gradient
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  }}
>
  {children}
</body>
        {/* 🔗 Footer */}
        <footer style={{ padding: "1rem", background: "#f0f0f0", textAlign: "center", marginTop: "2rem" }}>
          <p>© 2025 AranyaOne | Built by King Srinivas Makam 👑</p>
          <p>
            <a href="https://youtube.com" target="_blank">📺 YouTube</a> |{" "}
            <a href="https://instagram.com" target="_blank">📸 Instagram</a> |{" "}
            <a href="https://wa.me/918500839448" target="_blank">💬 WhatsApp</a>
          </p>
        </footer>

      </body>
    </html>
  );
          }
