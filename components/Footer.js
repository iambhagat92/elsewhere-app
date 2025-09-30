import Link from 'next/link';

/**
 * Footer component with legal links, contact, and social media
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-panel">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About section */}
          <div>
            <h3 className="text-lg font-bold text-textPrimary dark:text-textPrimary-dark mb-3">
              ElseWhere
            </h3>
            <p className="text-sm text-textSecondary dark:text-textSecondary-dark leading-relaxed">
              Transport yourself to cities around the world with authentic ambient sounds. 
              Perfect for focus, study, and relaxation.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold text-textPrimary dark:text-textPrimary-dark mb-3">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy-policy"
                  className="text-sm text-textSecondary dark:text-textSecondary-dark hover:text-primary transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms-of-service"
                  className="text-sm text-textSecondary dark:text-textSecondary-dark hover:text-primary transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/disclaimer"
                  className="text-sm text-textSecondary dark:text-textSecondary-dark hover:text-primary transition-colors duration-200"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <a 
                  href="/AUDIO_CREDITS.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-textSecondary dark:text-textSecondary-dark hover:text-primary transition-colors duration-200"
                >
                  🎵 Audio Credits
                </a>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h3 className="text-lg font-bold text-textPrimary dark:text-textPrimary-dark mb-3">
              Contact
            </h3>
            <p className="text-sm text-textSecondary dark:text-textSecondary-dark mb-2">
              Have questions or feedback?
            </p>
            <a 
              href="mailto:bhagatpaaji@gmail.com"
              className="text-sm text-primary hover:text-blue-400 transition-colors duration-200"
            >
              bhagatpaaji@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-panel">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-textSecondary dark:text-textSecondary-dark text-center md:text-left">
              © {currentYear} ElseWhere. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-xs text-textSecondary dark:text-textSecondary-dark">
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span>for focus and productivity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;