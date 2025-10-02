import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for audio playback with proper error handling
 * Handles iOS Safari restrictions and smooth transitions
 */
export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.preload = 'auto';
    // Improve seamless looping
    audioRef.current.preservesPitch = false; // Better performance
    audioRef.current.mozPreservesPitch = false; // Firefox
    audioRef.current.webkitPreservesPitch = false; // Safari

    // Handle audio events
    const handleCanPlay = () => {
      setIsLoading(false);
      setError(null);
    };

    const handleError = (e) => {
      setIsLoading(false);
      setError('Unable to load audio. Please check your connection and try again.');
      setIsPlaying(false);
    };

    const handleEnded = () => {
      // Ensure seamless looping
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    };

    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('error', handleError);
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Fade in audio smoothly
  const fadeIn = useCallback((targetVolume) => {
    if (!audioRef.current) return;
    
    let currentVol = 0;
    audioRef.current.volume = 0;
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    
    fadeIntervalRef.current = setInterval(() => {
      currentVol += 0.05;
      if (currentVol >= targetVolume / 100) {
        currentVol = targetVolume / 100;
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.volume = currentVol;
      }
    }, 50);
  }, []);

  // Fade out audio smoothly
  const fadeOut = useCallback((callback) => {
    if (!audioRef.current) return;
    
    let currentVol = audioRef.current.volume;
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    
    fadeIntervalRef.current = setInterval(() => {
      currentVol -= 0.05;
      if (currentVol <= 0) {
        currentVol = 0;
        clearInterval(fadeIntervalRef.current);
        if (audioRef.current) {
          audioRef.current.pause();
        }
        if (callback) callback();
      }
      if (audioRef.current) {
        audioRef.current.volume = currentVol;
      }
    }, 50);
  }, []);

  // Play audio
  const play = useCallback(async () => {
    if (!audioRef.current || !currentLocation) {
      setError('Please select a location first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // iOS Safari requires user interaction
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        fadeIn(volume);
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      
      // Handle different error types
      if (err.name === 'NotAllowedError') {
        setError('Audio playback requires user interaction. Please tap the play button again.');
      } else if (err.name === 'NotSupportedError') {
        setError('Audio format not supported in this browser. Try Chrome or Firefox.');
      } else {
        setError('Unable to play audio. Please try again.');
      }
      
      setIsPlaying(false);
    }
  }, [currentLocation, volume, fadeIn]);

  // Pause audio
  const pause = useCallback(() => {
    if (!audioRef.current) return;
    
    fadeOut(() => {
      setIsPlaying(false);
    });
  }, [fadeOut]);

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
    setIsLoading(true);
    setError(null);
    
    const wasPlaying = isPlaying;
    
    // Stop current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Set new location and audio source
    setCurrentLocation(location);
    
    if (audioRef.current) {
      audioRef.current.src = location.audioUrl;
      audioRef.current.load();
    }
    
    setIsPlaying(false);
    
    // Auto-play if was playing before
    if (wasPlaying) {
      setTimeout(() => {
        play();
      }, 500);
    } else {
      setIsLoading(false);
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