const STATIC_CACHE_NAME = 'static-cache-v1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1';

self.addEventListener('install', (event) => {
    console.log('SW: Instalado');
    const staticCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll([
            './',
            './index.html',
            './index.html',
                              
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