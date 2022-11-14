import {clear} from "./utils/LocalStorage.js";
import {goToPage} from "./utils/Routes.js";
import AuthService from "./services/AuthService.js";
import ToastifyService from "./utils/ToastifyService.js";

let btnLogout;
window.addEventListener('load', async () => {
    btnLogout = document.querySelector('#btnLogout');
    setTimeout(() => {
        document.addEventListener('load', btnLogout.addEventListener('click', logout));
    }, 1000);

})


function logout() {
    AuthService.Logout().then(response => response.json()).then(data => {
        if (data.success) {
            clear();
            goToPage('../../index.html')
        }
    }).catch(error => ToastifyService.notificatonError('Hubo un error en el servicio'));
}