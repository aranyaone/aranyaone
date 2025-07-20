import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info', // info, success, warning, error
      title: '',
      message: '',
      duration: 5000,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback((message, title = 'Success') => {
    return addNotification({ type: 'success', title, message });
  }, [addNotification]);

  const showError = useCallback((message, title = 'Error') => {
    return addNotification({ type: 'error', title, message, duration: 7000 });
  }, [addNotification]);

  const showWarning = useCallback((message, title = 'Warning') => {
    return addNotification({ type: 'warning', title, message });
  }, [addNotification]);

  const showInfo = useCallback((message, title = 'Info') => {
    return addNotification({ type: 'info', title, message });
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

// Notification display component
const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  const getTypeStyles = (type) => {
    const styles = {
      success: 'bg-green-500 border-green-600',
      error: 'bg-red-500 border-red-600',
      warning: 'bg-yellow-500 border-yellow-600',
      info: 'bg-blue-500 border-blue-600'
    };
    return styles[type] || styles.info;
  };

  const getIcon = (type) => {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || icons.info;
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            ${getTypeStyles(notification.type)}
            text-white p-4 rounded-lg shadow-lg border-l-4 
            max-w-sm transform transition-all duration-300 ease-in-out
            hover:scale-105 cursor-pointer
          `}
          onClick={() => removeNotification(notification.id)}
        >
          <div className="flex items-start space-x-3">
            <span className="text-lg flex-shrink-0">
              {getIcon(notification.type)}
            </span>
            <div className="flex-1 min-w-0">
              {notification.title && (
                <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
              )}
              <p className="text-sm opacity-90">{notification.message}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNotification(notification.id);
              }}
              className="text-white opacity-60 hover:opacity-100 ml-2"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};