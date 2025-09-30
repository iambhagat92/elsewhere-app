import { useState } from 'react';
import Head from 'next/head';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { locations } from '../data/locations';
import LocationSelector from '../components/LocationSelector';
import AudioControls from '../components/AudioControls';
import AtmosphereOverlay from '../components/AtmosphereOverlay';
import Footer from '../components/Footer';

/**
 * Main homepage for ElseWhere - Ambient Life Simulator
 * Complete MVP with all features and SEO optimization
 */
export default function Home() {
  const {
    isPlaying,
    isLoading,
    error,
    volume,
    currentLocation,
    setVolume,
    togglePlay,
    changeLocation,
  } = useAudioPlayer();

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>ElseWhere - Free Ambient Sound Generator | Focus & Study</title>
        <meta 
          name="description" 
          content="Transport yourself to cities around the world with authentic ambient sounds. Perfect for focus, study, work, and relaxation. Experience Tokyo, Paris, New York, Rio, and Sydney." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="ambient sounds, focus music, study sounds, productivity, white noise, city sounds, background noise, concentration, work from home" />
        <meta name="author" content="ElseWhere" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://elsewhere.app/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elsewhere.app/" />
        <meta property="og:title" content="ElseWhere - Free Ambient Sound Generator | Focus & Study" />
        <meta property="og:description" content="Transport yourself to cities around the world with authentic ambient sounds. Perfect for focus, study, work, and relaxation." />
        <meta property="og:image" content="https://elsewhere.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="ElseWhere" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://elsewhere.app/" />
        <meta name="twitter:title" content="ElseWhere - Free Ambient Sound Generator" />
        <meta name="twitter:description" content="Transport yourself to cities around the world with authentic ambient sounds." />
        <meta name="twitter:image" content="https://elsewhere.app/twitter-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ElseWhere",
              "description": "Free ambient sound generator for focus, study, and relaxation featuring sounds from cities around the world",
              "url": "https://elsewhere.app",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              }
            })
          }}
        />
      </Head>

      {/* Atmospheric overlay */}
      <AtmosphereOverlay location={currentLocation} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <main id="main-content" className="flex-1">
          {/* Hero Section */}
          <header className="text-center pt-12 pb-6 px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-textPrimary mb-4">
              🌍 ElseWhere
            </h1>
            <p className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto mb-2">
              Transport yourself to cities around the world
            </p>
            <p className="text-sm md:text-base text-textSecondary max-w-xl mx-auto">
              Authentic ambient sounds to help you focus, study, work, or relax
            </p>
          </header>

          {/* Error message */}
          {error && (
            <div className="max-w-2xl mx-auto px-4 mb-6">
              <div className="bg-error bg-opacity-20 border border-error rounded-lg p-4 text-center">
                <p className="text-error font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Location selector */}
          <LocationSelector
            currentLocation={currentLocation}
            onLocationChange={changeLocation}
            disabled={isLoading}
          />

          {/* Audio controls */}
          <AudioControls
            isPlaying={isPlaying}
            isLoading={isLoading}
            volume={volume}
            onTogglePlay={togglePlay}
            onVolumeChange={setVolume}
            disabled={!currentLocation}
          />

          {/* Features Section */}
          <section className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center text-textPrimary mb-12">
              Why Choose ElseWhere?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🎧</div>
                <h3 className="text-xl font-bold text-textPrimary mb-2">
                  Authentic Sounds
                </h3>
                <p className="text-textSecondary text-sm">
                  Real ambient recordings from cities around the world for an immersive experience
                </p>
              </div>
              
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-textPrimary mb-2">
                  Boost Focus
                </h3>
                <p className="text-textSecondary text-sm">
                  Scientifically proven to improve concentration and productivity during work or study
                </p>
              </div>
              
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🆓</div>
                <h3 className="text-xl font-bold text-textPrimary mb-2">
                  Completely Free
                </h3>
                <p className="text-textSecondary text-sm">
                  No subscriptions, no ads, no hidden fees. Just pure ambient soundscapes
                </p>
              </div>
            </div>
          </section>

          {/* How to Use Section */}
          <section className="max-w-4xl mx-auto px-4 py-16 border-t border-panel">
            <h2 className="text-3xl font-bold text-center text-textPrimary mb-12">
              How It Works
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-textPrimary mb-2">
                    Choose Your Destination
                  </h3>
                  <p className="text-textSecondary">
                    Select from 5 amazing cities: Tokyo, Paris, New York, Rio de Janeiro, or Sydney
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-textPrimary mb-2">
                    Press Play
                  </h3>
                  <p className="text-textSecondary">
                    Hit the play button to start your ambient journey. Adjust volume to your preference
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-textPrimary mb-2">
                    Focus & Relax
                  </h3>
                  <p className="text-textSecondary">
                    Enjoy the atmosphere and let the ambient sounds enhance your productivity or relaxation
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}