# AranyaOne API Documentation

## API Standards Implementation

This documentation outlines the API standards that should be implemented when moving from static export to a server-side deployment.

### Required Headers for All API Responses:

```javascript
// Set proper headers for security, performance, and compatibility
res.setHeader('Content-Type', 'application/json; charset=utf-8');
res.setHeader('Cache-Control', 'public, max-age=3600');
res.setHeader('Server', 'AranyaOne');

// Headers to REMOVE (as per requirements):
// - Content-Security-Policy (removed for compatibility)
// - X-XSS-Protection (removed as deprecated)
// - Expires (removed, use Cache-Control instead)
```

### Example API Endpoints:

#### 1. Health Check - `/api/health`
- **Method:** GET
- **Purpose:** System health monitoring
- **Response:** JSON with system status, uptime, memory usage

#### 2. Status - `/api/status`
- **Method:** GET  
- **Purpose:** Service status monitoring
- **Response:** JSON with service statuses and metrics

### Implementation Template:

```javascript
export default function handler(req, res) {
  // Apply standard headers
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('Server', 'AranyaOne');

  // Handle different HTTP methods
  if (req.method === 'GET') {
    // Your logic here
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ 
      error: 'Method Not Allowed',
      message: `Method ${req.method} is not allowed`
    });
  }
}
```

### Migration Notes:

When ready to implement server-side APIs:
1. Remove `output: 'export'` from next.config.js
2. Create `/pages/api/` directory
3. Implement endpoints following the header standards above
4. Update deployment configuration for server-side rendering