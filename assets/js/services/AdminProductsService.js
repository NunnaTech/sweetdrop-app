import { API_URI, HEADERS_URI } from "./API.js";
import ProductService from "./ProductService.js";
import { getToken, getUser } from "./../utils/LocalStorage.js";

//import ToastifyService from "./../utils/ToastifyService.js"; 

const user = getUser();
const registerForm = document.querySelector('#registerProduct') || document.createElement('form');
const inputName = document.querySelector('#name') || document.createElement('input');
const inputPrice = document.querySelector('#price') || document.createElement('input');
const inputDescription = document.querySelector('#description') || document.createElement('input');
const fileField = document.querySelector("#formFileLg") || document.createElement('input');

registerForm.addEventListener('submit', register);


fetch(API_URI + `/users/products/${user.id}`, {
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
    
    ProductService.RegisterProduct(inputName.value, inputPrice.value, inputDescription.value, fileField.files[0])
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let product = data.data;
                console.log(data);
                setData('product', JSON.stringify(product));
                console.log('Exito');
            } else alert('No se pudo registrar al producto')
            console.log('Error');
        }).catch(error => alert('Hubo un error en el servicio'+ error));
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