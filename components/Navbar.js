import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-primary via-accent to-primary text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg hover:text-accent transition">
          Bujji 💖 Chat
        </Link>

        {/* Menu Links */}
        <div className="flex gap-6 text-base">
          <Link href="/" className="hover:underline hover:text-accent transition">
            Home
          </Link>
          <Link href="/founder" className="hover:underline hover:text-accent transition">
            Founder
          </Link>
        </div>
      </div>
    </nav>
  );
} 