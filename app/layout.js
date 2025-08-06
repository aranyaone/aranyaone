import './globals.css';
// Sentry error reporting
import * as Sentry from '@sentry/browser';
Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0', // Replace with your actual Sentry DSN
  tracesSampleRate: 1.0,
});
import GlobalClientLayout from './components/GlobalClientLayout';
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
  // ...existing code...
  // FeedbackWidget for each main service
  const FeedbackWidget = require('../components/FeedbackWidget').default;
  const services = [
    'AI Chat',
    'Payments',
    'Analytics',
    'Support',
    'Subscriptions',
    'Wallet',
    'Cybersecurity',
    'Global Trend Analyzer',
    'King Wallet',
    'Self-Learning AI',
    'Website Animations',
    'Withdrawals',
    'Founder',
    'Premium',
    'Trials',
    'Refunds',
    'Contact',
    'Blog',
    'About',
    'Admin',
  ];
  return (
    <html lang="en">
      <head>
        {/* ...existing code... */}
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 antialiased`}>
        {/* ...existing code... */}
        <GlobalClientLayout>
          <main id="main-content" className="min-h-screen" tabIndex="-1" role="main">
            {children}
            {/* Automated Feedback Widgets for each service */}
            <section className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <div key={service} className="border rounded p-4 bg-white shadow">
                  <h2 className="font-bold text-lg mb-2">{service} Feedback</h2>
                  <FeedbackWidget service={service} />
                </div>
              ))}
            </section>
          </main>
        </GlobalClientLayout>
        {/* ...existing code... */}
      </body>
    </html>
  );
}
