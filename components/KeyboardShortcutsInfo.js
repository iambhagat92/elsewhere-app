import { useState } from 'react';

/**
 * Keyboard shortcuts info component
 * Shows available shortcuts to users
 */
const KeyboardShortcutsInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: 'Space', action: 'Play / Pause' },
    { key: '↑', action: 'Volume Up' },
    { key: '↓', action: 'Volume Down' },
    { key: '1-5', action: 'Select City' },
    { key: 'M', action: 'Mute' },
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 w-12 h-12 bg-panel hover:bg-primary text-textPrimary hover:text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 z-50 border border-primary/30 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Keyboard shortcuts"
        title="Keyboard shortcuts"
      >
        <span className="text-xl">⌨️</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
            <div className="glass rounded-2xl p-6 shadow-2xl border border-primary/20 mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-textPrimary flex items-center gap-2">
                  <span>⌨️</span>
                  <span>Keyboard Shortcuts</span>
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-textSecondary hover:text-primary transition-colors text-2xl"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map(({ key, action }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-3 px-4 bg-panel/50 rounded-lg"
                  >
                    <span className="text-textSecondary">{action}</span>
                    <kbd className="px-3 py-1 bg-primary text-white rounded font-mono text-sm font-medium">
                      {key}
                    </kbd>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-primary/20">
                <p className="text-xs text-textSecondary text-center">
                  Tip: Use keyboard shortcuts for faster control! 🚀
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default KeyboardShortcutsInfo;