import {setData, getUser, clear} from './utils/LocalStorage.js'
import AuthService from "./services/AuthService.js";
import {goToPage} from "./utils/Routes.js";


const formProfile = document.querySelector('#formProfile');
const formPassword = document.querySelector('#formPassword');
const inputEmail = document.querySelector('#email');
const inputName = document.querySelector('#name');
const inputFirstSurname = document.querySelector('#first_surname');
const inputSecondSurname = document.querySelector('#second_surname');
const inputPhone = document.querySelector('#phone');

const inputPassword = document.querySelector('#password');
const inputNewPassword = document.querySelector('#new_password');
const inputNewPasswordConfirmation = document.querySelector('#new_password_confirmation');

document.addEventListener('DOMContentLoaded', setDataOnForm);
formProfile.addEventListener('submit', saveProfile);
formPassword.addEventListener('submit', savePassword);


function validPasswords() {
    return inputPassword.value !== '' && inputNewPassword.value !== '' && inputNewPasswordConfirmation.value !== '';
}

function updatePassword() {
    let passwords = {
        password: inputPassword.value,
        new_password: inputNewPassword.value,
        new_password_confirmation: inputNewPasswordConfirmation.value
    }
    AuthService.ChangePassword(passwords)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                clear();
                goToPage('../../index.html')
            } else {
                console.log('No cambiada password')
            }
        })
        .catch(error => console.error(error));
}

function savePassword(e) {
    e.preventDefault()
    if (validPasswords()) {
        updatePassword()
    } else {
        console.log('No validado')
    }
}

function saveProfile(e) {
    e.preventDefault()
    if (validateForm()) {
        updateProfile()
    } else {
        console.log('No validado')
    }
}

function setDataOnForm() {
    const user = getUser();
    inputEmail.value = user.email;
    inputName.value = user.name;
    inputFirstSurname.value = user.first_surname;
    inputSecondSurname.value = user.second_surname;
    inputPhone.value = user.phone;
}


function updateProfile() {
    const user = getUser();
    let newUser = {
        id: user.id,
        email: inputEmail.value,
        name: inputName.value,
        first_surname: inputFirstSurname.value,
        second_surname: inputSecondSurname.value,
        phone: inputPhone.value,
        role_id: user.role_id
    }
    AuthService.Profile(newUser)
        .then(response => response.json())
        .then(data => {
                if (data.success) {
                    let user = data.data;
                    setData('user', JSON.stringify(user));
                    console.log(data)
                } else console.error(data)
            }
        ).catch(error => console.error(error));
}

function validateForm() {
    return inputEmail.value !== '' && inputName.value !== '' && inputFirstSurname.value !== '' && inputSecondSurname.value !== '' && inputPhone.value !== '';
}
