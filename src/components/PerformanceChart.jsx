import React, { useEffect, useRef } from 'react';
import { TrendingUp } from 'lucide-react';
const PerformanceChart = ({ data, isVisible }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas || !data.length) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(168, 85, 247, 0.1)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (data.length > 1) {
      // Calculate scale
      const maxValue = Math.max(...data.map(d => d.value));
      const minValue = Math.min(...data.map(d => d.value));
      const range = maxValue - minValue || 1;

      // Draw area under line
      const areaGradient = ctx.createLinearGradient(0, 0, 0, height);
      areaGradient.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
      areaGradient.addColorStop(1, 'rgba(168, 85, 247, 0.05)');
      
      ctx.fillStyle = areaGradient;
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      data.forEach((point, index) => {
        const x = (width / (data.length - 1)) * index;
        const y = height - ((point.value - minValue) / range) * height;
        ctx.lineTo(x, y);
      });
      
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Draw line
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.beginPath();

      data.forEach((point, index) => {
        const x = (width / (data.length - 1)) * index;
        const y = height - ((point.value - minValue) / range) * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#a855f7';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw points
      data.forEach((point, index) => {
        const x = (width / (data.length - 1)) * index;
        const y = height - ((point.value - minValue) / range) * height;
        
        // Outer glow
        ctx.fillStyle = 'rgba(168, 85, 247, 0.5)';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Inner point
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  };

  return (
    <div id="performance-card" className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">Performance Monitor</h3>
          </div>
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isVisible ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-gray-600'
          }`}></div>
        </div>
        
        <div className="bg-black/20 rounded-2xl p-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="w-full h-48"
            style={{ width: '100%', height: '12rem' }}
          />
          
          {data.length > 0 && (
            <div className="flex justify-between mt-4 text-sm">
              <div className="text-emerald-400">
                Min: {Math.min(...data.map(d => d.value)).toFixed(1)}ms
              </div>
              <div className="text-purple-400">
                Current: {data[data.length - 1]?.value.toFixed(1)}ms
              </div>
              <div className="text-red-400">
                Max: {Math.max(...data.map(d => d.value)).toFixed(1)}ms
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;