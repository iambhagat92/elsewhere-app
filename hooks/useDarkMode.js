import { useState, useEffect } from 'react';

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Only access localStorage on client side
    if (typeof window === 'undefined') {
      return false; // Default for SSR
    }
    
    // Check localStorage first
    const saved = localStorage.getItem('elsewhere-dark-mode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    
    // Otherwise, check system preference
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    return false; // Default to light mode
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('elsewhere-dark-mode', JSON.stringify(isDark));
    
    // Apply dark mode class to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  return [isDark, toggleDarkMode];
}