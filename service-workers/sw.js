self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
        '/dynast.github.io/',
        '/dynast.github.io/index.html',
        '/dynast.github.io/scripts/app.js',
        '/dynast.github.io/sw.js',
        '/dynast.github.io/scripts/jquery-3.3.1.min.js',
        '/dynast.github.io/scripts/main.js'
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
