export const metadata = {
  title: "AranyaOne.com | World's First AI-Powered Empire",
  description: "Built by Srinivas Makam – Fully Automated | Multi-Sector | AI Business Control",
  openGraph: {
    title: "Welcome to AranyaOne.com 👑",
    description: "Join the world's first AI-Powered Business Empire, built by Srinivas Makam.",
    url: "https://www.aranyaone.com",
    siteName: "Aranya One",
    images: [
      {
        url: "https://aranyaone.vercel.app/aranya-logo.png", // if you uploaded logo manually, use that path
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

import { Geist, Geist_Mono } from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}
export const metadata = {
  title: 'AranyaOne - The AI Empire',
  description: 'The World’s First AI-Powered Business Empire by Srinivas Makam',
  other: {
    'msvalidate.01': 'F2AD1B41FC883B077051C56AC2ABB90B', // 👈 Paste it here
  }
}
