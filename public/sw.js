// Service Worker for Aranya One - Advanced PWA Features
const CACHE_NAME = 'aranyaone-v1.0.0'
const STATIC_CACHE = 'aranyaone-static-v1.0.0'
const DYNAMIC_CACHE = 'aranyaone-dynamic-v1.0.0'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/services',
  '/analytics',
  '/ai-website-builder',
  '/collaboration',
  '/notifications',
  '/bujji-ai',
  '/admin',
  '/support',
  '/profile',
  '/docs',
  '/settings',
  '/_next/static/css/',
  '/_next/static/js/',
  '/manifest.json'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete')
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Service Worker: Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('✅ Service Worker: Activation complete')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }
  
  // API requests - network first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request))
    return
  }
  
  // Static assets - cache first, fallback to network
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image') {
    event.respondWith(cacheFirstStrategy(request))
    return
  }
  
  // Pages - stale while revalidate
  event.respondWith(staleWhileRevalidateStrategy(request))
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('🔄 Background Sync:', event.tag)
  
  if (event.tag === 'background-sync') {
    event.waitUntil(syncOfflineActions())
  }
})

// Push notifications
self.addEventListener('push', (event) => {
  console.log('🔔 Push notification received')
  
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-72.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/',
        timestamp: Date.now()
      },
      actions: [
        {
          action: 'view',
          title: 'View',
          icon: '/icon-view.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
          icon: '/icon-dismiss.png'
        }
      ]
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Aranya One', options)
    )
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notification clicked:', event.action)
  
  event.notification.close()
  
  if (event.action === 'view') {
    const url = event.notification.data.url || '/'
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        // Check if the app is already open
        const existingClient = clients.find(client => client.url.includes(url))
        if (existingClient) {
          return existingClient.focus()
        }
        
        // Open new window/tab
        return self.clients.openWindow(url)
      })
    )
  }
})

// Caching strategies
async function cacheFirstStrategy(request) {
  try {
    const cache = await caches.open(STATIC_CACHE)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('Cache First Strategy failed:', error)
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    })
  }
}

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Network failed, trying cache:', error)
    const cache = await caches.open(DYNAMIC_CACHE)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    return new Response(JSON.stringify({ 
      error: 'Offline - API not available',
      offline: true 
    }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cachedResponse = await cache.match(request)
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  }).catch(() => {
    // Return cached response if network fails
    return cachedResponse
  })
  
  // Return cached response immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise
}

// Sync offline actions when back online
async function syncOfflineActions() {
  try {
    console.log('🔄 Syncing offline actions...')
    
    // Get offline actions from IndexedDB or localStorage
    const offlineActions = await getOfflineActions()
    
    for (const action of offlineActions) {
      try {
        await processOfflineAction(action)
        await removeOfflineAction(action.id)
      } catch (error) {
        console.error('Failed to sync action:', action, error)
      }
    }
    
    console.log('✅ Offline actions synced')
  } catch (error) {
    console.error('Sync failed:', error)
  }
}

async function getOfflineActions() {
  // Implementation would depend on your offline storage strategy
  // This is a placeholder
  return []
}

async function processOfflineAction(action) {
  // Process the offline action (API call, etc.)
  return fetch(action.url, {
    method: action.method,
    headers: action.headers,
    body: action.body
  })
}

async function removeOfflineAction(actionId) {
  // Remove processed action from offline storage
  console.log('Removed offline action:', actionId)
}

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  const { type, payload } = event.data
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting()
      break
      
    case 'CACHE_URLS':
      event.waitUntil(cacheUrls(payload.urls))
      break
      
    case 'CLEAR_CACHE':
      event.waitUntil(clearCache(payload.cacheName))
      break
      
    default:
      console.log('Unknown message type:', type)
  }
})

async function cacheUrls(urls) {
  const cache = await caches.open(DYNAMIC_CACHE)
  return cache.addAll(urls)
}

async function clearCache(cacheName) {
  return caches.delete(cacheName || DYNAMIC_CACHE)
}

console.log('🚀 Aranya One Service Worker loaded successfully')