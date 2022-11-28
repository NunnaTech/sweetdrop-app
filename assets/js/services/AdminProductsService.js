import { API_URI, HEADERS_URI } from "./API.js";
import { goToPage } from "../utils/Routes.js";
import ProductService from "../services/ProductService.js";
import NotifyService from "../utils/NotifyService.js";

const registerForm = document.querySelector('#registerProduct') || document.createElement('form');
const inputName = document.querySelector('#name') || document.createElement('input');
const inputPrice = document.querySelector('#price') || document.createElement('input');
const inputDescription = document.querySelector('#description') || document.createElement('input');
let fileField = ["https://static.vecteezy.com/system/resources/previews/008/289/394/non_2x/illustrations-chocolate-cake-free-vector.jpg"];


registerForm.addEventListener('submit', register);


fetch(API_URI + `/products`, {
    method: "GET",
    headers: HEADERS_URI,
  })
  .then((response) => response.json())
  .then((data)=>{
    console.log(data);
  })


function validInputs() {
    return inputName.value !== '' || inputPrice.value !== '' || inputDescription.value !== ''
}


function sendProductRequest() {
    NotifyService.loadingNotification()
    ProductService.RegisterProduct(inputName.value, inputPrice.value, inputDescription.value, fileField.value)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data);
                setData('product', JSON.stringify(product));
                NotifyService.notificatonError('Producto Registrado')
                NotifyService.loadingNotificationRemove()
            } else {
                NotifyService.notificatonError('Error al registrar la Tienda')
                NotifyService.loadingNotificationRemove()
            }
            console.log('Error');
        }).catch(error => {
            NotifyService.notificatonError('Hubo un error en el servicio')
            NotifyService.loadingNotificationRemove()
            })
}

function register(e) {
    e.preventDefault();
    if (validInputs()) {
        sendProductRequest();
    } else {
       // ToastifyService.notificatonError('Los campos no deben estar vacios');
       alert('Los campos no pueden estar vacíos')
    }
}