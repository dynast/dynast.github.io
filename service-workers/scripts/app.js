$(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-workers/sw.js', {
            scope: '/service-workers/'

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
