self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            // Cache all resources relative to the service worker so it works
            // when the site is served from a subdirectory (e.g. GitHub Pages).
            return cache.addAll([
        './',
        './index.html',
        './scripts/app.js',
        './sw.js',
        './scripts/jquery-3.3.1.min.js',
        './scripts/main.js'
      ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                let responseClone = response.clone();

                caches.open('v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function () {
                // Optionally return a cached fallback asset here
            });
        }
    }));
});
