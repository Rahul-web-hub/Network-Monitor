import React, { useState } from 'react';
const usePerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const intervalRef = React.useRef(null);

  const startMonitoring = React.useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const startTime = performance.now();
      
      // Simulate network request timing
      setTimeout(() => {
        const endTime = performance.now();
        const latency = endTime - startTime + Math.random() * 100;
        
        setPerformanceData(prev => [
          ...prev.slice(-19),
          {
            timestamp: Date.now(),
            value: latency
          }
        ]);
      }, Math.random() * 50);
    }, 2000);
  }, []);

  const stopMonitoring = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const clearData = React.useCallback(() => {
    setPerformanceData([]);
  }, []);

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { performanceData, startMonitoring, stopMonitoring, clearData };
};

export { usePerformanceMonitor };