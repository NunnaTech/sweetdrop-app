import { API_URI, HEADERS_URI } from "./API.js";
import { getUser } from "../utils/LocalStorage.js";
import NotifyService from "../utils/NotifyService.js";

const name = document.getElementById("name");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const openAddress = document.querySelector("#openAddress");
const cardProducts = document.querySelector("#products");
const received_by = document.querySelector("#received_by");
const isTheOwner = document.querySelector("#isTheOwner");
const comment = document.querySelector("#comment");
const formOrder = document.querySelector("#formOrder");

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get("id");
const user = getUser();

let products = [
  {
    id: 3,
    quantity: 10,
  },
];

let images = [
  "https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg",
];

getInfoStore();
getProducts();

isTheOwner.addEventListener("change", (event) => {
    if (isTheOwner.checked) {
        received_by.value = user.name + " " + user.first_surname;
    } else {
        received_by.value = "";
    }
});

formOrder.addEventListener("submit", saveOrder);

function datasLog() {
  console.log("isTheOwner:" + isTheOwner.checked);
  console.log(id);
  console.log(received_by.value);
  console.log(comment.value);
  console.log(products);
  console.log(images);
}

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

function getProducts() {
  NotifyService.loadingNotification();
  fetch(API_URI + `/products`, {
    method: "GET",
    headers: HEADERS_URI,
  })
    .then((response) => response.json())
    .then((products) => {
      NotifyService.loadingNotificationRemove();

      if (products.data.length === 0) {
        cardProducts.innerHTML = `<div class="card m-0 py-5 bg-light  text-primary text-center">No tienes productos registrados</div>`;
      } else {
        products.data.forEach((product) => {
          cardProducts.innerHTML += `
             <div class="col-xl-4 col-lg-6 col-md-6">
             <div class="card mb-3 bg-light">
                 <div class="row g-0">
                     <div
                         class="col-md-4 d-flex align-items-center justify-content-center pt-4 pb-1">
                         <img class="card-img card-img-left img-fluid w-75 h-auto product-image"
                             src="${product.image}"
                             alt="Product image">
                     </div>
                     <div class="col-md-8">
                         <div class="card-body">
                             <h5 class="card-title mb-0">${product.name}</h5>
                             <small>SKU: ${product.sku}</small>
                             <p class="card-text text-auxiliar font-extrabold">${product.price}
                                 MXN
                             </p>
                             <label class="font-bold"
                                 for="quantity">Cantidad:</label>
                             <div class="input-group my-3">
                                 <button
                                     class="btn btn-secondary input-group-text btn-lg"
                                     id="minus"><i class="fas fa-minus"></i></button>
                                 <input type="number" min="0" value="1"
                                     inputmode="numeric" pattern="\d*" id="input"
                                     class="form-control h-auto d-inline-block"
                                     oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '0');">
                                 <button
                                     class="btn btn-secondary input-group-text btn-lg"
                                     id="plus"><i class="fas fa-plus"></i></button>
                             </div>
                             <div class="d-flex justify-content-center mt-5">
                                 <button class="btn btn-auxiliar col-12 mt-2"
                                     type="submit">
                                     <i class="fas fa-plus me-2"></i>
                                     Agregar
                                 </button>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>   
             `;
        });
      }
    })
    .catch((err) => {
      NotifyService.loadingNotificationRemove();
      NotifyService.notificatonError(
        "Ha ocurrido un error al cargar los productos."
      );
    });
}

function createOrder() {
  NotifyService.loadingNotification();
  fetch(API_URI + `/orders`, {
    method: "POST",
    headers: HEADERS_URI,
    body: JSON.stringify({
      store_id: id,
      received_by: received_by.value,
      products: products,
      comment: comment.value,
      images: images,
    }),
  })
    .then((response) => response.json())
    .then((order) => {
      console.log(order);
      if (order.success) {
        NotifyService.loadingNotificationRemove();
        NotifyService.notificatonSuccess("Orden registrada correctamente");
        setTimeout(() => {
          window.location.href = "../../../views/orders/orders.html?id=" + id;
        }, 1000);
      } else {
        NotifyService.loadingNotificationRemove();
        NotifyService.notificatonError(
          "La orden no fue registrada, favor de revisar campos."
        );
      }
    })
    .catch((err) => {
      NotifyService.loadingNotificationRemove();
      NotifyService.notificatonError(
        "Ha ocurrido un error al registrar la orden"
      );
    });

}

function validateForm() {
    return comment.value !== "" && received_by.value !== "" && images.length !== 0 && products.length !== 0 && id !== "0";
  }

  function saveOrder(e) {
    e.preventDefault();
    if (validateForm()) createOrder();
    else NotifyService.notificatonError("Los campos no deben estar vacios");
  }
