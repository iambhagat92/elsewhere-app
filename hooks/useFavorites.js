import { useState, useEffect } from 'react';

/**
 * Custom hook for managing favorite locations
 * Persists favorites in localStorage
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('elsewhere_favorites');
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to load favorites:', error);
        }
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && favorites.length >= 0) {
      localStorage.setItem('elsewhere_favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const isFavorite = (locationId) => {
    return favorites.includes(locationId);
  };

  const toggleFavorite = (locationId) => {
    setFavorites((prev) => {
      if (prev.includes(locationId)) {
        return prev.filter((id) => id !== locationId);
      } else {
        return [...prev, locationId];
      }
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
};