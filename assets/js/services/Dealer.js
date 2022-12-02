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

   if ([
    nombreU.value,
    paternoU.value,
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
                              <h5 class="mb-1 ">${dealer.name} ${dealer.first_surname} 
                              ${dealer.second_surname === null ? "":""}
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
                      <a class="btn btn-outline-danger" id="${dealer.id}"  id="btnDelete">
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
    })
    dealers.data.forEach((i) => {
      let id =document.getElementById(`${i.id}`);
        id.onclick =()=> {
         deleteDealer(id.id)
             }
  });
}
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
         showPassword(data.data.rawPassword);
        } else {
         NotifyService.notificatonError('No se registro correctamente!')
      }
      });
  }

function showPassword(data){

  showModal(data);

}

var modalWrap = null;


function showModal (data){
  if (modalWrap !== null) {
    modalWrap.remove();
  }
  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="staticBackdropLabel" style="text-align:center;width:900px">Contraseña</h3>
        <button type="button" onclick="redirection()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body row" >
      <div class="col-3"></div>
      <h4 class="col-6" style="text-align:center;width:800px;">Esta es tu contraseña!</h5>
      </div>
      <div class="modal-body row" >
      <div class="col-3"></div>
      <h1 class="col-6" style="text-align:center;width:950px;">${data}</h1>
      </div>
      <div class="modal-footer">
        <button type="button" onclick="redirection()" class="btn" style="color:#f8f9fa;background-color:#54d37a">Aceptar</button>
      </div>
    </div>
  </div>
</div>
  `





  document.body.append(modalWrap);

  var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
 
  modal.show();

}




//Eliminar Repartidor
function deleteDealer(id) {
  Notiflix.Confirm.show(
      'Confirmación',
      '¿Estás seguro de eliminar al Repartidor?',
      'Sí, eliminar',
      'No, cancelar',
      () => {
          eliminarDealer(id)
      },
      () => {
      },
      {
          titleColor: '#5D51B4',
          okButtonColor: '#f8f9fa',
          okButtonBackground: '#54d37a',
          cancelButtonColor: '#f8f9fa',
          cancelButtonBackground: '#f3616d',
      }
  );
}




function eliminarDealer(id) {
  fetch(API_URI+'/users/'+id, {
     method: "DELETE",
     headers: HEADERS_URI,
     
    })
    .then((response) => response.json())
   .then((data) => {
    if (data.success === true) {
      goToPage("../../views/dealers/dealers.html");
     } else {
       NotifyService.notificatonError('No se elimino correctamente!');
      }
      });
     }

     function redirection(){
      goToPage("../../views/dealers/dealers.html");
    }

     window.deleteDealer = deleteDealer;
     window.redirection = redirection;

     

