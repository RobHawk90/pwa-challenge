const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'styles/main.css',
  'images/space1.jpg',
  'images/space2.jpg',
  'images/space3.jpg',
];

self.addEventListener('install', (event) => {
  console.log('Service worker install event', event);
  event.waitUntil(
      caches
          .open(cacheName)
          .then((cache) => cache.addAll(precacheResources)),
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!', event);
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
      caches
          .match(event.request)
          .then((cachedResponse) => cachedResponse || fetch(event.request)),
  );
});
