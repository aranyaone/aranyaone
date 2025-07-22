import { memo, useEffect, useRef } from 'react';

const LineChart = memo(function LineChart({ 
  data, 
  width = 400, 
  height = 300, 
  color = '#3b82f6',
  className = ''
}) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up dimensions
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Find min/max values
    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;
    
    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 5; i++) {
      const x = padding + (chartWidth / 5) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = height - padding - ((point.value - minValue) / valueRange) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = color;
    data.forEach((point, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = height - padding - ((point.value - minValue) / valueRange) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis labels
    data.forEach((point, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      ctx.fillText(point.label, x, height - 10);
    });
    
    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (valueRange / 5) * (5 - i);
      const y = padding + (chartHeight / 5) * i + 4;
      ctx.fillText(Math.round(value), padding - 10, y);
    }
    
  }, [data, width, height, color]);
  
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`} style={{ width, height }}>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }
  
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`border border-gray-200 rounded-lg ${className}`}
    />
  );
});

export default LineChart;