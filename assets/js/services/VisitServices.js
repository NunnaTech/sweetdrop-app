import { API_URI, HEADERS_URI } from "./API.js";
import { getUser } from "../utils/LocalStorage.js";
import NotifyService from "../utils/NotifyService.js";

const name = document.getElementById("name");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const openAddress = document.querySelector("#openAddress");
const comment = document.querySelector("#comment");
const formVisit = document.querySelector("#formVisit");
let images = [
  "https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg",
  "https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg",
];

formVisit.addEventListener("submit", saveVisit);

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get("id");

getInfoStore();

function getInfoStore() {
  NotifyService.loadingNotification();
  fetch(API_URI + `/stores/${id}`, {
    method: "GET",
    headers: HEADERS_URI,
  })
    .then((response) => response.json())
    .then((data) => {
      NotifyService.loadingNotificationRemove();
      name.innerHTML = `<p class="fw-bold fs-5 text-auxiliar">${data.data.name}</p>`;
      phone.innerHTML = `<i class="fas fa-phone me-2 "></i>${data.data.phone}</span>`;
      address.innerHTML = `<i class="fas fa-map-marker-alt me-2"></i>${
        data.data.address + " CP " + data.data.zipcode
      }</span>`;
      openAddress.innerHTML = `<a href="http://maps.google.com/?q=${
        data.data.address + " " + data.data.zipcode
      }" target="_blank" class="btn btn-outline-primary font-bold">Abrir en Google Maps</a>`;
    })
    .catch((err) => {
      NotifyService.loadingNotificationRemove();
      NotifyService.notificatonError(
        "Ha ocurrido un error al cargar los datos"
      );
    });
}

function validateForm() {
  return comment.value !== "" && images.length !== 0;
}

function registerVisit() {
  NotifyService.loadingNotification();
  fetch(API_URI + `/orders/visit`, {
    method: "POST",
    headers: HEADERS_URI,
    body: JSON.stringify({
      store_id: id,
      comment: comment.value,
      images: images,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.success) {
        NotifyService.loadingNotificationRemove();
        NotifyService.notificatonSuccess("Visita registrada correctamente");
        setTimeout(() => {
          window.location.href = "../../../views/orders/orders.html?id=" + id;
        }, 1000);
      } else {
        NotifyService.loadingNotificationRemove();
        NotifyService.notificatonError(
          "La visita no fue registrada, favor de revisar"
        );
      }
    })
    .catch((err) => {
      NotifyService.loadingNotificationRemove();
      NotifyService.notificatonError(
        "Ha ocurrido un error al registrar la visita campos."
      );
    });
}

function saveVisit(e) {
  e.preventDefault();
  if (validateForm()) registerVisit();
  else NotifyService.notificatonError("Los campos no deben estar vacios");
}
