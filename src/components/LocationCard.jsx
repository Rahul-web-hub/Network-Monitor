import { Activity, Wifi, MapPin, TrendingUp, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
const LocationCard = ({ location, error, isVisible }) => {
  // Handle what to display based on location and error status
  const renderLocationContent = () => {
    if (error) {
      return (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
          <div className="flex items-center gap-3 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      );
    }

    if (!location) {
      return (
        <div className="p-6 bg-gray-500/10 border border-gray-500/20 rounded-2xl">
          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Getting location...</span>
          </div>
        </div>
      );
    }

    // If location is available
    return (
      <div className="space-y-4">
        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-black/20 rounded-2xl">
            <div className="text-lg font-bold text-emerald-400">
              {location.latitude?.toFixed(4)}°
            </div>
            <div className="text-sm text-gray-400">Latitude</div>
          </div>
          <div className="p-4 bg-black/20 rounded-2xl">
            <div className="text-lg font-bold text-cyan-400">
              {location.longitude?.toFixed(4)}°
            </div>
            <div className="text-sm text-gray-400">Longitude</div>
          </div>
        </div>

        {/* Accuracy and Timestamp */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-black/20 rounded-2xl">
            <div className="text-lg font-bold text-purple-400">
              {location.accuracy?.toFixed(0)}m
            </div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </div>
          <div className="p-4 bg-black/20 rounded-2xl">
            <div className="text-lg font-bold text-amber-400">
              {new Date(location.timestamp).toLocaleTimeString()}
            </div>
            <div className="text-sm text-gray-400">Updated</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="location-card" className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">Location Data</h3>
          </div>
          {/* Visibility Dot */}
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isVisible ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-gray-600'
          }`}></div>
        </div>

        {/* Body */}
        {renderLocationContent()}
      </div>
    </div>
  );
};

export default LocationCard;