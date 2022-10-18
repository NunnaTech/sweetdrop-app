const STATIC_CACHE_NAME = 'static-cache-v1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1';

self.addEventListener('install', (event) => {
    console.log('SW: Instalado');
    const staticCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll([
            './',
            './index.html',
            './views/dashboard.html',
            './views/form_layout.html',
            './views/grid_layout.html',
            './assets/js/app.js',
            './assets/js/main.js',
            './assets/js/pages/dashboard.js ',
            './assets/css/landing-page.css',
            './assets/css/bootstrap.css',
            './assets/css/app.css',
            './assets/images/favicon.ico',
            './assets/images/icons/android-launchericon-48.png',
            './assets/images/icons/android-launchericon-72.png',
            './assets/images/icons/android-launchericon-96.png',
            './assets/images/icons/android-launchericon-144.png',
            './assets/images/icons/android-launchericon-192.png',
            './assets/images/icons/android-launchericon-512.png',
            './assets/images/logo/logo.png',
            './assets/images/faces/1.jpg',
            './assets/images/faces/2.jpg',
            './assets/images/faces/3.jpg',
            './assets/images/faces/4.jpg',
            './assets/images/faces/5.jpg',
            './assets/images/resources/bg-phone.jpg',
            './assets/images/resources/ferreteria-canalete-logo.png',
            './assets/images/resources/san_jose_logo.png',
            './assets/images/app-badges/app-store-badge.svg',
            './assets/images/app-badges/google-play-badge.svg',
            './assets/images/device-mockups/iPhoneX/portrait.png',
            './assets/images/device-mockups/iPhoneX/portrait_black.png',
            './assets/vendors/fontawesome/all.min.js',   
            './assets/vendors/bootstrap-icons/bootstrap-icons.css',         
            './assets/vendors/bootstrap-icons/bootstrap-icons.svg',         
            './assets/vendors/bootstrap-icons/fonts/bootstrap-icons.woff?4601c71fb26c9277391ec80789bfde9c',         
            './assets/vendors/bootstrap-icons/fonts/bootstrap-icons.woff2?4601c71fb26c9277391ec80789bfde9c', 
            './assets/vendors/apexcharts/apexcharts.js',         
            './manifest.json'
        ]);
    });

    const inmutableCache = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
        return cache.addAll([
            'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap',
            'https://unpkg.com/aos@next/dist/aos.css',
            'https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.24.1/feather.min.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
            'https://unpkg.com/aos@next/dist/aos.js',
            'https://fonts.gstatic.com/s/nunito/v25/XRXV3I6Li01BKofINeaB.woff2'
        ]);
    });
    
    event.waitUntil(Promise.all[(staticCache, inmutableCache)]);
});

self.addEventListener('activate', (event) => {
    console.log('SW: Activado');
});

self.addEventListener('fetch', (event) => {
    const respuesta = caches
        .match(event.request)
        .then((respCache) => respCache);
    event.respondWith(respuesta);
});