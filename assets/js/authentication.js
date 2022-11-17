import {setData, getUser, clear} from './utils/LocalStorage.js'
import {goToPage} from "./utils/Routes.js";
import AuthService from "./services/AuthService.js";
import NotifyService from "./utils/NotifyService.js";

const loginForm = document.querySelector('#loginForm') || document.createElement('form');
const inputEmail = document.querySelector('#email') || document.createElement('input');
const inputPassword = document.querySelector('#password') || document.createElement('input');
loginForm.addEventListener('submit', login);
document.addEventListener('DOMContentLoaded', sesionActive);

function sesionActive() {
    if (getUser() !== null) {
        let user = getUser();
        if (user.role_id === 1) goToPage('../../views/dashboards/admin_dashboard.html')
        else goToPage('../../views/dashboards/dealer_dashboard.html');
    }
}

function validInputs() {
    return inputEmail.value !== '' || inputPassword.value !== ''
}

function sendLoginRequest() {
    NotifyService.loadingNotification()
    AuthService.Login(inputEmail.value, inputPassword.value)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let token = data.token;
                let user = data.data;
                setData('token', token);
                setData('user', JSON.stringify(user));
                if (user.role_id === 1) goToPage('../../views/dashboards/admin_dashboard.html')
                else goToPage('../../views/dashboards/dealer_dashboard.html');
            } else {
                NotifyService.notificatonError('Usuario no encontrado')
                NotifyService.loadingNotificationRemove()
            }
        }).catch(error => {
        NotifyService.notificatonError('Hubo un error en el servicio')
        NotifyService.loadingNotificationRemove()
    });
}

function login(e) {
    e.preventDefault();
    if (validInputs()) sendLoginRequest();
    else NotifyService.notificatonError('Los campos no deben estar vacios');
}

