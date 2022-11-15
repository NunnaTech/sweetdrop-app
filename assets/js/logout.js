import {clear} from "./utils/LocalStorage.js";
import {goToPage} from "./utils/Routes.js";
import AuthService from "./services/AuthService.js";
import NotifyService from "./utils/NotifyService.js";

let btnLogout;

window.addEventListener('load', async () => {
    setTimeout(() => {
        btnLogout = document.querySelector('#btnLogout');
        document.addEventListener('load', btnLogout.addEventListener('click', logout));
    }, 2000);
})


function logout() {
    AuthService.Logout().then(response => response.json()).then(data => {
        NotifyService.loadingNotification('Cerrando sesión');
        setTimeout(() => {
            if (data.success) {
                clear();
                goToPage('../../index.html')
            } else {
                NotifyService.loadingNotificationRemove()
                NotifyService.notificatonError('Hubo un error al cerrar sesión');
            }
        }, 2000);

    }).catch(error => NotifyService.notificatonError('Hubo un error en el servicio'));
}