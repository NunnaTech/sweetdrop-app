import {API_URI, HEADERS_URI} from "./API.js";
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
const observations = document.querySelector("#observations");
const observationsImage = document.querySelector("#observationsImage");
const imageModal = document.querySelector("#imageModal");
const imgContainer = document.querySelector("#imgContainer");

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get("id");

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

            statusNote.innerHTML = `<span class="badge bg-primary mt-2">${order.data.status.name}</span>`;


            requestDate.innerHTML = `<h6 class="mb-0">Fecha de visita:</h6><small class="text-muted">${order.data.request_date}</small>`;

            deliverDate.innerHTML = `<h6 class="mb-0 text-secondary">Visita realizada por:</h6> <small class="text-muted">${order.data.delivered.name}  ${order.data.delivered.first_surname}</small>
        `;
            folio.innerHTML = `Folio: ${order.data.folio}`;
            name.innerHTML = `<p class="fw-bold fs-5 text-auxiliar">${order.data.store.name}</p>`;
            phone.innerHTML = `<a class="text-secondary" href="tel:${order.data.store.phone}"><i class="fas fa-phone me-2 "></i>${order.data.store.phone}</a>`;
            address.innerHTML = `<i class="fas fa-map-marker-alt me-2"></i>${
                order.data.store.address + " CP " + order.data.store.zipcode
            }</span>`;

            status.innerHTML = `<span class="badge bg-primary mt-3">  ${order.data.status.name}</span>`;
            if (order.data.observations.length > 0) {
                for (let i = 0; i < order.data.observations.length; i++) {
                    observationsArray.push(`<p>${order.data.observations[i].comment}</p>`);
                    if (order.data.observations[i].images.length > 0) {
                        imagesArray.push(` <img class="img-responsive" src="${order.data.observations[i].images[i].image}" alt="Imágen de la observación">`);
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
            console.log(err)
            NotifyService.loadingNotificationRemove();
            NotifyService.notificatonError(
                "Ha ocurrido un error al cargar los datos"
            );
        });
}
