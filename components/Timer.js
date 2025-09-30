import { useState, useEffect, useRef } from 'react';

/**
 * Timer/Pomodoro component
 * Supports preset times and custom duration
 */
const Timer = ({ onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('pomodoro'); // pomodoro, short, long, custom
  const [customMinutes, setCustomMinutes] = useState(25);
  const [showSettings, setShowSettings] = useState(false);
  
  const intervalRef = useRef(null);

  const presets = {
    pomodoro: { label: 'Pomodoro', minutes: 25, emoji: '🍅' },
    short: { label: 'Short Break', minutes: 5, emoji: '☕' },
    long: { label: 'Long Break', minutes: 15, emoji: '🌴' },
    custom: { label: 'Custom', minutes: customMinutes, emoji: '⏱️' },
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (onTimerEnd) onTimerEnd();
            // Play notification sound
            if (typeof Audio !== 'undefined') {
              const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZRAYXZ7nt559NFAxPqePxt2McBjiP1/PMeS0FJHbH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjMGHm7A7+OYRAYXZrnt559NEAxPqePxt2McBjiP1/PMeS0FJHbH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjMGHm7A7+OYRAYXZrnt559NEAxPqePxt2McBjiP1/PMeS0FJHbH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjMGHm7A7+OYRAYXZrnt559NEAxPqePxt2McBjiP1/PMeS0FJHbH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjMGHm7A7+OYRAYXZrnt559NEAxPqePxt2McBjiP1/PMeS0FJHbH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjMGHm7A7+OYRAYXZrnt559NEAxPqePxt2McBjiP1/PMeS0FJHbH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjMGHm7A7+OYRAYXZrnt559NEAxPqePxt2McBjiP1/PMeS0FJHbH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjMGHm7A7+OYRAYXZrnt559NEAxPqePxt2McBjiP1/PMeS0FJHbH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjMGHm7A7+OYRAYXZrnt55');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft, onTimerEnd]);

  const startTimer = (mode) => {
    const minutes = mode === 'custom' ? customMinutes : presets[mode].minutes;
    setTimeLeft(minutes * 60);
    setTimerMode(mode);
    setIsRunning(true);
    setShowSettings(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    if (timeLeft > 0) setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = timeLeft > 0 ? (timeLeft / (presets[timerMode].minutes * 60)) * 100 : 0;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <div className="glass rounded-2xl p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-textPrimary flex items-center gap-2">
            <span>⏱️</span>
            <span>Focus Timer</span>
          </h3>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-textSecondary hover:text-primary transition-colors"
            aria-label="Timer settings"
          >
            ⚙️
          </button>
        </div>

        {/* Timer Display */}
        {timeLeft > 0 ? (
          <div className="text-center mb-6">
            <div className="text-6xl font-mono font-bold text-primary mb-2">
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm text-textSecondary">
              {presets[timerMode].emoji} {presets[timerMode].label}
            </p>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-panel rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center mb-6">
            <div className="text-6xl font-mono font-bold text-textSecondary mb-2">
              00:00
            </div>
            <p className="text-sm text-textSecondary">
              Select a timer preset below
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-2 justify-center mb-6">
          {timeLeft === 0 ? (
            <>
              {Object.entries(presets).map(([key, { label, emoji }]) => (
                <button
                  key={key}
                  onClick={() => startTimer(key)}
                  className="px-4 py-2 bg-panel hover:bg-primary hover:text-white text-textPrimary rounded-lg font-medium transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  title={label}
                >
                  {emoji}
                </button>
              ))}
            </>
          ) : (
            <>
              {isRunning ? (
                <button
                  onClick={pauseTimer}
                  className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  ⏸ Pause
                </button>
              ) : (
                <button
                  onClick={resumeTimer}
                  className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  ▶ Resume
                </button>
              )}
              <button
                onClick={resetTimer}
                className="px-6 py-3 bg-panel hover:bg-error hover:text-white text-textPrimary rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-error"
              >
                🔄 Reset
              </button>
            </>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="border-t border-primary/20 pt-4">
            <label className="block text-sm font-medium text-textSecondary mb-2">
              Custom Timer (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(Number(e.target.value))}
              className="w-full px-4 py-2 bg-panel text-textPrimary rounded-lg border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {/* Quick Info */}
        <div className="text-xs text-textSecondary text-center mt-4">
          {isRunning && 'Timer will auto-pause audio when finished'}
        </div>
      </div>
    </div>
  );
};

export default Timer;