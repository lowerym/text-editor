const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

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

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implements asset cache
registerRoute(
  // This defines the callback function that filters the requests we want cached, namely JS and CSS files
    ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
    new StaleWhileRevalidate({
      // This is what we'll be naming the cache
      cacheName: 'asset-cache',
      plugins: [
        // This plugin lets us cache responses using headers with a maximum-age of 30 days
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxEntries: 120,
          maxAgeSeconds: 30 * 24 * 60 * 60, //30 Days
        })
      ],
    })
  );
