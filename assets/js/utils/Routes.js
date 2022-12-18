import {getUser} from './LocalStorage.js'

const APP_URL = window.location.host.includes('localhost') ? "." : "./sweetdrop-app"

const dealerPages = [
    `${APP_URL}/index.html`,
    `${APP_URL}/views/authentication/login.html`,
    `${APP_URL}/views/dashboards/dealer_dashboard.html`,
    `${APP_URL}/views/views/products/edit_product.html`,
    `${APP_URL}/views/dealer_views/dealer_stores.html`,
    `${APP_URL}/views/orders/order_details.html`,
    `${APP_URL}/views/orders/orders.html`,
    `${APP_URL}/views/orders/register_order.html`,
    `${APP_URL}/views/orders/register_visit.html`,
    `${APP_URL}/views/orders/take_photo.html`,
    `${APP_URL}/views/orders/visit_details.html`,
    `${APP_URL}/views/products/products.html`,
    `${APP_URL}/views/products/edit_product.html`,
    `${APP_URL}/views/products/register_product.html`,
    `${APP_URL}/views/profile/profile.html`,
    `${APP_URL}/views/store/register_store.html`,
    `${APP_URL}/views/store/edit_store.html`,
    `${APP_URL}/views/store/stores.html`,
    `${APP_URL}/views/errors/error-403.html`,
    `${APP_URL}/views/errors/error-404.html`,
    `${APP_URL}/views/errors/error-500.html`,
    `${APP_URL}/views/errors/offline.html`,
];

const adminPages = [
    `${APP_URL}/index.html`,
    `${APP_URL}/views/authentication/login.html`,
    `${APP_URL}/views/dashboards/admin_dashboard.html`,
    `${APP_URL}/views/dashboards/orders.html`,
    `${APP_URL}/views/orders/order_details.html`,
    `${APP_URL}/views/dealers/dealers.html`,
    `${APP_URL}/views/dealers/register_dealer.html`,
    `${APP_URL}/views/dealers/edit_dealer.html?id=6`,
    `${APP_URL}/views/products/products.html`,
    `${APP_URL}/views/products/edit_product.html`,
    `${APP_URL}/views/products/register_product.html`,
    `${APP_URL}/views/profile/profile.html`,
    `${APP_URL}/views/store/stores.html`,
    `${APP_URL}/views/store/register_store.html`,
    `${APP_URL}/views/store/edit_store.html`,
    `${APP_URL}/views/store/asign_dealers.html`,
    `${APP_URL}/views/errors/error-403.html`,
    `${APP_URL}/views/errors/error-404.html`,
    `${APP_URL}/views/errors/error-500.html`,
    `${APP_URL}/views/errors/offline.html`,
];

const publicPages = [
    `${APP_URL}/index.html`,
    `${APP_URL}/views/authentication/login.html`,
    `${APP_URL}/views/errors/error-403.html`,
    `${APP_URL}/views/errors/error-404.html`,
    `${APP_URL}/views/errors/error-500.html`,
    `${APP_URL}/views/errors/offline.html`,
];


((dealerPages, adminPages, publicPages) => {
    let user = getUser();
    if (user != null) {
        switch (user.role_id) {
            case 1:
                if (!adminPages.some(exists)) goToForbbidenPage();
                break;
            case 2:
                if (!dealerPages.some(exists)) goToForbbidenPage();
                break;
        }
    } else {
        if (!publicPages.some(exists)) goToForbbidenPage();
    }
})(dealerPages, adminPages, publicPages)


function exists(page) {
    return page.includes(window.location.pathname);
}

function goToPage(page) {
    window.location.href = page;
}


function goToForbbidenPage() {
    window.location.href = `../../views/errors/error-403.html`;
}

export {
    goToPage
}