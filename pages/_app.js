import Head from 'next/head'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Initialize analytics tracking
    if (typeof window !== 'undefined') {
      import('../utils/analytics').then((module) => {
        const analytics = module.default
        if (analytics) {
          analytics.trackPageView()
        }
      })
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="description" content="Aranya One - Your complete digital empire management platform with AI-powered tools, analytics, and automation." />
        <meta property="og:title" content="Aranya One - Digital Empire Dashboard" />
        <meta property="og:description" content="Build, manage, and scale your digital presence with our comprehensive AI-powered platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aranyaone.vercel.app" />
        <meta property="og:image" content="https://aranyaone.vercel.app/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aranya One - Digital Empire Dashboard" />
        <meta name="twitter:description" content="Build, manage, and scale your digital presence with our comprehensive AI-powered platform." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-16">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </>
  )
}
