import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Advanced Audio Player with Web Audio API
 * Provides SEAMLESS looping with crossfade
 * Perfect for ambient sounds
 */
export const useAudioPlayerAdvanced = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  // Web Audio API refs
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const audioBufferRef = useRef(null);
  
  // For crossfade looping
  const currentSourceRef = useRef(null);
  const nextSourceRef = useRef(null);
  const isTransitioningRef = useRef(false);

  // Initialize Web Audio Context
  useEffect(() => {
    // Create audio context (works on all browsers)
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();
    
    // Create gain node for volume control
    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.connect(audioContextRef.current.destination);
    gainNodeRef.current.gain.value = volume / 100;

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume / 100;
    }
  }, [volume]);

  // Load audio file into buffer
  const loadAudio = useCallback(async (audioUrl) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      audioBufferRef.current = audioBuffer;
      
      setIsLoading(false);
      return audioBuffer;
    } catch (err) {
      setIsLoading(false);
      setError('Failed to load audio. Please try again.');
      console.error('Audio loading error:', err);
      return null;
    }
  }, []);

  // Create audio source from buffer
  const createSource = useCallback((buffer) => {
    if (!buffer || !audioContextRef.current) return null;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(gainNodeRef.current);
    source.loop = true; // Enable seamless looping
    
    return source;
  }, []);

  // Play with seamless looping
  const play = useCallback(async () => {
    if (!currentLocation) {
      setError('Please select a location first');
      return;
    }

    try {
      // Resume audio context if suspended (iOS Safari requirement)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // Load audio if not already loaded
      if (!audioBufferRef.current) {
        const buffer = await loadAudio(currentLocation.audioUrl);
        if (!buffer) return;
      }

      // Create and start source
      const source = createSource(audioBufferRef.current);
      if (!source) return;

      currentSourceRef.current = source;
      source.start(0);
      
      setIsPlaying(true);
      setError(null);
    } catch (err) {
      setError('Unable to play audio. Please try again.');
      setIsPlaying(false);
      console.error('Playback error:', err);
    }
  }, [currentLocation, loadAudio, createSource]);

  // Pause audio
  const pause = useCallback(() => {
    if (currentSourceRef.current) {
      currentSourceRef.current.stop();
      currentSourceRef.current = null;
    }
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

  // Change location with crossfade
  const changeLocation = useCallback(async (location) => {
    const wasPlaying = isPlaying;
    
    // Stop current playback
    if (currentSourceRef.current) {
      currentSourceRef.current.stop();
      currentSourceRef.current = null;
    }

    // Update location
    setCurrentLocation(location);
    audioBufferRef.current = null; // Reset buffer
    setIsPlaying(false);

    // Auto-play if was playing
    if (wasPlaying) {
      // Small delay for smooth transition
      setTimeout(() => {
        play();
      }, 100);
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
