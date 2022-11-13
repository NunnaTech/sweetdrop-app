import {clear} from "./utils/LocalStorage.js";
import {goToPage} from "./utils/Routes.js";
import AuthService from "./services/AuthService.js";

let btnLogout;
window.addEventListener('load', () => {
    btnLogout = document.querySelector('#btnLogout');
    document.addEventListener('load', btnLogout.addEventListener('click', logout));
})


function logout() {
    AuthService.Logout().then(response => response.json()).then(data => {
        if (data.success) {
            clear();
            goToPage('../../index.html')
        }
    }).catch(error => console.error(error));
}