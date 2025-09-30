import AudioVisualizer from './AudioVisualizer';

/**
 * Audio controls component with play/pause button and volume slider
 * Fully accessible with ARIA labels and keyboard navigation
 */
const AudioControls = ({
  isPlaying, 
  isLoading, 
  volume, 
  onTogglePlay, 
  onVolumeChange,
  disabled 
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="glass rounded-2xl p-8 shadow-2xl">
        {/* Play/Pause Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={onTogglePlay}
            disabled={disabled || isLoading}
            aria-label={isPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
            className={`
              w-20 h-20 md:w-24 md:h-24
              rounded-full
              flex items-center justify-center
              text-3xl md:text-4xl
              transition-all duration-300
              ${disabled || isLoading
                ? 'bg-panel text-textSecondary cursor-not-allowed'
                : 'bg-primary hover:bg-blue-600 text-white hover:scale-110 active:scale-95 shadow-lg hover:shadow-primary/50'
              }
              focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
            `}
          >
            {isLoading ? (
              <div className="animate-spin">⏳</div>
            ) : isPlaying ? (
              '⏸'
            ) : (
              '▶'
            )}
          </button>
        </div>

        {/* Audio Visualizer */}
        <div className="flex justify-center mb-4">
          <AudioVisualizer isPlaying={isPlaying && !isLoading} />
        </div>

        {/* Status Text */}
        <div className="text-center mb-6">
          <p className="text-lg text-textSecondary">
            {isLoading ? 'Loading...' : isPlaying ? 'Now Playing' : 'Paused'}
          </p>
        </div>

        {/* Volume Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label 
              htmlFor="volume-slider" 
              className="text-sm font-medium text-textSecondary"
            >
              Volume
            </label>
            <span className="text-sm font-mono font-bold text-primary">
              {volume}%
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Mute icon */}
            <span className="text-xl" aria-hidden="true">
              🔇
            </span>
            
            {/* Volume slider */}
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              disabled={disabled}
              aria-label="Volume control"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={volume}
              className={`
                flex-1 h-2 rounded-lg appearance-none cursor-pointer
                bg-panel
                focus:outline-none focus:ring-2 focus:ring-primary
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${volume}%, #1E293B ${volume}%, #1E293B 100%)`
              }}
            />
            
            {/* Max volume icon */}
            <span className="text-xl" aria-hidden="true">
              🔊
            </span>
          </div>

          {/* Volume preset buttons */}
          <div className="flex gap-2 justify-center pt-2">
            {[25, 50, 75, 100].map((preset) => (
              <button
                key={preset}
                onClick={() => onVolumeChange(preset)}
                disabled={disabled}
                aria-label={`Set volume to ${preset}%`}
                className={`
                  px-3 py-1 rounded-lg text-xs font-medium
                  transition-colors duration-200
                  ${volume === preset
                    ? 'bg-primary text-white'
                    : 'bg-panel text-textSecondary hover:bg-panel/80 hover:text-textPrimary'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  focus:outline-none focus:ring-2 focus:ring-primary
                `}
              >
                {preset}%
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioControls;