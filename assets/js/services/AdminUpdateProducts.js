import { API_URI, HEADERS_URI } from "./API.js";
import { goToPage } from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";

const updateForm = document.querySelector('#updateProduct') || document.createElement('form');
const inputUpdateName = document.querySelector('#name') || document.createElement('input');
const inputUpdatePrice = document.querySelector('#price') || document.createElement('input');
const inputUpdateDescription = document.querySelector('#description') || document.createElement('input');

let images = [
    "https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg",
];

registerForm.addEventListener('submit', updateProduct);

async function saveProduct() {
    fetch(API_URI+'/products', {
      method: "PUT",
      headers: HEADERS_URI,
      
      body: JSON.stringify({
        id: id,
        name: inputNameUpdate.value,
          description: inputDescription.value,
          public_price: inputPrice.value,
          image: images,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          goToPage("../../../views/store/stores.html");
          NotifyService.notificatonSuccess('Tienda actualizada correctamente')
        NotifyService.loadingNotificationRemove()
        } else {
          NotifyService.notificatonError('Error al actualizar');
        }
      });
  }

  function validateForm(){
    return(
        inputUpdateName.value !== "" &&
        inputUpdatePrice.value !== "" &&
        inputUpdateDescription.value !== "" &&
        images.length !== 0
    );
  }
  
  function updateProduct(e) {
    e.preventDefault();
    if (validateForm()) saveProduct();
    else NotifyService.notificatonError("Los campos no deben estar vacios");
  }