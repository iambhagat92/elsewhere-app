import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Custom Document for Next.js
 * Sets up HTML structure and base meta tags
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0F172A" />
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