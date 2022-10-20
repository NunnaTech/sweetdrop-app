const STATIC_CACHE_NAME = 'static-cache-v1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1';

self.addEventListener('install', (event) => {
    console.log('SW: Instalado');
    const staticCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll([
            './',
            './index.html',
            './manifest.json',
            // Authentication views
            './views/authentication/login.html',
            './views/authentication/recovery_pass.html',   
            // Error views
            './views/errors/error-403.html',                              
            './views/errors/error-404.html',                              
            './views/errors/error-500.html',   
            // Profile views                                       
            './views/profile/edit_password.html',                              
            './views/profile/profile.html',   
            // Dashboard views                      
            './views/resources/dashboards/admin_dashboard.html',                              
            './views/resources/dashboards/dealer_dashboard.html',  
            // Dealer views for dealer user                           
            './views/resources/dealer_views/dealer_observations.html',                              
            './views/resources/dealer_views/dealer_orders.html',
            './views/resources/dealer_views/dealer_stores.html',
            './views/resources/dealer_views/register_observation.html',
            // Dealer views
            './views/resources/dealers/dealers.html',
            './views/resources/dealers/edit_dealer.html',
            './views/resources/dealers/register_dealer.html',
            // Order views
            './views/resources/orders/observations.html',
            './views/resources/orders/order_details.html',
            './views/resources/orders/orders.html',
            './views/resources/orders/register_order.html',
            './views/resources/orders/register_visit.html',
            // Product views
            './views/resources/products/edit_product.html',
            './views/resources/products/products.html',
            './views/resources/products/register_product.html',
            // CSS
            './assets/css/bootstrap.css',
            './assets/css/landing-page.css',
            './assets/css/style.css',
            // Images
            './assets/images/device-mockups/iPhoneX/portrait_black.png',
            './assets/images/icons/android-launchericon-48.png',
            './assets/images/icons/android-launchericon-72.png',
            './assets/images/icons/android-launchericon-96.png',
            './assets/images/icons/android-launchericon-144.png',
            './assets/images/icons/android-launchericon-192.png',
            './assets/images/icons/android-launchericon-512.png',
            './assets/images/logo/logo.png',
            './assets/images/resources/add-order.png',
            './assets/images/resources/bg-phone.png',
            './assets/images/resources/dealer-stores.png',
            './assets/images/resources/dealer-visit.png',
            './assets/images/resources/dulces-chompys.png',
            './assets/images/resources/gudu-mix.jpg',
            './assets/images/resources/man-laptop.png',
            './assets/images/resources/notes-details.png',
            './assets/images/resources/order-history.png',
            './assets/images/resources/san_jose_logo.png',
            './assets/images/resources/woman-candys.png',
            './assets/images/favicon.ico',

            // JS
            './assets/js/app.js',
            './assets/js/bootstrap.bundle.min.js',           

            //Vendors
            './assets/vendors/fontawesome/all.min.css',
            './assets/vendors/fontawesome/all.min.js',
        ]);
    });

    const inmutableCache = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
        return cache.addAll([
            'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap',
            'https://unpkg.com/aos@next/dist/aos.css',
            'https://unpkg.com/aos@next/dist/aos.js',            
            'https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.24.1/feather.min.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
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