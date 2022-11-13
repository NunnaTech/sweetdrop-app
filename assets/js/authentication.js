import {setData, getUser, clear} from './utils/LocalStorage.js'
import {goToPage} from "./utils/Routes.js";
import AuthService from "./services/AuthService.js";

const loginForm = document.querySelector('#loginForm') || document.createElement('form');
const inputEmail = document.querySelector('#email') || document.createElement('input');
const inputPassword = document.querySelector('#password') || document.createElement('input');
loginForm.addEventListener('submit', login);
document.addEventListener('DOMContentLoaded', sesionActive)

function sesionActive() {
    if (getUser() !== null) {
        let user = getUser();
        if (user.role_id === 1) goToPage('../../views/dashboards/admin_dashboard.html')
        else goToPage('../../views/dashboards/dealer_dashboard.html');
    }
}

function validInputs() {
    if (inputEmail.value === '' || inputPassword.value === '') {
        alert('Please fill in all fields');
        return false;
    } else {
        return true;
    }
}

function sendLoginRequest() {
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
            } else console.error(data)
        }).catch(error => console.error(error));
}

function login(e) {
    e.preventDefault();
    if (validInputs()) {
        sendLoginRequest();
    } else {
        console.error('Inputs sin validar')
    }
}

