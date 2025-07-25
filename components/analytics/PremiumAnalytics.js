import { memo, useState, useEffect, useCallback } from 'react';
import { PREMIUM_CONFIG } from '../../config/premium';

const PremiumAnalytics = memo(function PremiumAnalytics() {
  const [metrics, setMetrics] = useState({
    revenue: { value: 0, target: 1247892, trend: '+12.3%' },
    users: { value: 0, target: 45627, trend: '+8.7%' },
    engagement: { value: 0, target: 94.2, trend: '+2.1%' },
    performance: { value: 0, target: 99.8, trend: '+0.5%' }
  });

  const [realTimeData, setRealTimeData] = useState([]);
  const [isLive, setIsLive] = useState(true);

  // Animate counter values
  const animateValue = useCallback((start, end, duration = 2000) => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = start + (end - start) * easeOutQuart(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
      return Math.floor(value);
    };
    return animate();
  }, []);

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  useEffect(() => {
    // Animate initial values
    setMetrics(prev => ({
      revenue: { ...prev.revenue, value: animateValue(0, prev.revenue.target) },
      users: { ...prev.users, value: animateValue(0, prev.users.target) },
      engagement: { ...prev.engagement, value: animateValue(0, prev.engagement.target) },
      performance: { ...prev.performance, value: animateValue(0, prev.performance.target) }
    }));

    // Simulate real-time data
    const interval = setInterval(() => {
      setRealTimeData(prev => {
        const newData = {
          timestamp: Date.now(),
          value: 50 + Math.random() * 50,
          id: Math.random().toString(36).substr(2, 9)
        };
        return [...prev.slice(-19), newData];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [animateValue]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Premium Analytics</h2>
          <p className="text-white/60">Real-time insights powered by AI</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center px-3 py-1 rounded-full ${isLive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${isLive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="text-sm font-medium">{isLive ? 'LIVE' : 'OFFLINE'}</span>
          </div>
          <button 
            onClick={() => setIsLive(!isLive)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
          >
            Toggle Live
          </button>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(metrics).map(([key, metric]) => (
          <div key={key} className="relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:from-white/15 hover:to-white/10 transition-all duration-500 group overflow-hidden">
            
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${
                  metric.trend.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {metric.trend}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">
                  {key === 'revenue' ? '$' : ''}{formatNumber(metric.value)}
                  {key.includes('percentage') || key === 'engagement' || key === 'performance' ? '%' : ''}
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(metric.value / metric.target) * 100}%` }}
                  ></div>
                </div>
                
                <div className="text-white/40 text-xs">
                  Target: {key === 'revenue' ? '$' : ''}{formatNumber(metric.target)}
                  {key.includes('percentage') || key === 'engagement' || key === 'performance' ? '%' : ''}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Chart */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Real-time Activity</h3>
          <div className="text-white/60 text-sm">
            Token: {PREMIUM_CONFIG.TOKEN_ID.slice(-12)}
          </div>
        </div>
        
        <div className="relative h-64 flex items-end space-x-1">
          {realTimeData.map((data, index) => (
            <div
              key={data.id}
              className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all duration-300 hover:from-purple-400 hover:to-pink-400"
              style={{ 
                height: `${data.value}%`,
                opacity: 0.3 + (index / realTimeData.length) * 0.7
              }}
            ></div>
          ))}
        </div>
        
        <div className="flex justify-between text-white/40 text-xs mt-2">
          <span>-20s</span>
          <span>-10s</span>
          <span>Now</span>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm">🤖</span>
          </div>
          <h3 className="text-xl font-semibold text-white">AI Insights</h3>
          <div className="ml-auto px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
            Premium Feature
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-white font-medium mb-2">📈 Performance Forecast</h4>
            <p className="text-white/70 text-sm">Based on current trends, expect 15% revenue growth in the next 30 days.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-white font-medium mb-2">⚠️ Alert</h4>
            <p className="text-white/70 text-sm">User engagement spike detected. Consider scaling resources.</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PremiumAnalytics;
