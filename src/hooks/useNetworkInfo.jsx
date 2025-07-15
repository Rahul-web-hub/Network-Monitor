// --- useNetworkInfo.js ---
// NOTE: This file handles fetching and reacting to network stats
// using the Network Information API. Used in dashboard cards + insights.
// TODO: Could merge with PerformanceMonitor later if time permits.
import { useState, useEffect, useCallback } from 'react';
const useNetworkInfo = () => {
  const [networkInfo, setNetworkInfo] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  // grabs current network stats
  const refreshConnectionStats = useCallback(() => {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (!conn) return;

    const info = {
      effectiveType: conn.effectiveType,
      downlink: conn.downlink,
      rtt: conn.rtt,
      saveData: conn.saveData,
      type: conn.type || "unknown"
    };

    setNetworkInfo(info);
    setSuggestions(buildSuggestions(info));
  }, []);

  const buildSuggestions = (info) => {
    const s = [];

    // critical network issue
    if (['2g', 'slow-2g'].includes(info.effectiveType)) {
      s.push({
        type: 'critical',
        message: 'Very slow network detected',
        action: 'Consider loading minimal assets or defer heavy content',
      });
    }

    if (info.saveData) {
      s.push({
        type: 'info',
        message: 'Data Saver is ON',
        action: 'Serve compressed/lighter content when possible',
      });
    }

    if (info.rtt > 400) {
      s.push({
        type: 'warning',
        message: 'High round-trip latency',
        action: 'Try using local caching or CDN',
      });
    }

    return s;
  };

  useEffect(() => {
    refreshConnectionStats();

    const conn = navigator.connection;
    if (conn) {
      conn.addEventListener('change', refreshConnectionStats);

      return () => {
        conn.removeEventListener('change', refreshConnectionStats);
      };
    }
  }, [refreshConnectionStats]);

  return { networkInfo, suggestions };
};
export default useNetworkInfo;