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
      <head>
        {/* ✅ Bing Verification Meta Tag */}
        <meta name="msvalidate.01" content="F2AD1B41FC838077051C56AC2ABB90B8" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
