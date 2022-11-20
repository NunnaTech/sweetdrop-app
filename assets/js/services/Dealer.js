//Importaciones
import { API_URI, HEADERS_URI } from "./API.js";
import { getToken, setData } from "../utils/LocalStorage.js";
import { goToPage } from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";

const form = document.querySelector("#formulario") || document.createElement('form');
//Form
const nombreU = document.getElementById("nombreU");
const paternoU = document.getElementById("paternoU");
const maternoU = document.getElementById("maternoU");
const phoneU = document.getElementById("phoneU");
const emailU = document.getElementById("emailU");

//Para pintar la card
const contenedor = document.getElementById("content-page");
 
form.addEventListener("submit", validarFormulario);


//Validar Formulario de Registro de Repartidor
 function validarFormulario(e) {
   e.preventDefault();

   if (
     [
       nombreU.value,
       paternoU.value,
       maternoU.value,
       phoneU.value,
       emailU.value,
     ].includes("")
   ) {
     NotifyService.notificatonError('Todos los campos son obligatorios')
     return true;
   } else {
     agregarDealer();
   }
 }
getDealers();

//Obtener Repartidores
function getDealers() {
  NotifyService.loadingNotification();
  fetch(API_URI + "/roles/users/dealers", {
    method: "GET",
    headers: HEADERS_URI,
    Authorization: `Bearer 11| ${getToken()}`
  })
    .then((response) => response.json())
    .then((data) => mostrar(data))
    .catch((err) => {
      
      NotifyService.loadingNotificationRemove();
    });
  const mostrar = (dealers) => {
    NotifyService.loadingNotificationRemove();
    dealers.data.forEach((dealer) => {
     
       
      contenedor.innerHTML +=  `
      <div class="col-xl-4 col-lg-6 col-md-6">
          <div class="card">
              <div class="card-header">
                  <div class="d-flex align-items-start">
                      <div class="d-flex align-items-center">
                          <div class="avatar me-3">
                              <i class="fas fa-truck-moving text-primary fs-3"></i>
                          </div>
                          <div class="me-2">
                              <h5 class="mb-1 ">${dealer.name} ${dealer.first_surname} ${dealer.second_surname}
                              </h5>
                              <div class="dealer-info d-flex align-items-center">
                                  <span>
                                      <i class="fas fa-phone me-2"></i>
                                      777 134 23 99</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-body">
                  <ul class="p-0 m-0">
                      <li class="d-flex mb-4 pb-1">
                          <div class="avatar flex-shrink-5 ms-4">
                              <span class="avatar px-3">
                                  <i class="fas fa-envelope"></i>
                              </span>
                          </div>
                          <div
                              class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div class="me-2">
                                  <h6 class="mb-0 text-auxiliar">${dealer.email}</h6>
                              </div>
                          </div>
                      </li>
                  </ul>
                  <div class="d-flex justify-content-between my-3 mt-4">
                      <a href="../dealers/dealers.html?id=${dealer.id}" class="btn btn-outline-danger">
                          <i class="fas fa-trash me-2"></i>
                          Eliminar
                      </a>
                      <a href="../dealers/edit_dealer.html?id=${dealer.id}" class="btn btn-outline-secondary">
                          <i class="fas fa-pen me-2"></i>
                          Ver Detalle
                      </a>
                  </div>
              </div>

          </div>
      </div> `
        
    
      
    });
  };
}
//End Consulta

//Registrar Repartidor
async function agregarDealer() {
    fetch(API_URI+'/users/dealers', {
       method: "POST",
      headers: HEADERS_URI,
      body: JSON.stringify({
      name: nombreU.value,
      first_surname: paternoU.value,
      second_surname: maternoU.value,
      phone: phoneU.value,
      email: emailU.value,
       }),
    })
    .then((response) => response.json())
    .then((data) => {
       if (data.success === true) {
         goToPage("../../views/dealers/dealers.html");
        } else {
         NotifyService.notificatonError('No se registro correctamente!')
      }
      });
  }



