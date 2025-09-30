import { useEffect, useState } from 'react';
import { getLocalTime, getAtmosphere } from '../data/locations';

/**
 * Atmospheric overlay that changes colors based on time of day
 * Creates immersive visual experience matching the location's current time
 */
const AtmosphereOverlay = ({ location }) => {
  const [atmosphere, setAtmosphere] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    if (!location) {
      setAtmosphere(null);
      return;
    }

    const updateAtmosphere = () => {
      const timeData = getLocalTime(location.utcOffset);
      const atmo = getAtmosphere(timeData.hours24);
      setAtmosphere(atmo);
      setCurrentTime(timeData);
    };

    // Update immediately
    updateAtmosphere();

    // Update every minute
    const interval = setInterval(updateAtmosphere, 60000);

    return () => clearInterval(interval);
  }, [location]);

  if (!location || !atmosphere) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-all duration-[5000ms] ease-in-out opacity-30"
        style={{
          background: `radial-gradient(ellipse at center, ${atmosphere.colors[0]}, ${atmosphere.colors[1]}, ${atmosphere.colors[2]}, transparent)`
        }}
      />
      
      {/* Additional ambient light */}
      <div
        className="absolute inset-0 transition-all duration-[5000ms] ease-in-out opacity-20"
        style={{
          background: `linear-gradient(180deg, ${atmosphere.colors[1]}, transparent 50%, ${atmosphere.colors[0]})`
        }}
      />

      {/* Time of day indicator */}
      <div className="absolute top-8 right-8 glass rounded-xl p-4 pointer-events-auto">
        <div className="text-center">
          <p className="text-xs text-textSecondary mb-1 uppercase tracking-wider">
            {location.name}
          </p>
          <p className="text-2xl font-mono font-bold text-textPrimary mb-1">
            {currentTime?.time}
          </p>
          <p className="text-xs text-textSecondary">
            {atmosphere.period}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AtmosphereOverlay;