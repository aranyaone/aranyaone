import { useState } from 'react';

const FeedbackCard = ({ feedback, isAdmin = false, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  const getStatusColor = (status) => {
    const colors = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      approved: '✅',
      pending: '⏳',
      rejected: '❌'
    };
    return icons[status] || icons.pending;
  };

  const handleStatusChange = async (newStatus) => {
    if (onStatusChange) {
      try {
        await onStatusChange(feedback.id, newStatus);
      } catch (error) {
        console.error('Failed to update feedback status:', error);
      }
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-gray-800">{feedback.serviceName}</h4>
            <div className="flex">
              {renderStars(feedback.rating)}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {feedback.userName || 'Anonymous'} • {formatDate(feedback.timestamp)}
          </p>
        </div>
        
        {/* Status Badge */}
        <div className="flex items-center space-x-2">
          {isAdmin && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
              {getStatusIcon(feedback.status)} {feedback.status}
            </span>
          )}
        </div>
      </div>

      {/* Review Text */}
      <div className="mb-3">
        <p className="text-gray-700 leading-relaxed">
          {isExpanded ? feedback.review : truncateText(feedback.review)}
        </p>
        
        {feedback.review.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 text-sm mt-1 font-medium"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Admin Controls */}
      {isAdmin && feedback.status === 'pending' && (
        <div className="flex space-x-2 pt-3 border-t border-gray-200">
          <button
            onClick={() => handleStatusChange('approved')}
            className="flex-1 bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 transition-colors duration-200 text-sm"
          >
            ✅ Approve
          </button>
          <button
            onClick={() => handleStatusChange('rejected')}
            className="flex-1 bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700 transition-colors duration-200 text-sm"
          >
            ❌ Reject
          </button>
        </div>
      )}

      {/* Rating Summary for Display */}
      {!isAdmin && (
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Rating: {feedback.rating}/5
          </div>
          <div className="text-sm text-gray-500">
            {feedback.helpful > 0 && `${feedback.helpful} found helpful`}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;