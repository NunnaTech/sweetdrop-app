import {API_URI, HEADERS_URI} from "./API.js";
import NotifyService from "../utils/NotifyService.js";
import {base64ToFile} from "../utils/FileFormat.js";
import {saveImageFirestore} from "../utils/Firestore-functions.js";

const name = document.getElementById("name");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const openAddress = document.querySelector("#openAddress");
const comment = document.querySelector("#comment");
const formVisit = document.querySelector("#formVisit");
const openCamera = document.querySelector("#button-camera");
const storeImage = document.querySelector("#storeImage");

openCamera.addEventListener("click", () => {
    window.location.href = "../../../views/orders/take_photo.html";
    sessionStorage.setItem("photoType", "visit");
    sessionStorage.setItem("orderId", id);
    sessionStorage.setItem("observations", comment.value);
});
formVisit.addEventListener("submit", saveVisit);

const getUrl = new URLSearchParams(window.location.search);
const id = getUrl.get("id");

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
            phone.innerHTML = `<a class="text-secondary" href="tel:${data.data.phone}"><i class="fas fa-phone me-2 "></i>${data.data.phone}</a>`;
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
    // load text from session storage
    const observations = sessionStorage.getItem("observations");
    if (observations) comment.value = observations;
    // load images from session storage
    const image = sessionStorage.getItem("image");
    if (image) {
        storeImage.setAttribute("src", image);
        storeImage.setAttribute("style", "visibility: visible");
    }
}

function validateForm() {
    return comment.value !== "" && sessionStorage.getItem("image") !== null;
}

async function registerVisit() {
    let imageUrl = ""
    NotifyService.loadingNotification();
    const image = base64ToFile(
        sessionStorage.getItem("image"),
        new Date().getTime() + ".jpg"
    );
    if (navigator.onLine) {
        imageUrl = await saveImageFirestore(image);
    } else {
        console.log(image)
        console.log(sessionStorage.getItem("image"))
        imageUrl = image
    }
    fetch(API_URI + `/orders/visit`, {
        method: "POST",
        headers: HEADERS_URI,
        body: JSON.stringify({
            store_id: id,
            comment: comment.value,
            images: [imageUrl],
        }),
    })
        .then((response) => response.json())
        .then((data) => {

            if (data.success) {
                // clear session storage
                sessionStorage.removeItem("image");
                sessionStorage.removeItem("observations");
                sessionStorage.removeItem("photoType");
                sessionStorage.removeItem("orderId");
                // send notifications
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
