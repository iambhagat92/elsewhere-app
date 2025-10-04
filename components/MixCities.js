import { useState, useEffect, useRef } from 'react';
import { locations } from '../data/locations';

/**
 * MixCities - Advanced feature to mix multiple city ambient sounds
 * Each city has independent volume control and can be toggled on/off
 */
export default function MixCities({ isOpen, onClose, onMixChange }) {
  const [activeMixes, setActiveMixes] = useState({});
  const audioRefs = useRef({});
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audio elements for each location
  useEffect(() => {
    locations.forEach(location => {
      if (!audioRefs.current[location.id]) {
        const audio = new Audio(location.audioSrc);
        audio.loop = true;
        audio.volume = 0;
        audioRefs.current[location.id] = audio;
      }
    });

    return () => {
      // Cleanup: pause and remove all audio elements
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      audioRefs.current = {};
    };
  }, []);

  // Toggle a city in the mix
  const toggleCity = (locationId) => {
    setActiveMixes(prev => {
      const newMixes = { ...prev };
      if (newMixes[locationId]) {
        // Remove from mix
        delete newMixes[locationId];
        if (audioRefs.current[locationId]) {
          audioRefs.current[locationId].pause();
          audioRefs.current[locationId].volume = 0;
        }
      } else {
        // Add to mix with default volume 50%
        newMixes[locationId] = 50;
        if (audioRefs.current[locationId] && isPlaying) {
          audioRefs.current[locationId].volume = 0.5;
          audioRefs.current[locationId].play().catch(e => console.log('Play error:', e));
        }
      }
      return newMixes;
    });
  };

  // Update volume for a specific city
  const updateVolume = (locationId, volume) => {
    setActiveMixes(prev => ({
      ...prev,
      [locationId]: volume
    }));
    
    if (audioRefs.current[locationId]) {
      audioRefs.current[locationId].volume = volume / 100;
    }
  };

  // Play/pause all active mixes
  const togglePlayAll = () => {
    setIsPlaying(prev => {
      const newIsPlaying = !prev;
      
      Object.keys(activeMixes).forEach(locationId => {
        const audio = audioRefs.current[locationId];
        if (audio) {
          if (newIsPlaying) {
            audio.volume = activeMixes[locationId] / 100;
            audio.play().catch(e => console.log('Play error:', e));
          } else {
            audio.pause();
          }
        }
      });
      
      return newIsPlaying;
    });
  };

  // Clear all mixes
  const clearAll = () => {
    Object.keys(activeMixes).forEach(locationId => {
      if (audioRefs.current[locationId]) {
        audioRefs.current[locationId].pause();
        audioRefs.current[locationId].volume = 0;
      }
    });
    setActiveMixes({});
    setIsPlaying(false);
  };

  if (!isOpen) return null;

  const activeMixCount = Object.keys(activeMixes).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-panel dark:bg-panel-dark rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-textPrimary dark:text-textPrimary-dark">
              🎛️ Mix Cities
            </h2>
            <p className="text-sm text-textSecondary dark:text-textSecondary-dark mt-1">
              Layer multiple city sounds together
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close mix panel"
          >
            <svg className="w-6 h-6 text-textPrimary dark:text-textPrimary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={togglePlayAll}
            disabled={activeMixCount === 0}
            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isPlaying ? '⏸️ Pause All' : '▶️ Play All'}
          </button>
          
          <button
            onClick={clearAll}
            disabled={activeMixCount === 0}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Clear All
          </button>

          <div className="ml-auto text-sm text-textSecondary dark:text-textSecondary-dark">
            <span className="font-semibold">{activeMixCount}</span> {activeMixCount === 1 ? 'city' : 'cities'} active
          </div>
        </div>

        {/* City List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map(location => {
              const isActive = activeMixes[location.id] !== undefined;
              const volume = activeMixes[location.id] || 50;

              return (
                <div
                  key={location.id}
                  className={`glass rounded-xl p-4 transition-all duration-300 ${
                    isActive 
                      ? 'border-2 border-primary shadow-lg' 
                      : 'border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {/* City Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{location.flag}</span>
                      <div>
                        <h3 className="font-bold text-textPrimary dark:text-textPrimary-dark">
                          {location.name}
                        </h3>
                        <p className="text-xs text-textSecondary dark:text-textSecondary-dark">
                          {location.country}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleCity(location.id)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        isActive
                          ? 'bg-primary text-white hover:bg-blue-600'
                          : 'bg-gray-200 dark:bg-gray-700 text-textPrimary dark:text-textPrimary-dark hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {isActive ? '✓ On' : '+ Add'}
                    </button>
                  </div>

                  {/* Volume Slider (only show if active) */}
                  {isActive && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-textSecondary dark:text-textSecondary-dark" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                        </svg>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => updateVolume(location.id, parseInt(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer 
                                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                                   [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                                   [&::-webkit-slider-thumb]:bg-primary hover:[&::-webkit-slider-thumb]:bg-blue-600"
                        />
                        <span className="text-sm font-semibold text-textPrimary dark:text-textPrimary-dark w-10 text-right">
                          {volume}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Tip */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-textSecondary dark:text-textSecondary-dark">
            💡 <strong>Pro Tip:</strong> Mix Tokyo&apos;s bustling streets with Paris café sounds for a unique work ambiance
          </p>
        </div>
      </div>
    </div>
  );
}