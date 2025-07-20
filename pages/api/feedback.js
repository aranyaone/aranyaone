// Mock feedback storage - replace with Firebase/database in production
let feedbackStorage = [
  {
    id: 1,
    serviceId: 'analytics',
    serviceName: 'Analytics Dashboard', 
    userName: 'John Doe',
    rating: 5,
    review: 'Amazing analytics dashboard! Really helps track our business metrics effectively.',
    status: 'approved',
    timestamp: '2024-01-15T10:30:00.000Z',
    helpful: 5
  },
  {
    id: 2,
    serviceId: 'services',
    serviceName: 'Service Management',
    userName: 'Jane Smith', 
    rating: 4,
    review: 'Good service management tools. Could use some UI improvements but overall very functional.',
    status: 'approved',
    timestamp: '2024-01-14T14:45:00.000Z',
    helpful: 3
  },
  {
    id: 3,
    serviceId: 'dashboard',
    serviceName: 'Main Dashboard',
    userName: 'Mike Johnson',
    rating: 3,
    review: 'The dashboard needs work. Sometimes slow to load and could be more intuitive.',
    status: 'pending',
    timestamp: '2024-01-16T09:15:00.000Z',
    helpful: 0
  }
];

let nextId = 4;

export default function handler(req, res) {
  // Enable CORS for frontend requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        return handleGetFeedback(req, res);
      case 'POST':
        return handleCreateFeedback(req, res);
      case 'PUT':
        return handleUpdateFeedback(req, res);
      case 'DELETE':
        return handleDeleteFeedback(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function handleGetFeedback(req, res) {
  const { serviceId, status, limit = 50, offset = 0 } = req.query;

  let filteredFeedback = [...feedbackStorage];

  // Filter by service
  if (serviceId) {
    filteredFeedback = filteredFeedback.filter(f => f.serviceId === serviceId);
  }

  // Filter by status (for admin)
  if (status) {
    filteredFeedback = filteredFeedback.filter(f => f.status === status);
  } else {
    // Public endpoint - only show approved feedback
    filteredFeedback = filteredFeedback.filter(f => f.status === 'approved');
  }

  // Sort by timestamp (newest first)
  filteredFeedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Pagination
  const start = parseInt(offset);
  const end = start + parseInt(limit);
  const paginatedFeedback = filteredFeedback.slice(start, end);

  return res.status(200).json({
    feedback: paginatedFeedback,
    total: filteredFeedback.length,
    hasMore: end < filteredFeedback.length
  });
}

function handleCreateFeedback(req, res) {
  const { serviceId, serviceName, rating, review, userName } = req.body;

  // Validation
  if (!serviceId || !serviceName) {
    return res.status(400).json({ error: 'Service ID and name are required' });
  }

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  if (!review || review.trim().length < 10) {
    return res.status(400).json({ error: 'Review must be at least 10 characters long' });
  }

  if (review.length > 500) {
    return res.status(400).json({ error: 'Review must be less than 500 characters' });
  }

  // Create new feedback
  const newFeedback = {
    id: nextId++,
    serviceId,
    serviceName,
    userName: userName || 'Anonymous',
    rating: parseInt(rating),
    review: review.trim(),
    status: 'pending', // All new feedback starts as pending
    timestamp: new Date().toISOString(),
    helpful: 0
  };

  feedbackStorage.push(newFeedback);

  // In production, here you would:
  // 1. Save to Firebase/database
  // 2. Send notification to admins
  // 3. Possibly run content moderation

  return res.status(201).json({
    success: true,
    feedback: newFeedback,
    message: 'Feedback submitted successfully and is pending review'
  });
}

function handleUpdateFeedback(req, res) {
  const { id, status, adminId } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Feedback ID is required' });
  }

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  // Find and update feedback
  const feedbackIndex = feedbackStorage.findIndex(f => f.id === parseInt(id));
  
  if (feedbackIndex === -1) {
    return res.status(404).json({ error: 'Feedback not found' });
  }

  feedbackStorage[feedbackIndex] = {
    ...feedbackStorage[feedbackIndex],
    status,
    moderatedBy: adminId,
    moderatedAt: new Date().toISOString()
  };

  // In production, here you would:
  // 1. Update in Firebase/database
  // 2. Log admin action in audit trail
  // 3. Notify user if needed

  return res.status(200).json({
    success: true,
    feedback: feedbackStorage[feedbackIndex],
    message: `Feedback ${status} successfully`
  });
}

function handleDeleteFeedback(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Feedback ID is required' });
  }

  const feedbackIndex = feedbackStorage.findIndex(f => f.id === parseInt(id));
  
  if (feedbackIndex === -1) {
    return res.status(404).json({ error: 'Feedback not found' });
  }

  const deletedFeedback = feedbackStorage.splice(feedbackIndex, 1)[0];

  // In production, here you would:
  // 1. Delete from Firebase/database
  // 2. Log admin action in audit trail

  return res.status(200).json({
    success: true,
    message: 'Feedback deleted successfully',
    deleted: deletedFeedback
  });
}