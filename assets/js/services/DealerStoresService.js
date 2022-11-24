import {API_URI, HEADERS_URI} from "./API.js";
import {getUser} from "../utils/LocalStorage.js";
import NotifyService from "../utils/NotifyService.js";

const totalStores = document.getElementById("totalStores");

const user = getUser();
getData()

function getData() {
    NotifyService.loadingNotification()
    fetch(API_URI + `/users/stores/${user.id}`, {
        method: "GET",
        headers: HEADERS_URI,
    })
        .then((response) => response.json())
        .then((data) => {
            NotifyService.loadingNotificationRemove()
            totalStores.innerHTML = `<span class="fw-bold fs-3" >
            ${data.data.length === 0 ? "No tienes registrada alguna tienda" : +data.data.length + " tiendas"} </span>`;
            let card = document.getElementById("stores");
            if (data.data.length === 0) {
                card.innerHTML = `<p class="card  py-5 bg-light  text-primary text-center">No tienes tiendas registradas</p>`;
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
                  <div class="col-12 my-4">
                      <a href="../orders/register_order.html?id=${store.id}" class="btn btn-primary col-12">
                          <i class="fas fa-file-signature me-2"></i>
                          Realizar Orden
                      </a>
                  </div>
                  <div class="d-flex justify-content-between my-3 mt-4">
                      <a href="../orders/orders.html?id=${store.id}" class="btn btn-outline-auxiliar">
                          <i class="fas fa-history me-2"></i>
                          Ver ordenes
                      </a>
                      <a href="../orders/register_visit.html?id=${store.id}" class="btn btn-outline-secondary">
                          <i class="fas fa-walking me-2"></i>
                          Agregar Visita
                      </a>
                  </div>
              </div>
              <div class="card-body border-top bg-light p-4">
                  <div class="d-flex justify-content-center">
                      <a href='../store/edit_store.html?id=${store.id}'  class="btn btn-info">
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


