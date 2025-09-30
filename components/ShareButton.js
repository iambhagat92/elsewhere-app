import { useState } from 'react';

/**
 * Share button component for social media sharing
 * Includes Twitter, Facebook, and copy link functionality
 */
const ShareButton = ({ currentLocation }) => {
  const [showToast, setShowToast] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const shareUrl = 'https://elsewhere-app.vercel.app/';
  const shareText = currentLocation
    ? `🌍 Listening to ambient sounds from ${currentLocation.name}! Try ElseWhere`
    : '🌍 Transport yourself to cities around the world with ElseWhere';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setShowToast(true);
    setShowMenu(false);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  return (
    <div className="relative">
      {/* Share Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Share ElseWhere"
        className="px-4 py-2 bg-panel hover:bg-primary hover:text-white text-textPrimary rounded-lg font-medium transition-all duration-200 flex items-center gap-2 border border-primary/30 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span>📤</span>
        <span>Share</span>
      </button>

      {/* Share Menu */}
      {showMenu && (
        <div className="absolute top-full right-0 mt-2 w-48 glass rounded-lg shadow-xl border border-primary/20 overflow-hidden z-50">
          <button
            onClick={handleTwitterShare}
            className="w-full px-4 py-3 text-left hover:bg-primary/20 transition-colors duration-200 flex items-center gap-3 text-textPrimary"
          >
            <span>🐦</span>
            <span>Share on Twitter</span>
          </button>
          
          <button
            onClick={handleFacebookShare}
            className="w-full px-4 py-3 text-left hover:bg-primary/20 transition-colors duration-200 flex items-center gap-3 text-textPrimary"
          >
            <span>📘</span>
            <span>Share on Facebook</span>
          </button>
          
          <button
            onClick={handleLinkedInShare}
            className="w-full px-4 py-3 text-left hover:bg-primary/20 transition-colors duration-200 flex items-center gap-3 text-textPrimary"
          >
            <span>💼</span>
            <span>Share on LinkedIn</span>
          </button>
          
          <div className="border-t border-primary/20"></div>
          
          <button
            onClick={handleCopyLink}
            className="w-full px-4 py-3 text-left hover:bg-primary/20 transition-colors duration-200 flex items-center gap-3 text-textPrimary"
          >
            <span>🔗</span>
            <span>Copy Link</span>
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 glass rounded-lg px-6 py-3 shadow-xl border border-success z-50 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-success">✓</span>
            <span className="text-textPrimary">Link copied to clipboard!</span>
          </div>
        </div>
      )}

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default ShareButton;