import { API_URI, HEADERS_URI } from "./API.js";
import { goToPage } from "../utils/Routes.js";
import AdminRegisterStore from "./AdminRegisterStore.js";
import NotifyService from "../utils/NotifyService.js";

const registerForm = document.querySelector('#registerForm') || document.createElement('form');
const inputName = document.querySelector('#name') || document.createElement('input');
const inputPhone = document.querySelector('#phone') || document.createElement('input');
const inputAddress = document.querySelector('#address') || document.createElement('input');
const inputZipcode = document.querySelector('#zipcode') || document.createElement('input');
const inputOwner = document.querySelector('#owner') || document.createElement('input');

const updateForm = document.querySelector('#updateForm') || document.createElement('form');
const inputUpdateName = document.querySelector('#name') || document.createElement('input');
const inputUpdatePhone = document.querySelector('#phone') || document.createElement('input');
const inputUpdateAddress = document.querySelector('#address') || document.createElement('input');
const inputUpdateZipcode = document.querySelector('#zipcode') || document.createElement('input');
const inputUpdateOwner = document.querySelector('#owner') || document.createElement('input');

registerForm.addEventListener('submit', register);
updateForm.addEventListener('submit', update);

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get('id');

const totalStores = document.getElementById("totalStores");

function validInputs() {
  return inputName.value !== '' || inputPhone.value !== '' || inputAddress.value !== '' || inputZipcode.value !== '' || inputOwner.value !== ''
}

function validInputsUpdate(){
    return inputUpdateName.value != '' || inputUpdatePhone.value !== '' || inputUpdateAddress.value !== '' || inputUpdateZipcode.value !== '' || inputUpdateOwner.value !== ''
}


function sendStoreRequest() {
    NotifyService.loadingNotification()
    AdminRegisterStore.RegisterStore(inputName.value, inputPhone.value, inputAddress.value, inputZipcode.value, inputOwner.value)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                let store = data.data;
                setData('store', JSON.stringify(store))
                NotifyService.notificatonError('Registro Exitoso')
                NotifyService.loadingNotificationRemove()
            } else {
                NotifyService.notificatonError('Error al registrar la Tienda')
                NotifyService.loadingNotificationRemove()
            }
        }).catch(error => {
        NotifyService.notificatonError('Hubo un error en el servicio')
        NotifyService.loadingNotificationRemove()
    });
  }
  
  function register(e) {
    e.preventDefault();
    if (validInputs()) sendStoreRequest();
    else NotifyService.notificatonError('Los campos no deben estar vacios');
  }

getStores();

//Obtener Tiendas
function getStores() {
  NotifyService.loadingNotification();
  fetch(API_URI + `/stores`, {
    method: "GET",
    headers: HEADERS_URI,
  })
  .then((response) => response.json())
        .then((data) => {
            NotifyService.loadingNotificationRemove()
            totalStores.innerHTML = `<span class="fw-bold fs-3" >
            ${data.data.length === 0 ? "No tienes registrada alguna tienda" : +data.data.length + " tiendas"} </span>`;
            let card = document.getElementById("adminStores")
            if (data.data.length === 0) {
                card.innerHTML = `<p class="text-primary text-center">No tienes tiendas registradas</p>`;
            }
            data.data.forEach((store) => {
                card.innerHTML += `
              <div class="col-xl-4 col-lg-6 col-md-6">
              <div class="card">
              <div class="card-header">
                  <div class="d-flex align-items-start">
                      <div class="d-flex align-items-center">
                          <div class="avatar me-3">
                              <i class="fas fa-store text-primary fs-3"></i>
                          </div>
                          <div class="me-2">
                              <h5 class="mb-1 ">${store.name} </h5>
                              <div class="client-info d-flex align-items-center">
                                      <span>
                                          <i class="fas fa-phone me-2"></i>
                                          ${store.phone}</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-body">
                  <ul class="p-0 m-0">
                      <li class="d-flex mb-4 pb-1">
                          <div class="avatar flex-shrink-5 me-3">
                                  <span class="avatar-initial rounded bg-label-auxiliar px-3">
                                      <i class="fas fa-user"></i>
                                  </span>
                          </div>
                          <div
                                  class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div class="me-2">
                                  <h6 class="mb-0 text-auxiliar">Dueño</h6>
                                  <small class="text-muted">${store.owner}</small>
                              </div>
                          </div>
                      </li>
                  </ul>
                  <div class="bg-light-secondary p-3 rounded me-auto mb-3">
                      <h6>Dirección:</h6>
                      <span class="fs-6 text-secondary">${store.address}
                          </span>
                  </div>
                  <div class="d-flex justify-content-between my-3 mt-4">
                      <button type="submit" id="eliminar" class="btn btn-outline-auxiliar">
                          <i class="fas fa-trash me-2"></i>
                          Eliminar 
                      </button>
                      <a href="../../../views/store/register_store.html?=id=${store.id}" class="btn btn-outline-secondary">
                          <i class="fas fa-store me-2"></i>
                          Agregar Tienda
                      </a>
                  </div>
              </div>
              <div class="card-body border-top bg-light p-4">
                  <div class="d-flex justify-content-center">
                      <a href='../../../views/store/edit_store.html?id=${store.id}' class="btn btn-info">
                          <i class="fas fa-info-circle me-2"></i>
                          Ver detalles
                      </a>
                  </div>
              </div>
          </div>
          </div>`;

            });
            
        })
        .catch((err) => {
            NotifyService.loadingNotificationRemove()
            NotifyService.notificatonError('Ha ocurrido un error al cargar los datos')
        });
}

function updateStore(){
    NotifyService.loadingNotification()
    AdminRegisterStore.UpdateStore(id.value, inputUpdateName.value, inputUpdatePhone.value, inputUpdateAddress.value, inputUpdateZipcode.value, inputUpdateOwner.value)
    fetch(API_URI + `/stores`,{
        method: "PUT",
        headers: HEADERS_URI,
    })
    .then((response) => response.json())
    .then(data => {
        console.log(data)
        if (data.success) {
            let storeUpdate = data.data;
            setData('store', JSON.stringify(storeUpdate))
            NotifyService.notificatonError('Registro Actualizado')
            NotifyService.loadingNotificationRemove()
        } else {
            NotifyService.notificatonError('Error al actualizar la Tienda')
            NotifyService.loadingNotificationRemove()
        }
    }).catch(error => {
    NotifyService.notificatonError('Hubo un error en el servicio')
    NotifyService.loadingNotificationRemove()
    })
}

function update(e) {
    e.preventDefault();
    if (validInputsUpdate()) updateStore();
    else NotifyService.notificatonError('Los campos no deben estar vacios');
  }

  
function deleteStore() {
    NotifyService.loadingNotification()
    fetch(API_URI + `/stores/${id}`,{
      method: "DELETE",
      headers: HEADERS_URI,
    })
      .then((respuesta) => respuesta.json())
      .then((data) => {
        if (data.success == true) {
          NotifyService.notificatonError('Eliminación Exitosa')
          NotifyService.loadingNotificationRemove()
          goToPage("../../../views/store/stores.html");
        } else {
          NotifyService.notificatonError('Error al Eliminar')
          NotifyService.loadingNotificationRemove()
          goToPage("../../../views/store/stores.html");
        }
      })
  
      .catch((error) => {
        NotifyService.notificatonError('Hubo un error en el servicio')
        NotifyService.loadingNotificationRemove()
      });
  }
