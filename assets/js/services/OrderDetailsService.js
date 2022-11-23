import { API_URI, HEADERS_URI } from "./API.js";
import { getUser } from "../utils/LocalStorage.js";
import NotifyService from "../utils/NotifyService.js";

const name = document.querySelector("#name");
const phone = document.querySelector("#phone");
const address = document.querySelector("#address");
const status = document.querySelector("#status");
const folio = document.querySelector("#folio");

const folioFixed = document.querySelector("#folioFixed");
const nameFixed = document.querySelector("#nameFixed");
const addressFixed = document.querySelector("#addressFixed");
const phoneFixed = document.querySelector("#phoneFixed");
const storeId = document.getElementById("storeId");

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get("id");
const user = getUser();

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

      folio.innerHTML = `Folio: ${order.data.folio}`;
      name.innerHTML = `<p class="fw-bold fs-5 text-auxiliar">${order.data.store.name}</p>`;
      phone.innerHTML = `<i class="fas fa-phone me-2 "></i>${order.data.store.phone}</span>`;
      address.innerHTML = `<i class="fas fa-map-marker-alt me-2"></i>${
        order.data.store.address + " CP " + order.data.store.zipcode
      }</span>`;
      status.innerHTML = `<span class="badge bg-success mt-3"> ${order.data.status.name}</span>`;
    })
    .catch((err) => {
      NotifyService.loadingNotificationRemove();
      NotifyService.notificatonError(
        "Ha ocurrido un error al cargar los datos"
      );
    });
}
