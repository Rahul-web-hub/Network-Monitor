// --- Header.jsx ---
// NOTE: Hero section with control buttons for the dashboard
// TODO: Maybe add icon tooltips later if there's time

import { Activity, Zap } from "lucide-react";

const Header = ({
  isMonitoring,
  onStartMonitoring,
  onStopMonitoring,
  onClearData,
}) => {
  // optional styles - done this way to keep button logic clearer
  const btnStyles = {
    active:
      "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg hover:shadow-2xl hover:scale-105",
    inactive: "bg-gray-700 text-gray-400 cursor-not-allowed",
  };
  const startBtnClass = isMonitoring
  ? "bg-gray-800 text-gray-400 cursor-not-allowed"
  : "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg hover:shadow-2xl hover:scale-105";

  return (
    <header className="relative z-10 text-center py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-4 gap-2 sm:gap-4">
          {/* icon bubble */}
          <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl">
            <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Network Monitor
          </h1>
        </div>

        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Real-time network performance dashboard — built using modern Web APIs
        </p>

        {/* control buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          
          {/* start button */}
          <button
            onClick={onStartMonitoring}
            disabled={isMonitoring}
            className={`group relative px-6 sm:px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${startBtnClass}`}
          >
            <div className="flex items-center gap-2">
              {isMonitoring ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Zap className="w-4 h-4" />
              )}
              <span className="text-sm sm:text-base">
                {isMonitoring ? "Monitoring Active" : "Start Monitoring"}
              </span>
            </div>
          </button>

          {/* stop button */}
          <button
            onClick={onStopMonitoring}
            disabled={!isMonitoring}
            className={`px-6 sm:px-8 py-3 rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
              !isMonitoring
                ? btnStyles.inactive
                : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-105"
            }`}
          >
            Stop Monitoring
          </button>

          {/* clear data */}
          <button
            onClick={onClearData}
            className="px-6 sm:px-8 py-3 rounded-2xl font-semibold bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 hover:text-red-300 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            Clear Data
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;