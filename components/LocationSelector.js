import { locations, getLocalTime } from '../data/locations';
import { useFavorites } from '../hooks/useFavorites';

/**
 * Location selector component with mobile-friendly buttons
 * Shows location name, emoji, and current local time
 */
const LocationSelector = ({ currentLocation, onLocationChange, disabled }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-textPrimary">
        Choose Your Destination
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location) => {
          const timeData = getLocalTime(location.utcOffset);
          const isActive = currentLocation?.id === location.id;
          
          return (
            <button
              key={location.id}
              onClick={() => onLocationChange(location)}
              disabled={disabled}
              aria-label={`Select ${location.name}, ${location.country}. Current time: ${timeData.time}`}
              className={`
                relative overflow-hidden
                min-h-[120px] p-6 rounded-xl
                flex flex-col items-center justify-center
                transition-all duration-300 ease-in-out
                border-2 
                ${isActive 
                  ? 'border-primary bg-primary bg-opacity-20 shadow-lg shadow-primary/50' 
                  : 'border-panel glass hover:border-primary/50'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
              `}
            >
              {/* Emoji icon */}
              <div className="text-5xl mb-3">
                {location.emoji}
              </div>
              
              {/* Location name */}
              <h3 className="text-xl font-bold text-textPrimary mb-1">
                {location.name}
              </h3>
              
              {/* Country */}
              <p className="text-sm text-textSecondary mb-2">
                {location.country}
              </p>
              
              {/* Local time */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-textSecondary">Local time:</span>
                <span className="font-mono font-bold text-secondary">
                  {timeData.time}
                </span>
                <span className="text-xs text-textSecondary">
                  {location.timezone}
                </span>
              </div>
              
              {/* Favorite star */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(location.id);
                }}
                className="absolute top-3 right-3 text-2xl hover:scale-125 transition-transform duration-200 focus:outline-none"
                aria-label={isFavorite(location.id) ? 'Remove from favorites' : 'Add to favorites'}
                title={isFavorite(location.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite(location.id) ? '⭐' : '☆'}
              </button>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-3 left-3">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LocationSelector;