import { API_URI, HEADERS_URI } from "./API.js";
import { goToPage } from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";

const updateForm =
  document.querySelector("#updateForm") || document.createElement("form");
const inputUpdateName =
  document.querySelector("#name") || document.createElement("input");
const inputUpdatePhone = document.querySelector("#phone");
const inputUpdateAddress =
  document.querySelector("#address") || document.createElement("input");
const inputUpdateZipcode =
  document.querySelector("#zipcode") || document.createElement("input");
const inputUpdateOwner =
  document.querySelector("#owner") || document.createElement("input");

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get("id");

NotifyService.loadingNotification("Cargando datos de la tienda");
fetch(API_URI + "/stores/" + id, {
  method: "GET",
  headers: HEADERS_URI,
})
  .then((response) => response.json())
  .then((data) => {
    NotifyService.loadingNotificationRemove();
    (inputUpdateName.value = data.data.name),
      (inputUpdatePhone.value = data.data.phone);
    inputUpdateAddress.value = data.data.address;
    inputUpdateZipcode.value = data.data.zipcode;
    inputUpdateOwner.value = data.data.owner;
  })
  .catch((err) => NotifyService.notificatonError('Error al traer los datos de la tienda'));

updateForm.addEventListener("submit", validInputsUpdate);

function validInputsUpdate(e) {
  e.preventDefault();

  if (
    [
      inputUpdateName.value,
      inputUpdatePhone.value,
      inputUpdateAddress.value,
      inputUpdateZipcode.value,
      inputUpdateOwner.value,
    ].includes("")
  ) {
    NotifyService.notificatonError("Todos los campos son obligatorios");
    return true;
  } else {
    updateStore();
  }
}

async function updateStore() {
  fetch(API_URI + "/stores", {
    method: "PUT",
    headers: HEADERS_URI,

    body: JSON.stringify({
      id: id,
      name: inputUpdateName.value,
      phone: inputUpdatePhone.value,
      address: inputUpdateAddress.value,
      zipcode: inputUpdateZipcode.value,
      owner: inputUpdateOwner.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        NotifyService.notificatonSuccess("Tienda actualizada correctamente!");
        setTimeout(() => {
          goToPage("../../../views/store/stores.html");
        }, 2000);
      } else {
        NotifyService.notificatonError(
          "Ha ocurrido un error al actualizar la tienda, revisa los datos"
        );
      }
    });
}
