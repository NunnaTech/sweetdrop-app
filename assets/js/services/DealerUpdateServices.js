//importaciones
import { API_URI, HEADERS_URI } from "./API.js";
import NotifyService from "../utils/NotifyService.js";
import { goToPage } from "../utils/Routes.js";

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get("id");

//Formulario de Actualizacion
const formU =
  document.querySelector("#formularioU") || document.createElement("form");
//FormUpdate

const nombreU = document.getElementById("nombreU");
const paternoU = document.getElementById("paternoU");
const maternoU = document.getElementById("maternoU");
const phoneU = document.getElementById("phoneU");
const emailU = document.getElementById("emailU");

//Actualizar Repartidor
NotifyService.loadingNotification();
fetch(API_URI + "/users/" + id, {
  method: "GET",
  headers: HEADERS_URI,
})
  .then((response) => response.json())
  .then((data) => {
    NotifyService.loadingNotificationRemove();
    (nombreU.value = data.data.name),
      (paternoU.value = data.data.first_surname);
    maternoU.value = data.data.second_surname;
    phoneU.value = data.data.phone;
    emailU.value = data.data.email;
  })
  .catch((err) => console.log(err));

formU.addEventListener("submit", validarFormularioUpdate);

function validarFormularioUpdate(e) {
  e.preventDefault();

  if (
    [nombreU.value, paternoU.value, phoneU.value, emailU.value].includes("")
  ) {
    NotifyService.notificatonError("Todos los campos son obligatorios");
  } else {
    actualizarDealer();
  }
}

async function actualizarDealer() {
  fetch(API_URI + "/users/dealers", {
    method: "PUT",
    headers: HEADERS_URI,

    body: JSON.stringify({
      id: id,
      name: nombreU.value,
      first_surname: paternoU.value,
      second_surname: maternoU.value,
      phone: phoneU.value,
      email: emailU.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      if (data.success === true) {
        NotifyService.notificatonSuccess(
          "Repartidor actualizado correctamente!"      
        );
        NotifyService.loadingNotification("Redireccionando...");      

        setTimeout(() => {
          goToPage("../../views/dealers/dealers.html");
        }, 2000);
      } else {
        NotifyService.notificatonError("Ha occurido un error, por favor, verifica los datos ingresados");
      }
    });
}
