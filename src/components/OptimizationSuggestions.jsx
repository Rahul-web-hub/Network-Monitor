import { Activity, Wifi, MapPin, TrendingUp, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
const OptimizationSuggestions = ({ suggestions, isVisible }) => {
  const getSuggestionIcon = (type) => {
    switch(type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return CheckCircle;
    }
  };

  const getSuggestionClass = (type) => {
    switch(type) {
      case 'critical': return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'warning': return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      case 'info': return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      default: return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
    }
  };

  return (
    <div id="optimization-card" className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">AI Insights</h3>
          </div>
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isVisible ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-gray-600'
          }`}></div>
        </div>
        
        <div className="space-y-3">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => {
              const IconComponent = getSuggestionIcon(suggestion.type);
              return (
                <div key={index} className={`flex gap-4 p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${getSuggestionClass(suggestion.type)}`}>
                  <div className="flex-shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white mb-1">{suggestion.message}</p>
                    <p className="text-sm opacity-80">{suggestion.action}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <p className="text-gray-300">All systems optimized</p>
              <p className="text-sm text-gray-400 mt-2">No recommendations at this time</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptimizationSuggestions;