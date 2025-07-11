import './globals.css'; // ✅ Import the CSS file
import Navbar from '../components/Navbar'; // ✅ Adjusted to correct path

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
