import { Activity, Wifi, MapPin, TrendingUp, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
const NetworkCard = ({ networkInfo, isVisible }) => {
  // Add readable labels using switch
  const getConnectionColor = (type) => {
    switch (type) {
      case '4g': return 'text-emerald-400';
      case '3g': return 'text-amber-400';
      case '2g': return 'text-red-400';
      case 'slow-2g': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getConnectionBg = (type) => {
    switch (type) {
      case '4g': return 'bg-emerald-500/20';
      case '3g': return 'bg-amber-500/20';
      case '2g': return 'bg-red-500/20';
      case 'slow-2g': return 'bg-red-600/20';
      default: return 'bg-gray-500/20';
    }
  };

  return (
    <div id="network-card" className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">Network Status</h3>
          </div>
          {/* Visibility indicator */}
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isVisible ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-gray-600'
          }`}></div>
        </div>

        <div className="space-y-4">
          {/* Connection Type */}
          <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
            <span className="text-gray-300">Connection Type</span>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getConnectionBg(networkInfo.effectiveType)} ${getConnectionColor(networkInfo.effectiveType)}`}>
              {networkInfo.effectiveType?.toUpperCase() || 'UNKNOWN'}
            </div>
          </div>

          {/* Speed Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/20 rounded-2xl">
              <div className="text-2xl font-bold text-cyan-400">
                {networkInfo.downlink || 0}
              </div>
              <div className="text-sm text-gray-400">Mbps</div>
            </div>

            <div className="p-4 bg-black/20 rounded-2xl">
              <div className="text-2xl font-bold text-purple-400">
                {networkInfo.rtt || 0}
              </div>
              <div className="text-sm text-gray-400">ms RTT</div>
            </div>
          </div>

          {/* Data Saver Status */}
          <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
            <span className="text-gray-300">Data Saver</span>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              networkInfo.saveData 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'bg-gray-500/20 text-gray-400'
            }`}>
              {networkInfo.saveData ? 'Enabled' : 'Disabled'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NetworkCard;