import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { ArrowRight, Globe, Bot, TrendingUp, Crown } from "lucide-react";

export default function Home() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-3xl font-bold text-pink-600">💖 Welcome to Bujji Chat Room 💬</h1>
      <p className="mt-4 text-gray-700">Deployment success! Your empire is live. 🚀</p>
      <p>🌍 Hello from Bujji AI – Auto Deployed</p>
    </main>
  );
}
