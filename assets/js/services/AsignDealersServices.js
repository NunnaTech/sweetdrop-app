import { API_URI, HEADERS_URI } from "./API.js";
import NotifyService from "../utils/NotifyService.js";

const name = document.querySelector("#name");
const phone = document.querySelector("#phone");
const address = document.querySelector("#address");
const dealers = document.querySelector("#dealers");

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get("id");

let allDealers = [];
let dealersByStore = [];
let statusDealer = "";

getInfoStore();
getDealers();

function getInfoStore() {
  NotifyService.loadingNotification();
  fetch(API_URI + `/stores/${id}`, {
    method: "GET",
    headers: HEADERS_URI,
  })
    .then((response) => response.json())
    .then((data) => {
      NotifyService.loadingNotificationRemove();
      name.innerHTML = `<i class="fas fa-store me-2"></i>${data.data.name}`;
      phone.innerHTML = `<i class="fas fa-phone me-2"></i>${data.data.phone}`;
      address.innerHTML = `<i class="fas fa-map-marker-alt me-2"></i>${data.data.address} ${data.data.zipcode}`;

      data.data.dealers.forEach((dealer) => {
        dealersByStore.push(dealer.pivot.user_id);
      });
    })
    .catch((err) => {
      NotifyService.loadingNotificationRemove();
      NotifyService.notificatonError(
        "Ha ocurrido un error al cargar los datos"
      );
    });
}

function getDealers() {
  NotifyService.loadingNotification();
  fetch(API_URI + "/stores/dealers", {
    method: "GET",
    headers: HEADERS_URI,
  })
    .then((response) => response.json())
    .then((data) => {
      NotifyService.loadingNotificationRemove();
      allDealers = data.data;
      renderDealers(allDealers);
    })
    .catch((err) => {
      NotifyService.loadingNotificationRemove();
      NotifyService.notificatonError(
        "Ha ocurrido un error al cargar los datos"
      );
    });
}

function addDealer(getDealerId, statusDealer) {
    for (let i = 0; i < statusDealer.length; i++) {
      if (statusDealer[i].classList.contains("alreadyDealer")) {
        console.log("ya es dealer");
      } else {
        console.log("no es dealer");
      }
    }
  dealersByStore.push({ id: getDealerId });
  saveDealerInStore(dealersByStore);
}

function saveDealerInStore(dealersByStore) {
  NotifyService.loadingNotification();
  fetch(API_URI + `/stores/dealers`, {
    method: "POST",
    headers: HEADERS_URI,
    body: JSON.stringify({
      store_id: id,
      dealers: dealersByStore,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        NotifyService.loadingNotificationRemove();
        NotifyService.notificatonSuccess("Repartidor asignado correctamente!");
      } else {
        NotifyService.loadingNotificationRemove();
        NotifyService.notificatonError(
          "Ha ocurrido un error al asignar los repartidores"
        );
      }
    })
    .catch((err) => {
      NotifyService.loadingNotificationRemove();
      NotifyService.notificatonError(
        "Ha ocurrido un error. Inténtelo de nuevo más tarde"
      );
    });
}

function renderDealers(allDealers) {
  allDealers.forEach((dealer) => {
    if (dealer.role_id !== 1) {
      let created_at = dealer.created_at.substring(0, 10);
      let totalVisits = dealer.total_visits.length;
      let totalOrders = dealer.total_orders.length;

      let checked = dealersByStore.includes(dealer.id) ? "checked" : "";
      let switchBox = checked === "checked" ? "alreadyDealer" : "notDealer";
      statusDealer = switchBox;

      dealers.innerHTML += `
            <div class="col-xl-4 col-lg-6 col-md-6">
            <div class="card">
                <div class="card-body text-center">
                    <div class="mx-auto mb-3">
                        <img src="./../../assets/images/resources/user-icon.png"
                            alt="Avatar Image" class="rounded-circle" style="width: 50px">
                    </div>
                    <h5 class="mb-1 card-title">${dealer.name} ${dealer.first_surname}</h5>
                    <div>
                        <p class="text-muted">${dealer.email}</p>
                    </div>
                    <div class="col mt-3 mb-4 gap-2">
                        <span class="badge bg-label-auxiliar"><i class="fas fa-phone me-2"></i>
                        ${dealer.phone}</span>
                    </div>
                    <div class="col my-3 gap-2">
        
                        <p class="badge bg-label-secondary p-4"><i
                                class="fas fa-user-clock me-2"></i>Repartidor desde: ${created_at}</p>
                    </div>
        
                    <div class="d-flex align-items-center justify-content-around my-2 py-2">
                        <div>
                            <h4 class="mb-1 text-auxiliar">${totalVisits}</h4>
                            <p>Visitas</span>
                        </div>
        
                        <div>
                            <h4 class="mb-1 text-success">${totalOrders}</h4>
                            <p>Ordenes</p>
                        </div>
                    </div>
                    <hr>
                    <div class="d-flex align-items-center justify-content-center">
                        <div class="form-check-sm form-switch d-flex align-items-center">
                            <input class="form-check-input" type="checkbox" ${checked} onclick="addDealer(${dealer.id}, ${statusDealer})" id="${switchBox}">
                            <label class="form-check-label ms-3 fw-bold"
                                for="${switchBox}">Asignar Repartidor</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
  });
}
window.addDealer = addDealer;
