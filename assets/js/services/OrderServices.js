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

let nameStore = "";

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get("id");

const user = getUser();

getData();
getOrdersByStore();

function getData() {
    NotifyService.loadingNotification();
    fetch(API_URI + `/stores/${id}`, {
        method: "GET",
        headers: HEADERS_URI,
    })
        .then((response) => response.json())
        .then((data) => {
            NotifyService.loadingNotificationRemove();
            nameStore = data.data.name;
            name.innerHTML = `<p class="fw-bold fs-5 text-auxiliar">${data.data.name}</p>`;
            phone.innerHTML = `<a class="text-secondary" href="tel:${data.data.phone}"><i class="fas fa-phone me-2 "></i>${data.data.phone}</a>`;
            address.innerHTML = `<i class="fas fa-map-marker-alt me-2"></i>${data.data.address + " CP " + data.data.zipcode}</span>`;
            openAddress.innerHTML =
                `<a href="http://maps.google.com/?q=${data.data.address + " " + data.data.zipcode}" target="_blank" class="btn btn-outline-primary font-bold">Abrir en Google Maps</a>`;
        })
        .catch((err) => {
            NotifyService.loadingNotificationRemove();
            NotifyService.notificatonError(
                "Ha ocurrido un error al cargar los datos"
            );
        });
}

