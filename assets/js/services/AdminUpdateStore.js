import { API_URI, HEADERS_URI } from "./API.js";
import { goToPage } from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";

const updateForm =
  document.querySelector("#updateForm") || document.createElement("form");
const inputUpdateName =
  document.querySelector("#name") || document.createElement("input");
const inputUpdatePhone =
  document.querySelector("#phone") || document.createElement("input");
const inputUpdateAddress =
  document.querySelector("#address") || document.createElement("input");
const inputUpdateZipcode =
  document.querySelector("#zipcode") || document.createElement("input");
const inputUpdateOwner =
  document.querySelector("#owner") || document.createElement("input");

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get("id");

fetch(API_URI + "/stores/" + id, {
  method: "GET",
  headers: HEADERS_URI,
})
  .then((response) => response.json())
  .then((data) => {
    (inputUpdateName.value = data.data.name),
      (inputUpdatePhone.value = data.data.phone);
    inputUpdateAddress.value = data.data.address;
    inputUpdateZipcode.value = data.data.zipcode;
    inputUpdateOwner.value = data.data.owner;
  })
  .catch((err) => console.log(err));

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
      console.log(data);
      if (data.success === true) {
        goToPage("../../../views/store/stores.html");
        NotifyService.notificatonSuccess("Tienda actualizada correctamente");
        NotifyService.loadingNotificationRemove();
      } else {
        NotifyService.notificatonError("Error al actualizar");
      }
    });
}
