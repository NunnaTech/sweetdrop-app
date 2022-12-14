import {API_URI, HEADERS_URI} from "./API.js";
import {getUser} from "../utils/LocalStorage.js";
import NotifyService from "../utils/NotifyService.js";

const storeId = document.getElementById("storeId");
const name = document.querySelector("#name");
const phone = document.querySelector("#phone");
const address = document.querySelector("#address");
const status = document.querySelector("#status");
const folio = document.querySelector("#folio");
const folioNote = document.querySelector("#folioNote");
const folioFixed = document.querySelector("#folioFixed");
const nameFixed = document.querySelector("#nameFixed");
const addressFixed = document.querySelector("#addressFixed");
const phoneFixed = document.querySelector("#phoneFixed");
const storeNote = document.querySelector("#storeNote");
const statusNote = document.querySelector("#statusNote");
const requestDate = document.querySelector("#requestDate");
const deliverDate = document.querySelector("#deliverDate");
const totalOrder = document.querySelector("#totalOrder");
const deliveredBy = document.querySelector("#deliveredBy");
const deliveredByPhone = document.querySelector("#deliveredByPhone");
const receivedBy = document.querySelector("#receivedBy");
const receivedByPhone = document.querySelector("#receivedByPhone");
const productsOrder = document.querySelector("#productsOrder");
const observations = document.querySelector("#observations");
const observationsImage = document.querySelector("#observationsImage");
const imageModal = document.querySelector("#imageModal");

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get("id");
const user = getUser();

let productsOrdersArray = [];
let observationsArray = [];
let imagesArray = [];

getOrderDetails();

