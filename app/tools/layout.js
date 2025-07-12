import '../globals.css'; // ✅ correct path
import Navbar from '../components/Navbar'; // ✅ if you have this

export default function ToolsLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
