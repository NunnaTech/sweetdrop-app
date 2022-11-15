import {API_URI, HEADERS_URI} from "./API.js";
import {getUser} from "../utils/LocalStorage.js";
import NotifyService from "../utils/NotifyService.js";

const totalStores = document.getElementById("totalStores");
const totalOrders = document.getElementById("totalOrders");
const name = document.getElementById("name");

const user = getUser();

getData()

function getData() {
    NotifyService.loadingNotification()
    fetch(API_URI + "/dashboard/dealer", {
        method: "GET",
        headers: HEADERS_URI,
    })
        .then((response) => response.json())
        .then((data) => {
            NotifyService.loadingNotificationRemove()
            name.innerHTML = `<span class="font-extrabold"> ${user.name + " " + user.first_surname}.</span>`;
            totalStores.innerHTML = `<span class="fw-bold fs-3" >${data.data.ownStores === 0 ? "No tienes tiendas registradas" : data.data.ownStores + " tiendas"} </span>`;
            if (data.data.ownStores === 0) {
                document.getElementById("viewStores").style.display = "none";
            } else {
                document.getElementById("viewStores").style.display = "block";
            }
            totalOrders.innerHTML = `<span class="fw-bold fs-3" >${data.data.ownOrders === 0 ? "No tienes ordenes registradas" : data.data.ownOrders + " ordenes"} </span>`;

            let card = document.getElementById("ownLastOrders");

            if (data.data.ownLastOrders.length === 0) {
                card.innerHTML = ` <p class="text-primary text-center">No tienes ordenes registradas</p> `;
            }
            data.data.ownLastOrders.forEach((order, index) => {
                card.innerHTML += `
      <div class="carousel-item px-5 px-md-5 ${index === 1 ? "active" : ""}">
        <div class="col px-2">
            <div class="card">
                <div class="card-header bg-light">
                    <div class="d-flex align-items-start">
                        <div class="d-flex align-items-center">
                            <div class="avatar me-3">
                                <i class="fas fa-info-circle text-primary fs-1"></i>
                            </div>
                            <div class="me-2">
                                <h5 class="mb-1 text-danger">Folio:
                                    <span class="text-body fw-normal">${order.folio}</span>
                                </h5>
                                <div class="client-info d-flex align-items-center">
                                    <h6 class="mb-0 me-1">Tienda:</h6><span>${order.store.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light">
                    <div class="d-flex align-items-center flex-wrap">
                        <div class="text-left mb-3">
                            <h6 class="mb-1"><i
                                    class="fas fa-calendar-day me-1 "></i> Fecha de
                                solicitud: <span
                                    class="text-body fw-normal">${order.request_date}</span></h6>
                            <h6 class="mb-2 mt-4 text-success"><i class="fas fa-calendar-check me-2"></i>Fecha de
                                entrega: <span class="text-body fw-normal">${order.deliver_date}</span>
                            </h6>
                        </div>
                    </div>
                    <div class="bg-white p-2 rounded me-auto mb-3 text-center">
                        <span>Monto total:</span>
                        <h6 class="mb-1 fs-5">$${order.total} MXN
                        </h6>
                    </div>
                    <ul class="p-0 m-0">
                        <li class="d-flex mb-4 pb-1">
                            <div class="avatar flex-shrink-5 me-3">
                                <span
                                    class="avatar-initial rounded bg-label-primary px-3">
                                    <i class="fas fa-truck"></i>
                                </span>
                            </div>
                            <div
                                class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div class="me-2">
                                    <h6 class="mb-0">Entrega realizada por:</h6>
                                    <small class="text-muted">${user.name + " " + user.first_surname}</small>
                                </div>
                                <div class="user-progress">
                                    <small class="fw-semibold">${user.phone}</small>
                                </div>
                            </div>
                        </li>
                        <li class="d-flex mb-4 pb-1">
                            <div class="avatar flex-shrink-5 me-3">
                                <span
                                    class="avatar-initial rounded bg-label-secondary px-3">
                                    <i class="fas fa-sign-in-alt"></i>
                                </span>
                            </div>
                            <div
                                class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div class="me-2">
                                    <h6 class="mb-0 text-secondary">Entrega recibida por:</h6>
                                    <small class="text-muted">${order.received_by}</small>
                                </div>
                                <div class="user-progress">
                                    <small class="fw-semibold">${order.store.phone}</small>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="card-body border-top bg-light">
                <div class="row mt-3">
                    <div class="col-12 col-sm-6 ">
                        <a  class="btn btn-success col-12 text-center mb-3 mb-md-0">${order.status.name}</a>
                    </div>
                    <div class="col-12 col-sm-6">
                        <a href="../orders/order_details.html"
                            class="btn btn-outline-secondary col-12">Ver más detalles
                            <i class="fas fa-chevron-right text-secondary ms-2"></i>
                        </a>
                    </div>
                </div>
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

