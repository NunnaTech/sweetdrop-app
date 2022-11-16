import {setData, getUser, clear} from './../utils/LocalStorage.js'
import StoreRegisterService from "./StoreRegisterService.js";
import ToastifyService from "./../utils/ToastifyService.js";

const registerForm = document.querySelector('#registerStore') || document.createElement('form');
const inputName = document.querySelector('#name') || document.createElement('input');
const inputPhone = document.querySelector('#phone') || document.createElement('input');
const inputAddress = document.querySelector('#address') || document.createElement('input');
const inputZipCode = document.querySelector('#zipcode') || document.createElement('input');
const inputOwner = document.querySelector('#owner') || document.createElement('input');

registerForm.addEventListener('submit', register);


function validInputs() {
    return inputName.value !== '' || inputPhone.value !== '' || inputAddress.value !== '' || inputZipCode.value !== '' || inputOwner.value !== ''
}

function sendStoreRequest() {
    StoreRegisterService.RegisterStore(inputName.value, inputPhone.value, inputAddress.value, inputZipCode.value, inputOwner.value)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let store = data.data;
                setData('store', JSON.stringify(store));
                alert('Tienda Registrada con Éxito')
            } else alert('No se pudo registrar la tienda')
        }).catch(error => ToastifyService.notificatonError('Hubo un error en el servicio')+error);
}

function register(e) {
    e.preventDefault();
    if (validInputs()) {
        sendStoreRequest();
    } else {
        ToastifyService.notificatonError('Los campos no deben estar vacios');
    }
}

