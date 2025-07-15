// NOTE: Gets user's current geo-position using browser GPS API.
import { useState, useEffect } from 'react';


const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Browser doesn't support geolocation");
      return;
    }

    const handleSuccess = (pos) => {
      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        timestamp: Date.now(), // not using pos.timestamp to avoid timezone noise
      });
      setError(null);
    };

    const handleError = (err) => {
      setError(err.message || "Something went wrong");
      setLocation(null);
    };

    // rushed timeout since deadline close ⚠️
    const options = {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 300000,
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, []);

  return { location, error };
};
export default useGeolocation;