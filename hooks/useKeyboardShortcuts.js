import { useEffect } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * Handles global keyboard events for the app
 */
export const useKeyboardShortcuts = ({
  onTogglePlay,
  onVolumeUp,
  onVolumeDown,
  onSelectLocation,
  isPlaying,
}) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        // Space bar - Play/Pause
        case ' ':
          e.preventDefault();
          onTogglePlay();
          break;

        // Arrow Up - Volume Up
        case 'ArrowUp':
          e.preventDefault();
          onVolumeUp();
          break;

        // Arrow Down - Volume Down
        case 'ArrowDown':
          e.preventDefault();
          onVolumeDown();
          break;

        // Numbers 1-5 - Select Cities
        case '1':
          onSelectLocation(0); // Tokyo
          break;
        case '2':
          onSelectLocation(1); // Paris
          break;
        case '3':
          onSelectLocation(2); // New York
          break;
        case '4':
          onSelectLocation(3); // Rio
          break;
        case '5':
          onSelectLocation(4); // Sydney
          break;

        // M - Mute/Unmute
        case 'm':
        case 'M':
          onVolumeDown(true); // Special flag for mute
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onTogglePlay, onVolumeUp, onVolumeDown, onSelectLocation, isPlaying]);
};