var CACHE_NAME = '2021-06-07 00:05';
var urlsToCache = [
  '/photo-scanner/js/opencv.js',
  '/photo-scanner/js/index.js',
  '/photo-scanner/js/worker.js',
  '/photo-scanner/img/scanner.svg',
  '/photo-scanner/img/loading.gif',
  '/photo-scanner/denoise/model.json',
  '/photo-scanner/denoise/group1-shard1of1.bin',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js',
  'https://cdn.jsdelivr.net/npm/dropbox@9.6.0/dist/Dropbox-sdk.min.js',
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
    .open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
