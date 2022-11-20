import {API_URI, HEADERS_URI} from "./API.js";
import {getUser} from "../utils/LocalStorage.js";
import NotifyService from "../utils/NotifyService.js";

const name = document.getElementById("name");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const openAddress = document.querySelector("#openAddress");
const cardVisit = document.querySelector("#ordersVisit");
const cardInProcess = document.querySelector("#ordersInProcess");
const cardFinished = document.querySelector("#orderFinished");

let ordersVisit = [];
let ordersInProcess = [];
let ordersFinished = [];

let nameStore = '';

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get("id");

const user = getUser();

getData();
getOrdersByStore();

function getData() {
    NotifyService.loadingNotification();
    fetch(API_URI + `/stores/${id}`, {
        method: "GET", headers: HEADERS_URI,
    })
        .then((response) => response.json())
        .then((data) => {
            nameStore = data.data.name;
            NotifyService.loadingNotificationRemove();
            name.innerHTML = `<p class="fw-bold fs-5 text-auxiliar">${data.data.name}</p>`;
            phone.innerHTML = `<i class="fas fa-phone me-2 "></i>${data.data.phone}</span>`;
            address.innerHTML = `<i class="fas fa-map-marker-alt me-2"></i>${data.data.address + " CP " + data.data.zipcode}</span>`;
            openAddress.innerHTML = `<a href="http://maps.google.com/?q=${data.data.address + " " + data.data.zipcode}" target="_blank" class="btn btn-outline-primary font-bold">Abrir en Google Maps</a>`;
        })
        .catch((err) => {
            NotifyService.loadingNotificationRemove();
            NotifyService.notificatonError("Ha ocurrido un error al cargar los datos");
        });
}


