import { API_URI, HEADERS_URI } from "./API.js";
import { goToPage } from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";

const registerForm = document.querySelector('#registerForm') || document.createElement('form');
const inputName = document.querySelector('#name') || document.createElement('input');
const inputPhone = document.querySelector('#phone') || document.createElement('input');
const inputAddress = document.querySelector('#address') || document.createElement('input');
const inputZipcode = document.querySelector('#zipcode') || document.createElement('input');
const inputOwner = document.querySelector('#owner') || document.createElement('input');

const inputStores = document.getElementById("inputStores");


registerForm.addEventListener('submit', validInputsRegister);

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get('id');

let allStores = []
let filterStores = []

inputStores.addEventListener('keyup',e => {
    if (e.target.value.length > 0) {
        filterStores = allStores.filter(store => store.name.toLowerCase().includes(e.target.value.toLowerCase()))
        renderStores(filterStores)
    } else {
        renderStores(allStores)
    }
})

const totalStores = document.getElementById("totalStores");

getStores();

//Obtener Tiendas
function getStores() {
  NotifyService.loadingNotification();
  fetch(API_URI + '/stores', {
    method: "GET",
    headers: HEADERS_URI,
  })
  .then((response) => response.json())
        .then((data) => {
            NotifyService.loadingNotificationRemove()
            allStores = data.data;
            renderStores(allStores)
        })
        .catch((err) => {
            NotifyService.loadingNotificationRemove()
            NotifyService.notificatonError('Ha ocurrido un error al cargar los datos')
        });
}

function validInputsRegister(e) {
    e.preventDefault();
 
    if (
      [
        inputName.value,
        inputPhone.value,
        inputAddress.value,
        inputZipcode.value,
        inputOwner.value,
      ].includes("")
    ) {
      NotifyService.notificatonError('Todos los campos son obligatorios')
      return true;
    } else {
      registerStore();
    }
}    

async function registerStore() {
    fetch(API_URI+'/stores', {
      method: "POST",
      headers: HEADERS_URI,
      body: JSON.stringify({
        name: inputName.value,
        phone: inputPhone.value,
        address: inputAddress.value,
        zipcode: inputZipcode.value,
        owner: inputOwner.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          goToPage("../../../views/store/stores.html");
          NotifyService.notificatonSuccess('Tienda registrada correctamente')
          NotifyService.loadingNotificationRemove()
        } else {
          NotifyService.notificatonError('Error al registrar');
        }
      });
  }
  

function renderStores(myStores) {
    totalStores.innerHTML = `<span class="fw-bold fs-3" >
            ${allStores.length === 0 ? "No tienes registrada alguna tienda" : +allStores.length + " tiendas"} </span>`;
    let card = document.getElementById("adminStores")
    if (myStores.length === 0) {
        card.innerHTML = `<p class="text-primary text-center">No tienes tiendas registradas</p>`;
    }else {
        card.innerHTML = "";
    }
    myStores.forEach((store) => {
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
                      <button type="submit" id="btnEliminar" class="btn btn-outline-auxiliar" onclick="deleteStore(${store.id})">
                          <i class="fas fa-trash me-2"></i>
                          Eliminar tienda
                      </button>
                     <a href='../../../views/store/edit_store.html?id=${store.id}' class="btn btn-info">
                          <i class="fas fa-info-circle me-2"></i>
                          Ver detalles
                      </a>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-center">
                    <a href='../../../views/store/asign_dealers.html?id=${store.id}' class="btn btn-primary">
                    <i class="fas fa-user-friends me-2"></i>
                    Ver repartidores
                    </a>
                  </div>
              </div>
          </div>
          </div>`;  
    });
    
}

function deleteStore(id) {
    Notiflix.Confirm.show(
        'Confirmación',
        '¿Estás seguro de eliminar la tienda?',
        'Sí, eliminar',
        'No, cancelar',
        () => {
            removeStore(id)
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

function removeStore(id) {
    NotifyService.loadingNotification();
    fetch(`${API_URI}/stores/${id}`, {
        method: "DELETE",
        headers: HEADERS_URI,
    })
        .then((response) => {
            NotifyService.loadingNotificationRemove();
            if (response.status === 200) {
                NotifyService.notificatonSuccess("Tienda eliminada correctamente");
                goToPage("../../../views/store/stores.html")
            } else {
                NotifyService.notificatonError("Error al eliminar la tienda");
            }
        })
        .catch((err) => {
            NotifyService.loadingNotificationRemove();
            NotifyService.notificatonError("Ha ocurrido un error");
        });
}

window.deleteStore = deleteStore;