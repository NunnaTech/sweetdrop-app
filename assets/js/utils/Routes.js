import {getUser} from './LocalStorage.js'

const dealerPages = [
    '/views/dashboards/dealer_dashboard.html',
    '/views/views/products/edit_product.html',
    '/views/dealer_views/dealer_stores.html',
    '/views/orders/order_details.html',
    '/views/orders/orders.html',
    '/views/orders/register_order.html',
    '/views/orders/register_visit.html',
    '/views/orders/take_photo.html',
    '/views/orders/visit_details.html',
    '/views/products/products.html',
    '/views/products/edit_product.html',
    '/views/products/register_product.html',
    '/views/profile/profile.html',
    '/views/store/register_store.html',
    '/views/store/edit_store.html',
    '/views/store/stores.html',
];

const adminPages = [
    '/views/dashboards/admin_dashboard.html',
    '/views/dashboards/orders.html',
    '/views/orders/order_details.html',
    '/views/dealers/dealers.html',
    '/views/dealers/register_dealer.html',
    '/views/dealers/edit_dealer.html?id=6',
    '/views/products/products.html',
    '/views/products/edit_product.html',
    '/views/products/register_product.html',
    '/views/profile/profile.html',
    '/views/store/stores.html',
    '/views/store/register_store.html',
    '/views/store/edit_store.html',
];

const publicPages = [
    '/index.html',
    '/views/authentication/login.html',
    '/views/errors/error-403.html',
    '/views/errors/error-404.html',
    '/views/errors/error-500.html',

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
    window.location.href = '../../../views/errors/error-403.html';
}

export {
    goToPage
}