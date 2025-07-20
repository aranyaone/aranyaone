import { useState } from 'react';
import { useNotification } from '../../contexts/NotificationContext';

const FeedbackForm = ({ serviceId, serviceName, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      showError('Please select a rating');
      return;
    }

    if (review.trim().length < 10) {
      showError('Please provide a review of at least 10 characters');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          serviceName,
          rating,
          review: review.trim(),
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      const result = await response.json();
      showSuccess('Thank you for your feedback! It will be reviewed before being published.');
      
      // Reset form
      setRating(0);
      setReview('');
      
      if (onSubmit) {
        onSubmit(result);
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      showError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={starValue}
          type="button"
          onClick={() => handleStarClick(starValue)}
          className={`text-2xl transition-colors duration-200 ${
            starValue <= rating 
              ? 'text-yellow-400 hover:text-yellow-500' 
              : 'text-gray-300 hover:text-yellow-300'
          }`}
          disabled={isSubmitting}
        >
          ★
        </button>
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        📝 Share Your Experience with {serviceName}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate this service *
          </label>
          <div className="flex space-x-1">
            {renderStars()}
          </div>
          {rating > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {rating} star{rating !== 1 ? 's' : ''} - {
                rating === 1 ? 'Poor' :
                rating === 2 ? 'Fair' :
                rating === 3 ? 'Good' :
                rating === 4 ? 'Very Good' :
                'Excellent'
              }
            </p>
          )}
        </div>

        {/* Written Review */}
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
            Write your review * (minimum 10 characters)
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this service..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={4}
            disabled={isSubmitting}
            maxLength={500}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Characters: {review.length}/500</span>
            <span>Minimum: 10 characters</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || rating === 0 || review.trim().length < 10}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? '📤 Submitting...' : '📤 Submit Feedback'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;