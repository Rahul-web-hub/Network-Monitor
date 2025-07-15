import React, { useState} from 'react';
import { Activity, Wifi, MapPin, TrendingUp, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import NetworkCard from './components/NetworkCard';
import LocationCard from './components/LocationCard';
import PerformanceChart from './components/PerformanceChart';
import OptimizationSuggestions from './components/OptimizationSuggestions';
import useNetworkInfo from './hooks/useNetworkInfo';
import useGeolocation from './hooks/useGeolocation';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
import AssignmentBanner from './components/AssignmentBanner'; 
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import './App.css';

const App = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  // Custom hooks for each API
  const { networkInfo, suggestions } = useNetworkInfo();
  const { location, error: locationError } = useGeolocation();
  const { performanceData, startMonitoring, stopMonitoring, clearData } = usePerformanceMonitor();
  const { visibleElements } = useIntersectionObserver();

  const handleStartMonitoring = () => {
    setIsMonitoring(true);
    startMonitoring();
  };

  const handleStopMonitoring = () => {
    setIsMonitoring(false);
    stopMonitoring();
  };

  const handleClearData = () => {
    clearData();
  };

 return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      <AssignmentBanner />
      <Header 
        isMonitoring={isMonitoring}
        onStartMonitoring={handleStartMonitoring}
        onStopMonitoring={handleStopMonitoring}
        onClearData={handleClearData}
      />
      
      <Dashboard>
        <NetworkCard 
          networkInfo={networkInfo}
          isVisible={visibleElements.has('network-card')}
        />
        
        <LocationCard 
          location={location}
          error={locationError}
          isVisible={visibleElements.has('location-card')}
        />
        
        <PerformanceChart 
          data={performanceData}
          isVisible={visibleElements.has('performance-card')}
        />
        
        <OptimizationSuggestions 
          suggestions={suggestions}
          isVisible={visibleElements.has('optimization-card')}
        />
      </Dashboard>
    </div>
  );
};
export default App;