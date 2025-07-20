import { useState, useEffect } from 'react';
import { useNotification } from '../../contexts/NotificationContext';

const FeedbackModerationTable = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    fetchFeedback();
  }, [filter]);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const statusParam = filter === 'all' ? '' : `&status=${filter}`;
      const response = await fetch(`/api/feedback?limit=100${statusParam}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      
      const data = await response.json();
      setFeedback(data.feedback || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      showError('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (feedbackId, newStatus) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: feedbackId,
          status: newStatus,
          adminId: 'admin_user' // In production, get from auth context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update feedback status');
      }

      await response.json();
      showSuccess(`Feedback ${newStatus} successfully`);
      
      // Refresh the list
      await fetchFeedback();
    } catch (error) {
      console.error('Error updating feedback:', error);
      showError('Failed to update feedback status');
    }
  };

  const handleDelete = async (feedbackId) => {
    if (!confirm('Are you sure you want to delete this feedback? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: feedbackId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete feedback');
      }

      showSuccess('Feedback deleted successfully');
      await fetchFeedback();
    } catch (error) {
      console.error('Error deleting feedback:', error);
      showError('Failed to delete feedback');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading feedback...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            📝 Feedback Moderation
          </h3>
          
          {/* Filter */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <button
              onClick={fetchFeedback}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service & User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating & Review
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedback.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No feedback found
                </td>
              </tr>
            ) : (
              feedback.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.serviceName}
                      </div>
                      <div className="text-sm text-gray-500">
                        by {item.userName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center mb-1">
                      {renderStars(item.rating)}
                      <span className="ml-2 text-sm text-gray-600">
                        ({item.rating}/5)
                      </span>
                    </div>
                    <div className="text-sm text-gray-900 max-w-xs">
                      {item.review.length > 100 
                        ? `${item.review.substring(0, 100)}...`
                        : item.review
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(item.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      {item.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(item.id, 'approved')}
                            className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(item.id, 'rejected')}
                            className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                          >
                            ❌ Reject
                          </button>
                        </>
                      )}
                      
                      {item.status === 'approved' && (
                        <button
                          onClick={() => handleStatusChange(item.id, 'rejected')}
                          className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                        >
                          ❌ Reject
                        </button>
                      )}
                      
                      {item.status === 'rejected' && (
                        <button
                          onClick={() => handleStatusChange(item.id, 'approved')}
                          className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                        >
                          ✅ Approve
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-700"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackModerationTable;