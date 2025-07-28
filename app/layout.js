import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuantumPerformanceMonitor from '@/components/QuantumPerformanceMonitor';
import { CurrencyProvider } from './context/CurrencyContext';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bujji Chat - World\'s Most Emotionally Intelligent AI',
  description: 'Advanced AI chat platform with emotional intelligence, built for visionaries, dreamers, and empire builders. Experience the future of human-AI interaction.',
  keywords: 'AI chat, emotional intelligence, Bujji Chat, King Srinivas, AI assistant, chatbot, emotional AI, business AI, empire building, AI tools',
  authors: [{ name: 'King Srinivas' }],
  creator: 'King Srinivas',
  publisher: 'Bujji Chat',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bujjichat.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bujji Chat - World\'s Most Emotionally Intelligent AI',
    description: 'Advanced AI chat platform with emotional intelligence, built for visionaries, dreamers, and empire builders.',
    url: 'https://bujjichat.com',
    siteName: 'Bujji Chat',
    images: [
      {
        url: '/bujji-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Bujji Chat - Emotional AI Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bujji Chat - World\'s Most Emotionally Intelligent AI',
    description: 'Advanced AI chat platform with emotional intelligence, built for visionaries, dreamers, and empire builders.',
    images: ['/bujji-logo.svg'],
    creator: '@bujjichat',
    site: '@bujjichat',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7C3AED" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Bujji Chat" />
        <meta name="application-name" content="Bujji Chat" />
        <meta name="msapplication-TileColor" content="#7C3AED" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.openai.com" />
        <link rel="preconnect" href="https://api.stripe.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Bujji Chat",
              "description": "World's most emotionally intelligent AI chat platform",
              "url": "https://bujjichat.com",
              "applicationCategory": "CommunicationApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              },
              "author": {
                "@type": "Person",
                "name": "King Srinivas",
                "jobTitle": "Founder & CEO",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Bujji Chat"
                }
              },
              "creator": {
                "@type": "Organization",
                "name": "Bujji Chat",
                "founder": {
                  "@type": "Person",
                  "name": "King Srinivas"
                }
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 antialiased`}>
        <CurrencyProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <QuantumPerformanceMonitor />
        </CurrencyProvider>
        
        {/* Analytics Scripts */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </body>
    </html>
  );
}
