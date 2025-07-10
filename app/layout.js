import Navbar from '../components/Navbar';
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body style={{ fontFamily: "sans-serif", margin: 6, padding: 6 }}>
  <Navbar />
  {children}
</body>
    </html>
  );
}
