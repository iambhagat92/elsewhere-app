/**
 * Simple audio visualizer component
 * Shows animated bars when audio is playing
 */
const AudioVisualizer = ({ isPlaying }) => {
  if (!isPlaying) return null;

  return (
    <div className="flex items-end justify-center gap-1 h-12">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-2 bg-gradient-to-t from-primary to-secondary rounded-full animate-pulse"
          style={{
            height: '100%',
            animation: `pulse ${0.6 + i * 0.1}s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;