function getOrdersByStore() {
    NotifyService.loadingNotification();
    fetch(API_URI + `/stores/orders/${id}`, {method: "GET", headers: HEADERS_URI,})
        .then((response) => response.json())
        .then((data) => {
            NotifyService.loadingNotificationRemove();
            if (data.data.length === 0) card.innerHTML = `<p class="text-primary text-center">La tienda no cuenta con ordenes registradas.</p>`;
            ordersVisit = data.data.filter((order) => order.status.name === "VISITADA");
            ordersInProcess = data.data.filter((order) => order.status.name === "PROCESO");
            ordersFinished = data.data.filter((order) => order.status.name === "FINALIZADA");


            if (ordersVisit.length === 0) {
                cardVisit.innerHTML = `
        <div class="col-12  fs-4 text-primary text-center">
            <div class="card py-5">No tienes ordenes registradas</div>
        </div>`;
            } else {
                cardVisit.innerHTML = "";
            }

            if (ordersInProcess.length === 0) {
                cardInProcess.innerHTML = `
        <div class="col-12  fs-4 text-primary text-center">
            <div class="card py-5">No tienes ordenes en proceso</div>
        </div>`;
            } else {
                cardInProcess.innerHTML = "";
            }

            if (ordersFinished.length === 0) {
                cardFinished.innerHTML = `
        <div class="col-12  fs-4 text-primary text-center">
            <div class="card py-5">No tienes ordenes finalizadas</div>
        </div>`;
            } else {
                cardFinished.innerHTML = "";
            }


            ordersVisit.forEach((order) => {
                cardVisit.innerHTML += `
                        <div class="col-xl-4 col-lg-6 col-md-12 mb-3">
                    <div class="card ">
                        <div class="card-header  ">
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
                        <div class="card-body border-top d-flex align-content-center p-3 ">
                            <div class="col-12 d-flex justify-content-around ">
                                <a href="../../views/orders/visit_details.html?id=${order.id}" class="btn btn-outline-secondary">Ver
                                    Detalles
                                    <i class="fas fa-chevron-right ms-2"></i>
                                </a>
                                <button type="button" class="btn btn-outline-danger" onclick="deleteOrder(${order.id})">Eliminar Visita
                                    <i class="fas fa-trash ms-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                     `;
            });


            ordersInProcess.forEach((order) => {
                cardInProcess.innerHTML += `  
                    <div class="col-xl-4 col-lg-6 col-md-12 mb-3">
                    <div class="card">
                        <div class="card-header">
                            <div class="d-flex align-items-start">
                                <div class="d-flex align-items-center">
                                    <div class="avatar me-3">
                                        <i class="fas fa-info-circle text-primary fs-1"></i>
                                    </div>
                                    <div class="me-2">
                                        <h5 class="mb-1 text-primary font-bold">Folio:
                                            <span class="text-body fw-normal">${
                    order.folio
                }</span>
                                        </h5>
                                        <div class="client-info d-flex align-items-center">
                                            <h6 class="mb-0 me-1 font-bold">Tienda:</h6>
                                            <span class="fw-normal">${nameStore}</span>
                                        </div>
                                        <span class="badge bg-auxiliar mt-2 pt-2">
                                                    EN ${order.status.name}
                                                </span>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-light-secondary p-2 rounded me-auto mt-4 mb-2 text-center border border-auxiliar">
                                        <span>Monto del pedido:</span>
                                        <h6 class="mb-1 fs-5 text-secondary">$${
                    order.total
                } MXN</h6>
                                     </div>
                        </div>
                        
                        <div class="card-body pb-1">
                            <div class="d-flex align-items-center flex-wrap">
                            <div class="text-left mb-3">
                            <ul class="p-0 m-0 mt-1">
                                <li class="d-flex mb-4 pb-1">
                                    <div class="avatar flex-shrink-5 me-3">
                                                <span class="avatar-initial rounded bg-label-primary px-4">
                                                 <i class="fas fa-calendar-check"></i>                                                             
                                                </span>
                                    </div>
                                    <div
                                            class="d-flex w-100 flex-wrap align-items-center justify-content-between ">
                                        <div class="me-2">
                                            <h6 class="mb-0 ">Fecha del pedido:</h6>
                                            <small class="text-muted text-primary">${
                    order.request_date
                }</small>
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
                                            <h6 class="mb-0 text-secondary">Pedido realizado
                                                por:</h6>
                                            <small class="text-muted">${
                    user.name +
                    " " +
                    user.first_surname
                }</small>
                                            <div class="user-progress">
                                                <small class="fw-semibold">${
                    user.phone
                }</small>
                                            </div>
                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>
                            </div>
                              
                        </div>
                        <div class="card-body border-top d-flex align-content-center p-3 ">
                            <div class="col-12 d-flex justify-content-around ">
                            <a href="../../views/orders/order_details.html?id=${
                    order.id
                }" class="btn btn-outline-secondary">Ver
                            Detalles
                                    <i class="fas fa-chevron-right ms-2"></i>
                                </a>
                                <button type="button" class="btn btn-outline-danger" onclick="deleteOrder(${order.id})">Eliminar Orden
                                    <i class="fas fa-trash ms-2"></i>
                                </button>
                            </div>                                                        
                        </div>
                         <div class="card-body border-top d-flex align-content-center p-3">
                            <div class="col-12 d-flex justify-content-center my-3">
                                <button type="button" onclick="confirmFinishOrder(${order.id})" class="p-2 btn btn-success col-12 fs-5">Finalizar Orden
                                    <i class="fas fa-check ms-2 fs-5"></i>
                                </button>                                
                            </div>                                                        
                        </div>
                    </div>
                </div>
                    `;
            });

            ordersFinished.forEach((order) => {
                cardFinished.innerHTML += `   
                    <div class="col-xl-4 col-lg-6 col-md-12 mb-3">
                    <div class="card">
                        <div class="card-header">
                        
                            <div class="d-flex align-items-start">
                                <div class="d-flex align-items-center">
                                    <div class="avatar me-3">
                                        <i class="fas fa-info-circle text-primary fs-1"></i>
                                    </div>
                                    <div class="me-2">
                                        <h5 class="mb-1 text-primary font-bold">Folio:
                                            <span class="text-body fw-normal">${
                    order.folio
                }</span>
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
                            <div class="bg-light-secondary p-2 rounded me-auto mt-3 mb-1 text-center border border-success">
                            <span>Monto total:</span>
                            <h6 class="mb-1 fs-5 text-secondary">$${
                    order.total
                } MXN</h6>
                        </div>
                        </div>
                        <div class="card-body pb-0">
                        <div class="d-flex align-items-center flex-wrap mb-0">
                        <div class="text-left mb-0">
                            <ul class="p-0 m-0 mt-1">
                                <li class="d-flex mb-3 pb-1">
                                    <div class="avatar flex-shrink-5 me-3">
                                        <span class="avatar-initial rounded bg-label-primary px-4">
                                            <i class="fas fa-calendar-day"></i>
                                        </span>
                                    </div>
                                    <div class="d-flex w-100 flex-wrap align-items-center justify-content-between ">
                                        <div class="me-2">
                                            <h6 class="mb-0 ">Fecha de solicitud:</h6>
                                            <small class="text-muted text-primary">${
                    order.created_at
                }</small>
                                        </div>
                                    </div>
                                </li>
                                <li class="d-flex  pb-1">
                                    <div class="avatar flex-shrink-5 me-3">
                                        <span class="avatar-initial rounded bg-label-secondary px-4">
                                            <i class="fas fa-calendar-check"></i>
                                        </span>
                                    </div>
                                    <div class="d-flex w-100 flex-wrap align-items-center justify-content-between ">
                                        <div class="me-2">
                                            <h6 class="mb-0 text-secondary">Fecha de entrega:</h6>
                                            <small class="text-muted">${
                    order.deliver_date
                }</small>
                                        </div>

                                    </div>
                                </li>
                            </ul>                           
                        </div>                       
                    </div>
                    <hr>
                    <div class="d-flex align-items-center flex-wrap mb-3">

                    <div class="text-left">
                            <ul class="p-0 m-0 mt-1">                           
                                <li class="d-flex mb-3 pb-1">
                                    <div class="avatar flex-shrink-5 me-3">
                                                <span class="avatar-initial rounded bg-label-auxiliar px-4">
                                                    <i class="fas fa-truck"></i>
                                                </span>
                                    </div>
                                    <div
                                            class="d-flex w-100 flex-wrap align-items-center justify-content-between ">
                                        <div class="me-2">
                                            <h6 class="mb-0 text-auxiliar">Entrega realizada por:</h6>
                                            <small class="text-muted">${
                    user.name +
                    " " +
                    user.first_surname
                }</small>
                                        </div>
                                        <div class="user-progress">
                                            <small class="fw-semibold">${
                    user.phone
                }</small>
                                        </div>
                                    </div>
                                </li>
                                <li class="d-flex pb-1">
                                    <div class="avatar flex-shrink-5 me-3">
                                                <span class="avatar-initial rounded bg-label-info px-4">
                                                    <i class="fas fa-sign-in-alt"></i>
                                                </span>
                                    </div>
                                    <div
                                            class="d-flex w-100 flex-wrap align-items-center justify-content-between">
                                        <div class="me-2">
                                            <h6 class="mb-0 text-info">Entrega recibida
                                                por:</h6>
                                            <small class="text-muted">${
                    order.received_by
                }</small>
                                        </div>
                                        <div class="user-progress">
                                            <small class="fw-semibold">${
                    order.store.phone
                }</small>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            </div>
                            </div>
                        </div>
                        <div class="card-body border-top d-flex align-content-center p-3 ">
                            <div class="col-12 d-flex justify-content-around ">
                            <a href="../../views/orders/order_details.html?id=${order.id}" class="btn btn-outline-secondary">Ver
                            Detalles
                                    <i class="fas fa-chevron-right ms-2"></i>
                                </a>
                                <button type="button" class="btn btn-outline-danger" onclick="deleteOrder(${order.id})">Eliminar Orden
                                    <i class="fas fa-trash ms-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>         
                    `;
            });
        })
        .catch((err) => {
            NotifyService.loadingNotificationRemove();
            NotifyService.notificatonError(
                "Ha ocurrido un error al cargar los datos"
            );
        });
}


