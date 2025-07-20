import { memo, useState, useEffect } from 'react';

const AlertBar = memo(function AlertBar({ 
  message, 
  type = 'info', 
  dismissible = true, 
  autoClose = false,
  duration = 5000,
  onClose 
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Animation duration
  };

  if (!isVisible) return null;

  const alertStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '✅',
      button: 'text-green-500 hover:text-green-700'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '❌',
      button: 'text-red-500 hover:text-red-700'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠️',
      button: 'text-yellow-500 hover:text-yellow-700'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ️',
      button: 'text-blue-500 hover:text-blue-700'
    }
  };

  const style = alertStyles[type] || alertStyles.info;

  return (
    <div
      className={`
        ${style.bg} ${style.border} border rounded-lg p-4 mb-4
        transition-all duration-300 ease-in-out
        ${isExiting ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg mr-3" aria-hidden="true">
            {style.icon}
          </span>
          <div className={`${style.text} text-sm font-medium`}>
            {message}
          </div>
        </div>
        
        {dismissible && (
          <button
            onClick={handleClose}
            className={`
              ${style.button}
              ml-4 inline-flex text-sm
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
              transition-colors duration-200
            `}
            aria-label="Close alert"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      
      {/* Progress bar for auto-close */}
      {autoClose && duration > 0 && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className={`h-1 rounded-full transition-all ease-linear ${
                type === 'success' ? 'bg-green-500' :
                type === 'error' ? 'bg-red-500' :
                type === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`}
              style={{
                width: '100%',
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
});

// Toast-style alerts that appear at the top of the screen
const ToastAlert = memo(function ToastAlert({ 
  message, 
  type = 'info', 
  position = 'top-right',
  duration = 3000,
  onClose 
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  return (
    <div
      className={`
        fixed ${positionClasses[position]} z-50
        animate-in slide-in-from-top-2 fade-in duration-300
      `}
    >
      <AlertBar 
        message={message}
        type={type}
        dismissible={true}
        onClose={onClose}
      />
    </div>
  );
});

AlertBar.Toast = ToastAlert;

export default AlertBar;