function getOrderDetails() {
    NotifyService.loadingNotification();
    fetch(API_URI + `/orders/${id}`, {
        method: "GET",
        headers: HEADERS_URI,
    })
        .then((response) => response.json())
        .then((order) => {
            NotifyService.loadingNotificationRemove();
            storeId.innerHTML = `<a href="../orders/orders.html?id=${order.data.store_id}">Historial de ordenes</a>`;
            folioFixed.innerHTML = `Folio: ${order.data.folio}`;
            nameFixed.innerHTML = order.data.store.name;
            phoneFixed.innerHTML = `<i class="fas fa-phone me-2 "></i>${order.data.store.phone}`;
            addressFixed.innerHTML = `<i class="fas fa-map-marker-alt me-2 "></i>${order.data.store.address}`;

            folioNote.innerHTML = `Folio: <span class="text-body fw-normal">${order.data.folio}</span>`;
            storeNote.innerHTML = `Tienda: <span class="text-body fw-normal">${order.data.store.name}</span>`;

            if (order.data.status.name === "FINALIZADA") {
                statusNote.innerHTML = `<span class="badge bg-success mt-2">${order.data.status.name}</span>`;
            } else {
                statusNote.innerHTML = `<span class="badge bg-auxiliar mt-2">EN ${order.data.status.name}</span>`;
            }

            requestDate.innerHTML = `
       <h6 class="mb-0">Fecha de solicitud:</h6>
       <small class="text-muted">${order.data.request_date}</small>
       `;

            if (order.data.deliver_date !== null) {
                deliverDate.innerHTML = `
        <h6 class="mb-0 text-secondary">Fecha de  entrega:</h6>
        <small class="text-muted">${order.data.deliver_date}</small>
        `;
            } else {
                deliverDate.innerHTML = `
        <h6 class="mb-0 text-secondary">Fecha de  entrega:</h6>
        <small class="text-muted">La orden aún no ha sido entregada.</small>
        `;
            }

            totalOrder.innerHTML = `$${order.data.total} MXN`;

            if (order.data.status.name === "FINALIZADA") {
                deliveredBy.innerHTML = `
        <h6 class="mb-0 text-auxiliar">Entrega realizada por:</h6>
         <small class="text-muted">${
                    order.data.delivered.name + " " + order.data.delivered.first_surname
                }</small>
        `;
            } else {
                deliveredBy.innerHTML = `
        <h6 class="mb-0 text-auxiliar">La entrega se realizará por:</h6>
         <small class="text-muted">${
                    order.data.delivered.name + " " + order.data.delivered.first_surname
                }</small>
        `;
            }
            deliveredByPhone.innerHTML = order.data.delivered.phone;

            if (order.data.status.name === "FINALIZADA") {
                receivedBy.innerHTML = `
            <h6 class="mb-0 text-info">Entrega recibida por:</h6>
            <small class="text-muted">${order.data.received_by}</small>
            `;
            } else {
                receivedBy.innerHTML = `
            <h6 class="mb-0 text-info">La entrega será recibida por:</h6>
            <small class="text-muted">${order.data.received_by}</small>
            `;
            }
            receivedByPhone.innerHTML = order.data.store.phone;

            folio.innerHTML = `Folio: ${order.data.folio}`;
            name.innerHTML = `<p class="fw-bold fs-5 text-auxiliar">${order.data.store.name}</p>`;
            phone.innerHTML = `<a class="text-secondary" href="tel:${order.data.store.phone}"><i class="fas fa-phone me-2 "></i>${order.data.store.phone}</a>`;
            address.innerHTML = `<i class="fas fa-map-marker-alt me-2"></i>${
                order.data.store.address + " CP " + order.data.store.zipcode
            }</span>`;

            if (order.data.status.name === "FINALIZADA") {
                status.innerHTML = `<span class="badge bg-success mt-3"> ${order.data.status.name}</span>`;
            } else {
                status.innerHTML = `<span class="badge bg-auxiliar mt-3"> EN ${order.data.status.name}</span>`;
            }

            for (let i = 0; i < order.data.sales.length; i++) {
                productsOrdersArray.push(
                    `
        <div class="col-xl-4 col-lg-6 col-md-6">
        <div class="card mb-3 bg-light">
            <div class="row g-0">
                <div
                   class="col-md-4 d-flex align-items-center justify-content-center pt-4 pb-1">
                    <img class="card-img card-img-left img-fluid w-75 h-auto product-image"
                        src="${order.data.sales[i].product.image}"
                        alt="Product image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title mb-0">${order.data.sales[i].product.name}</h5>
                        <small>SKU: ${order.data.sales[i].product.sku}</small>
                        <p class="text-auxiliar mt-3">
                            Cantidad: <span class="text-muted">${order.data.sales[i].quantity} pza(s)</span>
                        </p>
                        <p class="card-text text-auxiliar ">
                            Precio unitario: <span
                                class="text-muted">$${order.data.sales[i].product.price}.00</span>
                        </p>
                        <p class="card-text text-primary fw-bolder">
                            Precio total: <span
                                class="text-muted">$${order.data.sales[i].total}.00</span>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </div> 
        `
                );

                productsOrder.innerHTML = productsOrdersArray.join("");
            }

            if (order.data.observations.length > 0) {
                for (let i = 0; i < order.data.observations.length; i++) {
                    observationsArray.push(
                        `
              <p>${order.data.observations[i].comment}</p>
              `
                    );

                    if (order.data.observations[i].images.length > 0) {
                        imagesArray.push(
                            `
              <img class="img-responsive"
              src="${order.data.observations[i].images[i].image}"
              alt="Imágen de la observación">
              `
                        );
                    } else {
                        imagesArray.push('<p>No hay imágen</p>');
                    }


                    observations.innerHTML = observationsArray.join("");
                    imageModal.innerHTML = imagesArray.join("");
                    observationsImage.innerHTML = imagesArray.join("");
                }
            } else {
                observations.innerHTML = `<p class="text-secondary">No se registraron observaciones en esta visita.</p>`;
                imgContainer.style.display = "none";
            }
        })
        .catch((err) => {
            NotifyService.loadingNotificationRemove();
            NotifyService.notificatonError(
                "Ha ocurrido un error al cargar los datos"
            );
        });
}
