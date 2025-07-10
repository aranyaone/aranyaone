export const metadata = {
  title: "AranyaOne – The AI Empire",
  description: "The World's First AI-Powered Business Empire by Srinivas Makam",
  openGraph: {
    title: "Welcome to AranyaOne.com 👑",
    description: "Join the world's first AI-Powered Business Empire, built by Srinivas Makam.",
    url: "https://www.aranyaone.com",
    siteName: "Aranya One",
    images: [
      {
        url: "https://aranyaone.vercel.app/aranya-logo.png", // update if needed
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
