import Head from 'next/head';

export default function SEOHead({
  title = "Aranya One - Digital Empire Dashboard",
  description = "Your complete digital empire management platform. Manage analytics, services, and grow your business with powerful tools and insights.",
  ogImage = "/assets/logo.svg",
  url = "https://aranyaone.vercel.app",
  keywords = "digital empire, dashboard, analytics, business management, services, growth tools",
  author = "Aranya One",
  type = "website"
}) {
  const fullTitle = title.includes('Aranya One') ? title : `${title} | Aranya One`;
  const fullUrl = url.startsWith('http') ? url : `https://aranyaone.vercel.app${url}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `https://aranyaone.vercel.app${ogImage}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#7928e3" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="alternate icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/assets/logo.svg" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Aranya One" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullOgImage} />
      <meta property="twitter:creator" content="@aranyaone" />
      <meta property="twitter:site" content="@aranyaone" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Aranya One",
            "url": "https://aranyaone.vercel.app",
            "logo": "https://aranyaone.vercel.app/assets/logo.svg",
            "description": description,
            "foundingDate": "2025",
            "sameAs": [
              "https://twitter.com/aranyaone",
              "https://linkedin.com/company/aranyaone"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "support@aranyaone.com"
            }
          })
        }}
      />
    </Head>
  );
}