//Importaciones
import { API_URI, HEADERS_URI } from "./API.js";
import { getToken, setData } from "../utils/LocalStorage.js";
import { goToPage } from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";

const form =
  document.querySelector("#formulario") || document.createElement("form");
//Form
const nombreU = document.getElementById("nombreU");
const paternoU = document.getElementById("paternoU");
const maternoU = document.getElementById("maternoU");
const phoneU = document.getElementById("phoneU");
const emailU = document.getElementById("emailU");
const password = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");

const contenedor = document.getElementById("content-page");

form.addEventListener("submit", validarFormulario);

//Validar Formulario de Registro de Repartidor
function validarFormulario(e) {
  e.preventDefault();

  if (
    [nombreU.value, paternoU.value, phoneU.value, emailU.value].includes("")
  ) {
    NotifyService.notificatonError("Todos los campos son obligatorios");
    return true;
  } else {
    agregarDealer();
  }
}
getDealers();

//Obtener Repartidores
function getDealers() {
  NotifyService.loadingNotification();
  fetch(API_URI + "/roles/users/dealers", {
    method: "GET",
    headers: HEADERS_URI,
  })
    .then((response) => response.json())
    .then((data) => mostrar(data))
    .catch((err) => {
      NotifyService.loadingNotificationRemove();
    });
  const mostrar = (dealers) => {
    NotifyService.loadingNotificationRemove();
    dealers.data.forEach((dealer) => {
      contenedor.innerHTML += `
      <div class="col-xl-6 col-lg-6 col-md-12">
          <div class="card">
              <div class="card-header pb-2">
                  <div class="d-flex align-items-start">
                      <div class="d-flex align-items-center">
                          <div class="avatar me-4">
                              <i class="fas fa-user text-primary fs-3"></i>
                          </div>
                          <div class="me-2">
                              <h5 class="mb-1 ">${dealer.name} ${
        dealer.first_surname
      } 
                              ${dealer.second_surname === null ? "" : ""}
                              </h5>
                              <div class="dealer-info d-flex align-items-center p-1">
                                  <span>
                                      <i class="fas fa-phone me-2"></i>
                                      ${dealer.phone}</span>
                              </div>
                              <div class="dealer-info d-flex align-items-center p-1">
                              <span class="text-auxiliar">
                                  <i class="fas fa-envelope me-2"></i>
                                  ${dealer.email}</span>
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-body">                 
                  <div class="d-flex justify-content-between my-3 mt-4">
                      <a class="btn btn-outline-danger" id="${
                        dealer.id
                      }"  id="btnDelete">
                          <i class="fas fa-trash me-2"></i>
                          Eliminar
                      </a>
                      <a href="../dealers/edit_dealer.html?id=${
                        dealer.id
                      }" class="btn btn-outline-secondary">
                          <i class="fas fa-pen me-2"></i>
                          Editar
                      </a>
                  </div>
              </div>
          </div>
      </div> `;
    });
    dealers.data.forEach((i) => {
      let id = document.getElementById(`${i.id}`);
      id.onclick = () => {
        deleteDealer(id.id);
      };
    });
  };
}
//End Consulta

//Registrar Repartidor
async function agregarDealer() {
  fetch(API_URI + "/users/dealers", {
    method: "POST",
    headers: HEADERS_URI,
    body: JSON.stringify({
      name: nombreU.value,
      first_surname: paternoU.value,
      second_surname: maternoU.value,
      phone: phoneU.value,
      email: emailU.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        password.innerHTML = data.data.rawPassword;

        NotifyService.loadingNotification();
        document.getElementById("btnShowModalPassword").click();
        NotifyService.loadingNotificationRemove();
        copyTextToClipboard();

        NotifyService.notificatonSuccess(
          "Repartidor registrado correctamente!"
        );

        btnRedirect.addEventListener("click", () => {
          goToPage("../../views/dealers/dealers.html");
        });
      }
    });
}

//Eliminar Repartidor
function deleteDealer(id) {
  Notiflix.Confirm.show(
    "Confirmación",
    "¿Estás seguro de eliminar al Repartidor?",
    "Sí, eliminar",
    "No, cancelar",
    () => {
      eliminarDealer(id);
    },
    () => {},
    {
      titleColor: "#5D51B4",
      okButtonColor: "#f8f9fa",
      okButtonBackground: "#54d37a",
      cancelButtonColor: "#f8f9fa",
      cancelButtonBackground: "#f3616d",
    }
  );
}

function eliminarDealer(id) {
  fetch(API_URI + "/users/" + id, {
    method: "DELETE",
    headers: HEADERS_URI,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        NotifyService.notificatonSuccess("Repartidor eliminado correctamente!"); 
        NotifyService.loadingNotification("Redireccionando...");      
        setTimeout(() => {
          goToPage("../../views/dealers/dealers.html");
        }, 2000);
      } else {
        NotifyService.notificatonError(
          "Ha ocurrido un error. Inténtalo de nuevo"
        );
      }
    });
}

function copyTextToClipboard() {
  copyBtn.addEventListener("click", () => {
    var textArea = document.createElement("textarea");

    textArea.value = password.innerHTML
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    NotifyService.notificatonSuccess("Contraseña copiada correctamente!");
    navigator.clipboard.writeText(textArea.value);
  });
}

window.deleteDealer = deleteDealer;
