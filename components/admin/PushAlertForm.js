import { useState } from 'react';
import { useNotification } from '../../contexts/NotificationContext';

const PushAlertForm = () => {
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    type: 'info', // info, success, warning, error
    target: 'all', // all, active, premium, specific
    priority: 'normal', // low, normal, high, urgent
    scheduled: false,
    scheduledTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!alertData.title.trim()) {
      showError('Alert title is required');
      return;
    }
    
    if (!alertData.message.trim()) {
      showError('Alert message is required');
      return;
    }

    if (alertData.scheduled && !alertData.scheduledTime) {
      showError('Scheduled time is required when scheduling is enabled');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call to send push alert
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, make actual API call:
      // const response = await fetch('/api/admin/push-alerts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(alertData)
      // });
      
      showSuccess(
        alertData.scheduled 
          ? 'Alert scheduled successfully!' 
          : 'Alert sent to all users successfully!'
      );
      
      // Reset form
      setAlertData({
        title: '',
        message: '',
        type: 'info',
        target: 'all',
        priority: 'normal',
        scheduled: false,
        scheduledTime: ''
      });
      
    } catch (error) {
      console.error('Error sending alert:', error);
      showError('Failed to send alert. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTargetDescription = (target) => {
    const descriptions = {
      all: 'All registered users',
      active: 'Active users (last 7 days)',
      premium: 'Premium subscribers only',
      specific: 'Specific user groups'
    };
    return descriptions[target] || descriptions.all;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'text-gray-600',
      normal: 'text-blue-600',
      high: 'text-orange-600',
      urgent: 'text-red-600'
    };
    return colors[priority] || colors.normal;
  };

  const getTypeIcon = (type) => {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };
    return icons[type] || icons.info;
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          📢 Send Global Alert
        </h3>
        <p className="text-sm text-gray-600">
          Send notifications to users across the platform
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Alert Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Alert Title *
          </label>
          <input
            type="text"
            id="title"
            value={alertData.title}
            onChange={(e) => setAlertData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Important announcement..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting}
            maxLength={100}
          />
          <div className="text-xs text-gray-500 mt-1">
            {alertData.title.length}/100 characters
          </div>
        </div>

        {/* Alert Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Alert Message *
          </label>
          <textarea
            id="message"
            value={alertData.message}
            onChange={(e) => setAlertData(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Detailed message about the alert..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            disabled={isSubmitting}
            maxLength={500}
          />
          <div className="text-xs text-gray-500 mt-1">
            {alertData.message.length}/500 characters
          </div>
        </div>

        {/* Alert Type and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Alert Type
            </label>
            <select
              id="type"
              value={alertData.type}
              onChange={(e) => setAlertData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            >
              <option value="info">ℹ️ Information</option>
              <option value="success">✅ Success</option>
              <option value="warning">⚠️ Warning</option>
              <option value="error">❌ Error</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              id="priority"
              value={alertData.priority}
              onChange={(e) => setAlertData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            >
              <option value="low">Low Priority</option>
              <option value="normal">Normal Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-2">
            Target Audience
          </label>
          <select
            id="target"
            value={alertData.target}
            onChange={(e) => setAlertData(prev => ({ ...prev, target: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting}
          >
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="premium">Premium Users</option>
            <option value="specific">Specific Groups</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {getTargetDescription(alertData.target)}
          </p>
        </div>

        {/* Scheduling */}
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <input
              type="checkbox"
              id="scheduled"
              checked={alertData.scheduled}
              onChange={(e) => setAlertData(prev => ({ ...prev, scheduled: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={isSubmitting}
            />
            <label htmlFor="scheduled" className="text-sm font-medium text-gray-700">
              Schedule for later
            </label>
          </div>
          
          {alertData.scheduled && (
            <input
              type="datetime-local"
              value={alertData.scheduledTime}
              onChange={(e) => setAlertData(prev => ({ ...prev, scheduledTime: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
              min={new Date().toISOString().slice(0, 16)}
            />
          )}
        </div>

        {/* Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
          <div className="bg-white border border-gray-200 rounded-md p-3">
            <div className="flex items-start space-x-2">
              <span className="text-lg">{getTypeIcon(alertData.type)}</span>
              <div className="flex-1">
                <h5 className="font-medium text-gray-900">
                  {alertData.title || 'Alert Title'}
                </h5>
                <p className="text-sm text-gray-600 mt-1">
                  {alertData.message || 'Alert message will appear here...'}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <span className={`font-medium ${getPriorityColor(alertData.priority)}`}>
                    {alertData.priority.toUpperCase()} PRIORITY
                  </span>
                  <span>Target: {getTargetDescription(alertData.target)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting || !alertData.title.trim() || !alertData.message.trim()}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            {isSubmitting ? (
              alertData.scheduled ? '📅 Scheduling...' : '📢 Sending...'
            ) : (
              alertData.scheduled ? '📅 Schedule Alert' : '📢 Send Alert Now'
            )}
          </button>
          
          <button
            type="button"
            onClick={() => setAlertData({
              title: '',
              message: '',
              type: 'info',
              target: 'all',
              priority: 'normal',
              scheduled: false,
              scheduledTime: ''
            })}
            disabled={isSubmitting}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default PushAlertForm;