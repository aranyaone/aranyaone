import { memo } from 'react';

const Loading = memo(function Loading({ 
  size = 'medium', 
  color = 'blue', 
  text = 'Loading...', 
  overlay = false 
}) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    red: 'border-red-500',
    yellow: 'border-yellow-500',
    indigo: 'border-indigo-500'
  };

  const textColorClasses = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    indigo: 'text-indigo-600'
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Spinner */}
      <div
        className={`
          ${sizeClasses[size]} 
          border-4 border-gray-200 ${colorClasses[color]} 
          border-t-transparent rounded-full animate-spin
        `}
        role="status"
        aria-label="Loading"
      />
      
      {/* Loading Text */}
      {text && (
        <div className={`text-sm font-medium ${textColorClasses[color]}`}>
          {text}
        </div>
      )}
    </div>
  );

  // Overlay version for full-screen loading
  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 shadow-2xl">
          {spinnerContent}
        </div>
      </div>
    );
  }

  // Inline version
  return (
    <div className="flex items-center justify-center p-4">
      {spinnerContent}
    </div>
  );
});

// Dots Loading Animation
const DotsLoading = memo(function DotsLoading({ color = 'blue' }) {
  const dotColorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    indigo: 'bg-indigo-500'
  };

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`
            w-2 h-2 rounded-full ${dotColorClasses[color]}
            animate-pulse
          `}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );
});

// Pulse Loading Animation
const PulseLoading = memo(function PulseLoading({ color = 'blue' }) {
  const pulseColorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    indigo: 'bg-indigo-500'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`
        w-4 h-4 rounded-full ${pulseColorClasses[color]}
        animate-ping
      `} />
    </div>
  );
});

// Skeleton Loading for content placeholders
const SkeletonLoading = memo(function SkeletonLoading({ 
  lines = 3, 
  className = '',
  animated = true 
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className={`
            h-4 bg-gray-200 rounded
            ${animated ? 'animate-pulse' : ''}
            ${index === lines - 1 ? 'w-3/4' : 'w-full'}
          `}
        />
      ))}
    </div>
  );
});

// Export all loading components
Loading.Dots = DotsLoading;
Loading.Pulse = PulseLoading;
Loading.Skeleton = SkeletonLoading;

export default Loading;