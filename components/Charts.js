import { useState, useEffect, useMemo } from 'react'

// Chart Components using CSS-based rendering for lightweight implementation

// Line Chart Component
export function LineChart({ data, width = 400, height = 200, color = '#3B82F6', showGrid = true }) {
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationProgress(1), 100)
    return () => clearTimeout(timer)
  }, [])

  const { path, points, maxValue, minValue } = useMemo(() => {
    if (!data || data.length === 0) return { path: '', points: [], maxValue: 0, minValue: 0 }

    const values = data.map(d => d.value)
    const maxValue = Math.max(...values)
    const minValue = Math.min(...values)
    const range = maxValue - minValue || 1

    const points = data.map((d, i) => ({
      x: (i / (data.length - 1)) * width,
      y: height - ((d.value - minValue) / range) * height,
      label: d.label,
      value: d.value
    }))

    const path = points.reduce((acc, point, i) => {
      const command = i === 0 ? 'M' : 'L'
      return `${acc} ${command} ${point.x} ${point.y}`
    }, '')

    return { path, points, maxValue, minValue }
  }, [data, width, height])

  return (
    <div className="relative">
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid Lines */}
        {showGrid && (
          <g className="opacity-20">
            {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
              <line
                key={ratio}
                x1={0}
                y1={height * ratio}
                x2={width}
                y2={height * ratio}
                stroke="#666"
                strokeWidth={1}
              />
            ))}
          </g>
        )}
        
        {/* Chart Line */}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: 1000 * (1 - animationProgress),
            transition: 'stroke-dashoffset 2s ease-in-out'
          }}
        />
        
        {/* Data Points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={color}
            className="opacity-75 hover:opacity-100 cursor-pointer"
            style={{
              transform: `scale(${animationProgress})`,
              transition: `transform 0.5s ease-in-out ${i * 0.1}s`
            }}
          >
            <title>{`${point.label}: ${point.value}`}</title>
          </circle>
        ))}
      </svg>
    </div>
  )
}

// Bar Chart Component
export function BarChart({ data, width = 400, height = 200, color = '#10B981' }) {
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationProgress(1), 100)
    return () => clearTimeout(timer)
  }, [])

  const { bars, maxValue } = useMemo(() => {
    if (!data || data.length === 0) return { bars: [], maxValue: 0 }

    const values = data.map(d => d.value)
    const maxValue = Math.max(...values)
    const barWidth = width / data.length * 0.8
    const barSpacing = width / data.length * 0.2

    const bars = data.map((d, i) => ({
      x: i * (width / data.length) + barSpacing / 2,
      y: height - (d.value / maxValue) * height,
      width: barWidth,
      height: (d.value / maxValue) * height,
      label: d.label,
      value: d.value
    }))

    return { bars, maxValue }
  }, [data, width, height])

  return (
    <div className="relative">
      <svg width={width} height={height}>
        {bars.map((bar, i) => (
          <rect
            key={i}
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height * animationProgress}
            fill={color}
            className="opacity-80 hover:opacity-100 cursor-pointer"
            rx={2}
            style={{
              transition: `height 1s ease-in-out ${i * 0.1}s`
            }}
          >
            <title>{`${bar.label}: ${bar.value}`}</title>
          </rect>
        ))}
      </svg>
      
      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        {data.map((item, i) => (
          <span key={i} className="text-center" style={{ width: `${100/data.length}%` }}>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}

// Pie Chart Component
export function PieChart({ data, size = 200 }) {
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationProgress(1), 100)
    return () => clearTimeout(timer)
  }, [])

  const { segments, total } = useMemo(() => {
    if (!data || data.length === 0) return { segments: [], total: 0 }

    const total = data.reduce((sum, d) => sum + d.value, 0)
    let currentAngle = 0

    const segments = data.map((d, i) => {
      const percentage = d.value / total
      const angle = percentage * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle
      
      currentAngle += angle

      const radius = size / 2 - 10
      const centerX = size / 2
      const centerY = size / 2

      const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180)
      const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180)
      const x2 = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180)
      const y2 = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180)

      const largeArcFlag = angle > 180 ? 1 : 0

      const path = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ')

      return {
        path,
        color: d.color || `hsl(${i * 60}, 70%, 60%)`,
        label: d.label,
        value: d.value,
        percentage: (percentage * 100).toFixed(1)
      }
    })

    return { segments, total }
  }, [data, size])

  return (
    <div className="relative">
      <svg width={size} height={size}>
        {segments.map((segment, i) => (
          <path
            key={i}
            d={segment.path}
            fill={segment.color}
            className="opacity-80 hover:opacity-100 cursor-pointer"
            style={{
              transform: `scale(${animationProgress})`,
              transformOrigin: 'center',
              transition: `transform 0.8s ease-in-out ${i * 0.1}s`
            }}
          >
            <title>{`${segment.label}: ${segment.value} (${segment.percentage}%)`}</title>
          </path>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="mt-4 space-y-2">
        {segments.map((segment, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-gray-700">
              {segment.label}: {segment.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Area Chart Component
export function AreaChart({ data, width = 400, height = 200, color = '#8B5CF6', opacity = 0.3 }) {
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationProgress(1), 100)
    return () => clearTimeout(timer)
  }, [])

  const { linePath, areaPath, points, maxValue, minValue } = useMemo(() => {
    if (!data || data.length === 0) return { linePath: '', areaPath: '', points: [], maxValue: 0, minValue: 0 }

    const values = data.map(d => d.value)
    const maxValue = Math.max(...values)
    const minValue = Math.min(...values)
    const range = maxValue - minValue || 1

    const points = data.map((d, i) => ({
      x: (i / (data.length - 1)) * width,
      y: height - ((d.value - minValue) / range) * height,
      label: d.label,
      value: d.value
    }))

    const linePath = points.reduce((acc, point, i) => {
      const command = i === 0 ? 'M' : 'L'
      return `${acc} ${command} ${point.x} ${point.y}`
    }, '')

    const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`

    return { linePath, areaPath, points, maxValue, minValue }
  }, [data, width, height])

  return (
    <div className="relative">
      <svg width={width} height={height}>
        {/* Area Fill */}
        <path
          d={areaPath}
          fill={color}
          style={{ 
            opacity: opacity * animationProgress,
            transition: 'opacity 1s ease-in-out'
          }}
        />
        
        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: 1000 * (1 - animationProgress),
            transition: 'stroke-dashoffset 2s ease-in-out'
          }}
        />
        
        {/* Data Points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={3}
            fill={color}
            className="opacity-75 hover:opacity-100 cursor-pointer"
            style={{
              transform: `scale(${animationProgress})`,
              transition: `transform 0.5s ease-in-out ${i * 0.1}s`
            }}
          >
            <title>{`${point.label}: ${point.value}`}</title>
          </circle>
        ))}
      </svg>
    </div>
  )
}

// Chart Container with Toggle
export function ChartContainer({ title, children, showToggle = true }) {
  const [isRealData, setIsRealData] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {showToggle && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Mock</span>
            <button
              onClick={() => setIsRealData(!isRealData)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isRealData ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isRealData ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm text-gray-600">Real</span>
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

// Sample data generators
export const sampleData = {
  revenue: [
    { label: 'Jan', value: 12000 },
    { label: 'Feb', value: 19000 },
    { label: 'Mar', value: 15000 },
    { label: 'Apr', value: 22000 },
    { label: 'May', value: 28000 },
    { label: 'Jun', value: 35000 }
  ],
  users: [
    { label: 'Jan', value: 1200 },
    { label: 'Feb', value: 1900 },
    { label: 'Mar', value: 1500 },
    { label: 'Apr', value: 2200 },
    { label: 'May', value: 2800 },
    { label: 'Jun', value: 3500 }
  ],
  services: [
    { label: 'AI Chat', value: 35, color: '#3B82F6' },
    { label: 'Analytics', value: 25, color: '#10B981' },
    { label: 'SEO Tools', value: 20, color: '#8B5CF6' },
    { label: 'Marketing', value: 15, color: '#F59E0B' },
    { label: 'Other', value: 5, color: '#6B7280' }
  ],
  growth: [
    { label: 'Week 1', value: 100 },
    { label: 'Week 2', value: 120 },
    { label: 'Week 3', value: 110 },
    { label: 'Week 4', value: 140 },
    { label: 'Week 5', value: 160 },
    { label: 'Week 6', value: 180 }
  ]
}

export default { LineChart, BarChart, PieChart, AreaChart, ChartContainer, sampleData }