// Import the workbox-recipes module and extract the 'offlineFallback' and 'warmStrategyCache' functions.
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
// Import the workbox-strategies module and extract the 'CacheFirst' and 'StaleWhileRevalidate' classes.
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing'); // Import the workbox-routing module 

// Import the workbox-cacheable-response module and extract the 'CacheableResponsePlugin' class.
const { CacheableResponsePlugin } = require('workbox-cacheable-response');

const { ExpirationPlugin } = require('workbox-expiration'); // Import the workbox-expiration module
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');// Import the workbox-precaching module

// Precache the files specified in the __WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Create a new CacheFirst caching strategy
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm the CacheFirst strategy with specific URLs for offline
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register a route using the workbox-routing library.
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Register a route to cache assets like styles, scripts, and workers.
// The route uses the StaleWhileRevalidate strategy to serve cached assets
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      })
    ],
  })
);

// Check if service workers are supported in the browser and register the service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// Add a fetch event listener to handle fetch requests.
self.addEventListener('fetch', function (event) {
  // Currently, it is empty, so the service worker does not handle fetch events.
});