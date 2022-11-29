import {clear} from "./utils/LocalStorage.js";
import {goToPage} from "./utils/Routes.js";
import AuthService from "./services/AuthService.js";
import NotifyService from "./utils/NotifyService.js";

window.addEventListener('load', () => {
    setTimeout(() => {
        let btnLogout = document.querySelector('#btnLogout');
        btnLogout.addEventListener('click', confirmLogout)
    }, 2000)
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


function confirmLogout() {
    Notiflix.Confirm.show(
        'Salir de la aplicación',
        '¿Estás seguro de salir y cerrar sesión?',
        'Sí, cerrar',
        'No, permanecer',
        () => {
            logout()
        },
        () => {
        },
        {
            titleColor: '#5D51B4',
            okButtonColor: '#f8f9fa',
            okButtonBackground: '#54d37a',
            cancelButtonColor: '#f8f9fa',
            cancelButtonBackground: '#f3616d',
        }
    );
}

window.logout = logout
window.confirmLogout = confirmLogout