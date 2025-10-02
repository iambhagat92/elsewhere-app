import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * ULTIMATE SEAMLESS LOOPING
 * Uses double-buffer crossfade technique
 * Zero gaps, perfect for ambient sounds
 */
export const useSeamlessLoop = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  // Two audio elements for crossfading
  const audio1Ref = useRef(null);
  const audio2Ref = useRef(null);
  const currentAudioRef = useRef(1); // Which audio is currently playing (1 or 2)
  const crossfadeDuration = 2; // seconds

  // Initialize dual audio elements
  useEffect(() => {
    audio1Ref.current = new Audio();
    audio2Ref.current = new Audio();
    
    // Configure both
    [audio1Ref.current, audio2Ref.current].forEach(audio => {
      audio.preload = 'auto';
      audio.volume = volume / 100;
    });

    return () => {
      if (audio1Ref.current) {
        audio1Ref.current.pause();
        audio1Ref.current = null;
      }
      if (audio2Ref.current) {
        audio2Ref.current.pause();
        audio2Ref.current = null;
      }
    };
  }, []);

  // Update volume for both
  useEffect(() => {
    if (audio1Ref.current) audio1Ref.current.volume = volume / 100;
    if (audio2Ref.current) audio2Ref.current.volume = volume / 100;
  }, [volume]);

  // Crossfade between two audio elements
  const crossfade = useCallback((fromAudio, toAudio) => {
    const steps = 40; // Number of volume steps
    const stepDuration = (crossfadeDuration * 1000) / steps;
    let currentStep = 0;
    const targetVolume = volume / 100;

    const fadeInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      // Fade out current audio
      if (fromAudio) {
        fromAudio.volume = targetVolume * (1 - progress);
      }

      // Fade in next audio
      if (toAudio) {
        toAudio.volume = targetVolume * progress;
      }

      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        if (fromAudio) {
          fromAudio.pause();
          fromAudio.currentTime = 0;
        }
      }
    }, stepDuration);
  }, [volume, crossfadeDuration]);

  // Setup seamless loop with crossfade
  const setupSeamlessLoop = useCallback((audio, audioUrl) => {
    if (!audio) return;

    audio.src = audioUrl;
    audio.load();

    // Calculate when to start crossfade (before audio ends)
    const handleTimeUpdate = () => {
      if (!audio.duration || !isPlaying) return;

      const timeRemaining = audio.duration - audio.currentTime;

      // Start crossfade before audio ends
      if (timeRemaining <= crossfadeDuration && timeRemaining > 0) {
        const nextAudio = currentAudioRef.current === 1 ? audio2Ref.current : audio1Ref.current;
        
        if (nextAudio && nextAudio.paused) {
          nextAudio.src = audioUrl;
          nextAudio.load();
          nextAudio.currentTime = 0;
          nextAudio.volume = 0;
          
          nextAudio.play().then(() => {
            crossfade(audio, nextAudio);
            currentAudioRef.current = currentAudioRef.current === 1 ? 2 : 1;
          }).catch(err => {
            console.error('Crossfade playback error:', err);
          });
        }
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isPlaying, crossfade, crossfadeDuration]);

  // Play with seamless looping
  const play = useCallback(async () => {
    if (!currentLocation) {
      setError('Please select a location first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const currentAudio = audio1Ref.current;
      currentAudio.src = currentLocation.audioUrl;
      currentAudio.load();
      currentAudio.volume = volume / 100;
      
      await currentAudio.play();
      
      setupSeamlessLoop(currentAudio, currentLocation.audioUrl);
      
      setIsPlaying(true);
      setIsLoading(false);
      currentAudioRef.current = 1;
    } catch (err) {
      setIsLoading(false);
      setError('Unable to play audio. Please try again.');
      setIsPlaying(false);
      console.error('Playback error:', err);
    }
  }, [currentLocation, volume, setupSeamlessLoop]);

  // Pause audio
  const pause = useCallback(() => {
    if (audio1Ref.current) audio1Ref.current.pause();
    if (audio2Ref.current) audio2Ref.current.pause();
    setIsPlaying(false);
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Change location
  const changeLocation = useCallback((location) => {
    const wasPlaying = isPlaying;
    
    // Stop both audio elements
    if (audio1Ref.current) {
      audio1Ref.current.pause();
      audio1Ref.current.currentTime = 0;
    }
    if (audio2Ref.current) {
      audio2Ref.current.pause();
      audio2Ref.current.currentTime = 0;
    }

    setCurrentLocation(location);
    setIsPlaying(false);

    if (wasPlaying) {
      setTimeout(() => play(), 100);
    }
  }, [isPlaying, play]);

  return {
    isPlaying,
    isLoading,
    error,
    volume,
    currentLocation,
    setVolume,
    play,
    pause,
    togglePlay,
    changeLocation,
  };
};
