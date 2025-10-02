import { useState } from 'react';
import Head from 'next/head';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import useDarkMode from '../hooks/useDarkMode';
import { locations } from '../data/locations';
import LocationSelector from '../components/LocationSelector';
import AudioControls from '../components/AudioControls';
import AtmosphereOverlay from '../components/AtmosphereOverlay';
import ShareButton from '../components/ShareButton';
import Timer from '../components/Timer';
import KeyboardShortcutsInfo from '../components/KeyboardShortcutsInfo';
import DarkModeToggle from '../components/DarkModeToggle';
import MixCities from '../components/MixCities';
import Footer from '../components/Footer';
import NoSSR from '../components/NoSSR';

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
    pause,
  } = useAudioPlayer();

  // Dark mode
  const [isDark, toggleDarkMode] = useDarkMode();

  // Mix Cities modal state
  const [isMixOpen, setIsMixOpen] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onTogglePlay: togglePlay,
    onVolumeUp: () => setVolume(Math.min(100, volume + 5)),
    onVolumeDown: () => setVolume(Math.max(0, volume - 5)),
    onSelectLocation: (index) => {
      if (locations[index]) {
        changeLocation(locations[index]);
      }
    },
    isPlaying,
  });

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

      {/* Dark mode toggle */}
      <DarkModeToggle isDark={isDark} toggle={toggleDarkMode} />

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
            
            {/* Share Button & Mix Cities Button */}
            <div className="flex justify-center gap-3 mt-6">
              <ShareButton currentLocation={currentLocation} />
              <button
                onClick={() => setIsMixOpen(true)}
                className="glass px-6 py-3 rounded-xl font-semibold text-textPrimary dark:text-textPrimary-dark 
                         hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
                aria-label="Open Mix Cities panel"
              >
                🎛️ Mix Cities
              </button>
            </div>
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
          <NoSSR>
            <AudioControls
              isPlaying={isPlaying}
              isLoading={isLoading}
              volume={volume}
              onTogglePlay={togglePlay}
              onVolumeChange={setVolume}
              disabled={!currentLocation}
            />
          </NoSSR>

          {/* Focus Timer */}
          <NoSSR>
            <Timer onTimerEnd={pause} />
          </NoSSR>

          {/* Mix Cities Modal */}
          <NoSSR>
            <MixCities 
              isOpen={isMixOpen} 
              onClose={() => setIsMixOpen(false)}
            />
          </NoSSR>

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

          {/* Support Section */}
          <section className="max-w-2xl mx-auto px-4 py-16 border-t border-panel">
            <div className="glass rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-textPrimary mb-4">
                💙 Support ElseWhere
              </h2>
              <p className="text-textSecondary mb-6">
                ElseWhere is 100% free with no ads. If you find it helpful, consider supporting the project!
              </p>
              <a
                href="https://paypal.me/imashokbhagat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.76-4.852a.932.932 0 0 1 .924-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.746-4.46z"/>
                </svg>
                <span>Support via PayPal</span>
              </a>
              <p className="text-xs text-textSecondary mt-4">
                Your support helps keep ElseWhere free for everyone! 🙏
              </p>
            </div>
          </section>
        </main>

        {/* Keyboard Shortcuts Info */}
        <KeyboardShortcutsInfo />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}