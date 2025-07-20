import { useEffect, useState } from 'react';

const FeedbackToast = ({ 
  message, 
  type = 'success', // success, error, info, warning
  isVisible = false,
  onClose,
  duration = 5000 
}) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      setTimeout(onClose, 300); // Wait for animation to complete
    }
  };

  const getToastStyles = () => {
    const baseStyles = "fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out";
    const visibilityStyles = show 
      ? "translate-x-0 opacity-100 scale-100" 
      : "translate-x-full opacity-0 scale-95";
    
    return `${baseStyles} ${visibilityStyles}`;
  };

  const getTypeStyles = () => {
    const styles = {
      success: {
        bg: 'bg-green-500',
        border: 'border-green-600',
        icon: '✅'
      },
      error: {
        bg: 'bg-red-500',
        border: 'border-red-600',
        icon: '❌'
      },
      warning: {
        bg: 'bg-yellow-500',
        border: 'border-yellow-600',
        icon: '⚠️'
      },
      info: {
        bg: 'bg-blue-500',
        border: 'border-blue-600',
        icon: 'ℹ️'
      }
    };
    
    return styles[type] || styles.info;
  };

  const typeConfig = getTypeStyles();

  if (!show && !isVisible) return null;

  return (
    <div className={getToastStyles()}>
      <div className={`
        ${typeConfig.bg} ${typeConfig.border}
        text-white p-4 rounded-lg shadow-lg border-l-4 
        max-w-sm min-w-[300px]
        backdrop-blur-sm
      `}>
        <div className="flex items-start space-x-3">
          <span className="text-lg flex-shrink-0">
            {typeConfig.icon}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-white opacity-60 hover:opacity-100 ml-2 flex-shrink-0 transition-opacity duration-200"
            aria-label="Close notification"
          >
            <svg 
              className="w-4 h-4" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        </div>
        
        {/* Progress bar for duration */}
        {duration > 0 && (
          <div className="mt-2 w-full bg-white bg-opacity-20 rounded-full h-1">
            <div 
              className="bg-white h-1 rounded-full transition-all ease-linear"
              style={{
                width: show ? '0%' : '100%',
                transitionDuration: `${duration}ms`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Hook for easier usage
export const useFeedbackToast = () => {
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const showToast = (message, type = 'success', duration = 5000) => {
    setToast({
      isVisible: true,
      message,
      type,
      duration
    });
  };

  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  const ToastComponent = () => (
    <FeedbackToast
      message={toast.message}
      type={toast.type}
      isVisible={toast.isVisible}
      onClose={hideToast}
      duration={toast.duration}
    />
  );

  return {
    showToast,
    hideToast,
    ToastComponent,
    showSuccess: (message, duration) => showToast(message, 'success', duration),
    showError: (message, duration) => showToast(message, 'error', duration),
    showWarning: (message, duration) => showToast(message, 'warning', duration),
    showInfo: (message, duration) => showToast(message, 'info', duration)
  };
};

export default FeedbackToast;