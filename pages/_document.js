import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Optimized font loading with fallbacks */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap" 
            rel="stylesheet" 
          />
        </noscript>
        
        {/* Progressive Web App */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9333ea" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        
        {/* SEO and Performance */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Aranya One" />
        <meta name="keywords" content="AI, digital empire, dashboard, analytics, automation" />
        <link rel="canonical" href="https://aranyaone.vercel.app" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}