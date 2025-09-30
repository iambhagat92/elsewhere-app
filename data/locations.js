// Location data with timezone offsets and ambient sound information
export const locations = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    timezone: 'JST',
    utcOffset: 9,
    description: 'Experience the bustling energy of Tokyo streets',
    // Using placeholder audio URLs - replace with actual audio files
    audioUrl: '/audio/tokyo-ambient.mp3',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    emoji: '🗼',
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    timezone: 'CET',
    utcOffset: 1,
    description: 'Immerse yourself in the romantic atmosphere of Paris',
    audioUrl: '/audio/paris-ambient.mp3',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    emoji: '🗼',
  },
  {
    id: 'newyork',
    name: 'New York',
    country: 'USA',
    timezone: 'EST',
    utcOffset: -5,
    description: 'Feel the pulse of the city that never sleeps',
    audioUrl: '/audio/newyork-ambient.mp3',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    emoji: '🗽',
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    timezone: 'BRT',
    utcOffset: -3,
    description: 'Relax with the vibrant sounds of Rio',
    audioUrl: '/audio/rio-ambient.mp3',
    coordinates: { lat: -22.9068, lng: -43.1729 },
    emoji: '🏖️',
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    timezone: 'AEDT',
    utcOffset: 11,
    description: 'Enjoy the laid-back vibes of Sydney',
    audioUrl: '/audio/sydney-ambient.mp3',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    emoji: '🦘',
  },
];

// Function to get local time for a location
export const getLocalTime = (utcOffset) => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const localTime = new Date(utc + (3600000 * utcOffset));
  
  const hours = localTime.getHours();
  const minutes = localTime.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  
  return {
    time: `${displayHours}:${minutes} ${ampm}`,
    hours24: hours,
    minutes: localTime.getMinutes(),
  };
};

// Function to determine atmosphere based on time of day
export const getAtmosphere = (hours24) => {
  if (hours24 >= 5 && hours24 < 8) {
    return { period: 'dawn', colors: ['#1e3a8a', '#f59e0b', '#fbbf24'] };
  } else if (hours24 >= 8 && hours24 < 12) {
    return { period: 'morning', colors: ['#0ea5e9', '#38bdf8', '#7dd3fc'] };
  } else if (hours24 >= 12 && hours24 < 17) {
    return { period: 'afternoon', colors: ['#3b82f6', '#60a5fa', '#93c5fd'] };
  } else if (hours24 >= 17 && hours24 < 20) {
    return { period: 'sunset', colors: ['#f97316', '#fb923c', '#fbbf24'] };
  } else if (hours24 >= 20 || hours24 < 5) {
    return { period: 'night', colors: ['#1e1b4b', '#312e81', '#4c1d95'] };
  }
  return { period: 'day', colors: ['#3b82f6', '#60a5fa', '#93c5fd'] };
};