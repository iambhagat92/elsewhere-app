import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Custom Document for Next.js
 * Sets up HTML structure and base meta tags
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>ElseWhere - Free Ambient City Sounds for Focus, Study & Relaxation</title>
        <meta name="title" content="ElseWhere - Free Ambient City Sounds for Focus, Study & Relaxation" />
        <meta name="description" content="Transport yourself to 30 world cities with authentic ambient sounds. Free background noise for focus, study, work, and meditation. Tokyo, Paris, NYC & more!" />
        <meta name="keywords" content="ambient sounds, city sounds, background noise, study music, focus sounds, white noise, ADHD, productivity, free ambient sounds, concentration music, work from home sounds" />
        <meta name="author" content="ElseWhere" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://elsewhere-app.onrender.com" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elsewhere-app.onrender.com" />
        <meta property="og:title" content="ElseWhere - Free Ambient City Sounds" />
        <meta property="og:description" content="Experience authentic ambient sounds from 30 world cities. Perfect for focus, study, and relaxation. 100% free!" />
        <meta property="og:site_name" content="ElseWhere" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://elsewhere-app.onrender.com" />
        <meta property="twitter:title" content="ElseWhere - Free Ambient City Sounds" />
        <meta property="twitter:description" content="30 world cities, authentic ambient sounds, 100% free. Perfect for focus & productivity." />
        
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0F172A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ElseWhere",
              "description": "Free ambient city sounds for focus, study, and productivity. Experience 30 world cities.",
              "url": "https://elsewhere-app.onrender.com",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "1"
              }
            })
          }}
        />
      </Head>
      <body>
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}