function confirmFinishOrder(id) {
    Notiflix.Confirm.show(
        'Confirmación',
        '¿Estás seguro de completar la oden?',
        'Sí, completar',
        'No, cancelar',
        () => {
            finishOrder(id)
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

function deleteOrder(id) {
    Notiflix.Confirm.show(
        'Confirmación',
        '¿Estás seguro de eliminar la orden?',
        'Sí, eliminar',
        'No, cancelar',
        () => {
            removeOrder(id)
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


function finishOrder(id) {
    NotifyService.loadingNotification();
    fetch(`${API_URI}/orders/finished/${id}`, {
        method: "GET",
        headers: HEADERS_URI,
    })
        .then((response) => {
            NotifyService.loadingNotificationRemove();
            if (response.status === 200) {
                NotifyService.notificatonSuccess("Orden completada con éxito");
                getOrdersByStore()
            } else {
                NotifyService.notificatonError("Ha ocurrido un error");
            }
        })
        .catch((err) => {
            NotifyService.loadingNotificationRemove();
            NotifyService.notificatonError("Ha ocurrido un error");
        });
}

function removeOrder(id) {
    NotifyService.loadingNotification();
    fetch(`${API_URI}/orders/${id}`, {
        method: "DELETE",
        headers: HEADERS_URI,
    })
        .then((response) => {
            NotifyService.loadingNotificationRemove();
            if (response.status === 200) {
                NotifyService.notificatonSuccess("Orden eliminada con exito");
                getOrdersByStore()
            } else {
                NotifyService.notificatonError("Ha ocurrido un error");
            }
        })
        .catch((err) => {
            NotifyService.loadingNotificationRemove();
            NotifyService.notificatonError("Ha ocurrido un error");
        });
}

window.deleteOrder = deleteOrder;
window.confirmFinishOrder = confirmFinishOrder;