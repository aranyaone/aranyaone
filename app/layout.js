import '../globals.css'; // ✅ Correct relative path for CSS
import Navbar from '../components/Navbar'; // ✅ Perfect path for component

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