function getOrdersByStore() {
    NotifyService.loadingNotification()
    fetch(API_URI + `/stores/orders/${id}`, {
        method: "GET", headers: HEADERS_URI,
    })
        .then((response) => response.json())
        .then((data) => {
            NotifyService.loadingNotificationRemove()

            if (data.data.length === 0) {
                card.innerHTML = `<p class="text-primary text-center">La tienda no cuenta con ordenes registradas.</p>`;
            }

            console.log(data)


            ordersVisit = data.data.filter((order) => order.status.name === "VISITADA");
            ordersInProcess = data.data.filter((order) => order.status.name === "PROCESO");
            ordersFinished = data.data.filter((order) => order.status.name === "FINALIZADA");

            ordersVisit.forEach((order) => {
                cardVisit.innerHTML += `
                        <div class="col-xl-4 col-lg-6 col-md-6">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-light ">
                            <div class="d-flex align-items-start">
                                <div class="d-flex align-items-center">
                                    <div class="avatar me-3">
                                        <i class="fas fa-info-circle text-primary fs-1"></i>
                                    </div>
                                    <div class="me-2">
                                        <h5 class="mb-1 text-primary font-bold">Folio:
                                            <span class="text-body fw-normal">${order.folio}</span>
                                        </h5>
                                        <div class="client-info d-flex align-items-center">
                                            <h6 class="mb-0 me-1 font-bold">Tienda:</h6>
                                            <span class="fw-normal">${nameStore}</span>
                                        </div>
                                        <span class="badge bg-primary mt-2 pt-2">
                                                    ${order.status.name}
                                                </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body pb-0">
                            <div class="d-flex align-items-center flex-wrap">
                                <div class="text-left mb-3">
                                    <ul class="p-0 m-0 mt-1">
                                        <li class="d-flex mb-4 pb-1">
                                            <div class="avatar flex-shrink-5 me-3">
                                                        <span class="avatar-initial rounded bg-label-primary px-4">
                                                         <i class="fas fa-calendar"></i>                                                             
                                                        </span>
                                            </div>
                                            <div
                                                    class="d-flex w-100 flex-wrap align-items-center justify-content-between ">
                                                <div class="me-2">
                                                    <h6 class="mb-0 ">Fecha de visita:</h6>
                                                    <small class="text-muted text-primary">${order.deliver_date}</small>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="d-flex mb-4 pb-1">
                                            <div class="avatar flex-shrink-5 me-3">
                                                        <span class="avatar-initial rounded bg-label-secondary px-4">
                                                         <i class="fas fa-user"></i>                                                             
                                                        </span>
                                            </div>
                                            <div
                                                    class="d-flex w-100 flex-wrap align-items-center justify-content-between ">
                                                <div class="me-2">
                                                    <h6 class="mb-0 text-secondary">Visita realizada
                                                        por:</h6>
                                                    <small class="text-muted">${user.name + " " + user.first_surname}</small>
                                                    <div class="user-progress">
                                                        <small class="fw-semibold">${user.phone}</small>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body border-top bg-light d-flex align-content-center p-3 ">
                            <div class="col-12 d-flex justify-content-around ">
                                <a href="../../views/orders/order_details.html" class="btn btn-outline-secondary">Ver
                                    Detalles
                                    <i class="fas fa-chevron-right ms-2"></i>
                                </a>
                                <a href="#" class="btn btn-outline-danger">Eliminar Visita
                                    <i class="fas fa-trash ms-2"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                     `;
            });
            ordersFinished.forEach((order) => {
                cardFinished.innerHTML += `   
                    <div class="col-xl-4 col-lg-6 col-md-6">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-light ">
                            <div class="d-flex align-items-start">
                                <div class="d-flex align-items-center">
                                    <div class="avatar me-3">
                                        <i class="fas fa-info-circle text-primary fs-1"></i>
                                    </div>
                                    <div class="me-2">
                                        <h5 class="mb-1 text-primary font-bold">Folio:
                                            <span class="text-body fw-normal">${order.folio}</span>
                                        </h5>
                                        <div class="client-info d-flex align-items-center">
                                            <h6 class="mb-0 me-1 font-bold">Tienda:</h6>
                                            <span class="fw-normal">${nameStore}</span>
                                        </div>
                                        <span class="badge bg-success mt-2 pt-2">
                                                    ${order.status.name}
                                                </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body pb-0">
                            <div class="d-flex align-items-center flex-wrap">
                                <div class="text-left mb-3">
                                    <h6 class="mb-1"><i class="fas fa-calendar-day me-1"></i> Fecha de
                                        solicitud: <span class="text-body fw-normal">${order.created_at}</span></h6>
                                    <h6 class="mb-2 mt-4 text-auxiliar"><i
                                            class="fas fa-calendar-check me-2"></i>Fecha de
                                        entrega: <span class="text-body fw-normal">${order.deliver_date}</span>
                                    </h6>
                                </div>
                            </div>
                            <div class="bg-light-secondary p-2 rounded me-auto mb-4 text-center">
                                <span>Monto total:</span>
                                <h6 class="mb-1 fs-5 text-secondary">$${order.total} MXN</h6>
                            </div>
                            <ul class="p-0 m-0">
                                <li class="d-flex mb-4 pb-1">
                                    <div class="avatar flex-shrink-5 me-3">
                                                <span class="avatar-initial rounded bg-label-primary px-3">
                                                    <i class="fas fa-truck"></i>
                                                </span>
                                    </div>
                                    <div
                                            class="d-flex w-100 flex-wrap align-items-center justify-content-between ">
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
                                                <span class="avatar-initial rounded bg-label-secondary px-3">
                                                    <i class="fas fa-sign-in-alt"></i>
                                                </span>
                                    </div>
                                    <div
                                            class="d-flex w-100 flex-wrap align-items-center justify-content-between">
                                        <div class="me-2">
                                            <h6 class="mb-0 text-secondary">Entrega recibida
                                                por:</h6>
                                            <small class="text-muted">${order.received_by}</small>
                                        </div>
                                        <div class="user-progress">
                                            <small class="fw-semibold">${order.store.phone}</small>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="card-body border-top bg-light d-flex align-content-center p-3 ">
                            <div class="col-12 d-flex justify-content-around ">
                                <a href="../../views/orders/order_details.html" class="btn btn-outline-secondary">Ver
                                    Detalles
                                    <i class="fas fa-chevron-right ms-2"></i>
                                </a>
                                <a href="#" class="btn btn-outline-danger">Eliminar Orden
                                    <i class="fas fa-trash ms-2"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>         
                    `

            });
            ordersInProcess.forEach((order) => {
                cardInProcess.innerHTML += `  
                    <div class="col-xl-4 col-lg-6 col-md-6">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-light ">
                            <div class="d-flex align-items-start">
                                <div class="d-flex align-items-center">
                                    <div class="avatar me-3">
                                        <i class="fas fa-info-circle text-primary fs-1"></i>
                                    </div>
                                    <div class="me-2">
                                        <h5 class="mb-1 text-primary font-bold">Folio:
                                            <span class="text-body fw-normal">${order.folio}</span>
                                        </h5>
                                        <div class="client-info d-flex align-items-center">
                                            <h6 class="mb-0 me-1 font-bold">Tienda:</h6>
                                            <span class="fw-normal">${nameStore}</span>
                                        </div>
                                        <span class="badge bg-auxiliar mt-2 pt-2">
                                                    ${order.status.name}
                                                </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body pb-1">
                            <div class="d-flex align-items-center flex-wrap">
                                <div class="text-left mb-3">
                                    <ul class="p-0 m-0 mt-1">                                      
                                        <li class="d-flex mb-0 pb-1">
                                            <div class="avatar flex-shrink-5 me-3">
                                                        <span class="avatar-initial rounded bg-label-secondary px-4">
                                                         <i class="fas fa-calendar-check"></i>                                                             
                                                        </span>
                                            </div>
                                            <div
                                                    class="d-flex w-100 flex-wrap align-items-center justify-content-between ">
                                                <div class="me-2">
                                                    <h6 class="mb-0 text-secondary">Fecha del pedido:</h6>
                                                    <small class="text-muted">${order.request_date}</small>
                                                    <div class="user-progress">
                                                        <small class="fw-semibold">${user.name + " " + user.first_surname}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>                                  
                                </div>
                            </div>
                              <div class="bg-light-secondary p-2 rounded me-auto mb-4 text-center">
                                        <span>Monto total:</span>
                                        <h6 class="mb-1 fs-5 text-secondary">$${order.total} MXN</h6>
                                     </div>
                        </div>
                        <div class="card-body border-top bg-light d-flex align-content-center p-3 ">
                            <div class="col-12 d-flex justify-content-around ">
                                <a href="../../views/orders/order_details.html" class="btn btn-outline-secondary">Ver
                                    Detalles
                                    <i class="fas fa-chevron-right ms-2"></i>
                                </a>
                                <a href="#" class="btn btn-outline-danger">Eliminar Orden
                                    <i class="fas fa-trash ms-2"></i>
                                </a>
                            </div>                                                        
                        </div>
                         <div class="card-body border-top bg-light d-flex align-content-center p-3">
                            <div class="col-12 d-flex justify-content-center my-3">
                                <button class="btn-lg btn-success col-12">Finalizar Orden
                                    <i class="fas fa-check ms-2"></i>
                                </button>                                
                            </div>                                                        
                        </div>
                    </div>
                </div>
                    `
            });


        })
        .catch((err) => {
            NotifyService.loadingNotificationRemove()
            NotifyService.notificatonError('Ha ocurrido un error al cargar los datos')
        });
}



