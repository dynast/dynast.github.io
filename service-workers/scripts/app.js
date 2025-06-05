$(function () {
    if ('serviceWorker' in navigator) {
        // Register the service worker relative to this directory so the path
        // matches the actual file location. Using an absolute path caused the
        // registration to fail because the file does not exist at the root of
        // the site when hosted on GitHub Pages.
        navigator.serviceWorker.register('sw.js', {
            scope: './'
        }).then(function (reg) {

            if (reg.installing) {
                console.log('Service worker installing');
            } else if (reg.waiting) {
                console.log('Service worker installed');
            } else if (reg.active) {
                console.log('Service worker active');
            }

        }).catch(function (error) {
            console.log('Registration failed with ' + error);
        });
    }
});
