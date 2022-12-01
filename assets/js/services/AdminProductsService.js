import { API_URI, HEADERS_URI } from "./API.js";
import { goToPage } from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";

const registerForm = document.querySelector('#registerProduct') || document.createElement('form');
const inputName = document.querySelector('#name') || document.createElement('input');
const inputPrice = document.querySelector('#price') || document.createElement('input');
const inputDescription = document.querySelector('#description') || document.createElement('input');

let images = [
    "https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg"];

registerForm.addEventListener('submit', saveProduct);

async function createProduct() {
    fetch(API_URI+'/products', {
      method: "POST",
      headers: HEADERS_URI,
      body: JSON.stringify({
        name: inputName.value,
        description: inputDescription.value,
        public_price: inputPrice.value,
        image: images,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          goToPage("../../../views/products/products.html");
          NotifyService.notificatonSuccess('Producto registrado correctamente');
        } else {
          NotifyService.notificatonError('Error al registrar el producto');
        }
      });
  }

  
function validateForm(){
  return(
      inputName.value !== "" &&
      inputPrice.value !== "" &&
      inputDescription.value !== "" &&
      images.length !== 0
  );}

function saveProduct(e) {
  e.preventDefault();
  if (validateForm()) createProduct();
  else NotifyService.notificatonError("Los campos no deben estar vacíos");
}
