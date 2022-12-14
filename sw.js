importScripts('./assets/vendors/puchdb/pouchdb.min.js')
importScripts('./assets/js/services/PuchDBService.js')

const STATIC_CACHE_NAME = "static-cache-v1";
const INMUTABLE_CACHE_NAME = "inmutable-cache-v1";
const DYNAMIC_CACHE_NAME = "dynamic-cache-v1";

const clearCache = (cacheName, maxItemSize) => {
    caches.open(cacheName).then((cache) => {
        return cache.keys().then((items) => {
            if (items.length >= maxItemSize) cache.delete(items[0]).then(() => {
                clearCache(cacheName, maxItemSize)
            })
        })
    })
}

self.addEventListener("install", (event) => {
    console.log("SW: Instalado");
    const staticCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll([
            "./",
            "./index.html",
            "./manifest.json",
            "./app.js",

            "./assets/css/bootstrap.css",
            "./assets/css/landing-page.css",
            "./assets/css/style.css",

            "./assets/images/device-mockups/iPhoneX/portrait_black.png",
            "./assets/images/icons/android-launchericon-48.png",
            "./assets/images/icons/android-launchericon-72.png",
            "./assets/images/icons/android-launchericon-96.png",
            "./assets/images/icons/android-launchericon-144.png",
            "./assets/images/icons/android-launchericon-192.png",
            "./assets/images/icons/android-launchericon-512.png",
            "./assets/images/logo/logo.png",
            "./assets/images/resources/add-order.png",
            "./assets/images/resources/asign-dealer.png",
            "./assets/images/resources/bg-phone.jpg",
            "./assets/images/resources/dealer.png",
            "./assets/images/resources/dealer-stores.png",
            "./assets/images/resources/dealer-visit.png",
            "./assets/images/resources/delivery.png",
            "./assets/images/resources/dulces-chompys.png",
            "./assets/images/resources/gudu-mix.jpg",
            "./assets/images/resources/list_stores.png",
            "./assets/images/resources/man-laptop.png",
            "./assets/images/resources/notes-details.png",
            "./assets/images/resources/order-history.png",
            "./assets/images/resources/san_jose_logo.png",
            "./assets/images/resources/store.png",
            "./assets/images/resources/user-icon.png",
            "./assets/images/resources/woman-candys.png",
            "./assets/images/resources/error-403.png",
            "./assets/images/resources/error-404.png",
            "./assets/images/resources/error-500.png",
            "./assets/images/favicon.ico",

            './assets/js/services/AdminProductsService.js',
            './assets/js/services/AdminService.js',
            './assets/js/services/AdminStoresService.js',
            './assets/js/services/AdminUpdateStore.js',
            './assets/js/services/API.js',
            './assets/js/services/AuthService.js',
            './assets/js/services/CreateOrderService.js',
            './assets/js/services/Dealer.js',
            './assets/js/services/DealerServices.js',
            './assets/js/services/DealerStoresService.js',
            './assets/js/services/DealerUpdateServices.js',
            './assets/js/services/OrderDetailsService.js',
            './assets/js/services/OrderServices.js',
            './assets/js/services/ProductService.js',
            './assets/js/services/StoreService.js',
            './assets/js/services/VisitDetailsServices.js',
            './assets/js/services/VisitServices.js',
            './assets/js/services/PuchDBService.js',
            './assets/js/utils/Camera.js',
            './assets/js/utils/InternetConnection.js',
            './assets/js/utils/Camera-utils.js',
            './assets/js/utils/FileFormat.js',
            './assets/js/utils/Firestore.js',
            './assets/js/utils/Firestore-functions.js',
            './assets/js/utils/LocalStorage.js',
            './assets/js/utils/NotifyService.js',
            './assets/js/utils/Routes.js',
            './assets/js/authentication.js',
            './assets/js/bootstrap.bundle.min.js',
            './assets/js/components.js',
            './assets/js/logout.js',
            './assets/js/profile.js',
            './assets/js/toastify.js',

            "./assets/vendors/fontawesome/all.min.css",
            "./assets/vendors/fontawesome/all.min.js",
            "./assets/vendors/notiflix/notiflix-3.2.5.min.css",
            "./assets/vendors/notiflix/notiflix-3.2.5.min.js",
            "./assets/vendors/puchdb/pouchdb.min.js",

            "./views/authentication/login.html",
            "./views/dashboards/admin_dashboard.html",
            "./views/dashboards/dealer_dashboard.html",
            "./views/dealer_views/dealer_stores.html",
            "./views/dealers/dealers.html",
            "./views/dealers/edit_dealer.html",
            "./views/dealers/register_dealer.html",
            "./views/errors/error-403.html",
            "./views/errors/error-404.html",
            "./views/errors/error-500.html",
            "./views/orders/order_details.html",
            "./views/orders/orders.html",
            "./views/orders/register_order.html",
            "./views/orders/register_visit.html",
            "./views/orders/take_photo.html",
            "./views/orders/visit_details.html",
            "./views/products/edit_product.html",
            "./views/products/products.html",
            "./views/products/register_product.html",
            "./views/profile/profile.html",
            "./views/store/asign_dealers.html",
            "./views/store/edit_store.html",
            "./views/store/register_store.html",
            "./views/store/stores.html",
            "./views/templates/AdminNav.html",
            "./views/templates/DealerNav.html",
        ]);
    });

    const inmutableCache = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
        return cache.addAll([
            "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap",
            "https://unpkg.com/aos@next/dist/aos.css",
            "https://unpkg.com/aos@next/dist/aos.js",
            "https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.24.1/feather.min.js",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
            "https://fonts.gstatic.com/s/nunito/v25/XRXV3I6Li01BKofINeaB.woff2",
            "https://i.imgur.com/SiMTXOF.png"
        ]);
    });

    event.waitUntil(Promise.all[(staticCache, inmutableCache)]);
});

self.addEventListener("activate", (event) => {
    console.log("SW: Activado");
});

self.addEventListener("fetch", (event) => {
    if (event.request.clone().method === 'POST' || event.request.clone().method === 'PUT') {
        const petitionAPI = fetch(event.request.clone())
            .then((response) => response)
            .catch(err => {
                if (self.registration.sync) {
                    return event.request.clone().json().then(json => {
                        return saveVisitOrder(
                            json,
                            event.request.url,
                            event.request.method,
                            event.request.headers.get("Authorization")
                        );
                    })
                }
            })
        event.respondWith(petitionAPI);
    } else {
        let response = fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
                caches.match(event.request).then((cacheResponse) => {
                    if (cacheResponse === undefined) {
                        caches.open(DYNAMIC_CACHE_NAME).then(cache => {
                            cache.put(event.request, networkResponse);
                            clearCache(DYNAMIC_CACHE_NAME, 150)
                        })
                    }
                })
            } else {
                if (event.request.headers.get('accept').includes('text/css')) return caches.match('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap');
                if (event.request.headers.get('accept').includes('text/html')) return caches.match('./views/errors/error-404.html');
            }
            return networkResponse.clone()
        }).catch(() => {
            return caches.match(event.request).then((cacheResponse) => {
                if (cacheResponse) return cacheResponse
                if (event.request.headers.get('accept').includes('text/html')) return caches.match('./views/errors/error-404.html');
            })
        })
        event.respondWith(response);
    }
});


self.addEventListener('sync', (event) => {
    console.log("SW: Sync");
    if (event.tag === 'sync-visit-order') {
        const responseSync = postVisitOrder();
        event.waitUntil(responseSync);
    }
})
