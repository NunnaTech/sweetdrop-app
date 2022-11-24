import { API_URI, HEADERS_URI } from "./API.js";
import { getToken, setData } from "../utils/LocalStorage.js";
import { goToPage } from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";

const form =
  document.querySelector("#formulario") || document.createElement("formulario");
const formUpdate =
  document.querySelector("#formulario") || document.createElement("formulario");

const nombre = document.getElementById("nombre");
const paterno = document.getElementById("paterno");
const materno = document.getElementById("materno");
const phone = document.getElementById("phone");
const email = document.getElementById("email");

//FormUpdate
const nombreU = document.getElementById("nombreU");
const paternoU = document.getElementById("paternoU");
const maternoU = document.getElementById("maternoU");
const phoneU = document.getElementById("phoneU");
const emailU = document.getElementById("emailU");

const contenedor =
  document.getElementById("content-page") ||
  document.createElement("content-page");

const url = API_URI + "/users";
console.log(getToken());

form.addEventListener("submit", validarFormulario);
formUpdate.addEventListener("submit", validarFormularioUpdate);

function validarFormulario(e) {
  e.preventDefault();

  if (
    [
      nombre.value,
      paterno.value,
      materno.value,
      phone.value,
      email.value,
    ].includes("")
  ) {
    alert("Todos los campos son obligatorios");
    return true;
  } else {
    agregarDealer();
  }
}
getDealers();

//Obtener Usuarios
function getDealers() {
  NotifyService.loadingNotification();
  fetch(API_URI + "/users", {
    method: "GET",
    headers: HEADERS_URI,
    Authorization: `Bearer 11| ${getToken()}`,
  })
    .then((response) => response.json())
    .then((data) => mostrar(data))
    .catch(err => {console.error(err); NotifyService.loadingNotificationRemove();})
  const mostrar = (dealers) => {
    NotifyService.loadingNotificationRemove();
    dealers.data.forEach((dealer) => {
      if (dealer.role_id == 2) {
        let div = document.createElement("div");
        div.className = "col-xl-4 col-lg-6 col-md-6";

        let divCard = document.createElement("div");
        divCard.className = "card";

        let divCardHeader = document.createElement("div");
        divCardHeader.className = "card-header";

        let divFlex = document.createElement("div");
        divFlex.className = "d-flex align-items-start";

        let divFlextAlign = document.createElement("div");
        divFlextAlign.className = "d-flex align-items-center";
        let divAvatar = document.createElement("div");
        divAvatar.className = "avatar me-3";
        divAvatar.innerHTML = `<i class="fas fa-truck-moving text-primary fs-3"></i>`;
        let divM = document.createElement("div");
        divM.className = "me-2";
        let h5 = document.createElement("h5");
        h5.className = "mb-1";
        h5.textContent = `${dealer.name} ${dealer.first_surname} ${dealer.second_surname} `;

        h5.id = "nameForm";
        let divDealer = document.createElement("div");
        divDealer.className = "dealer-info d-flex align-items-center";
        let divSpan = document.createElement("span");
        divSpan.innerHTML = `<i class="fas fa-phone me-2"></i>`;
        divSpan.textContent = `${dealer.phone}`;
        divSpan.id = "phoneForm";

        //card body
        let divCardBody = document.createElement("div");
        divCardBody.className = "card-body";
        let ul = document.createElement("ul");
        ul.className = "p-0 m-0";
        let li = document.createElement("li");
        li.className = "d-flex mb-4 pb-1";
        let divAv = document.createElement("div");
        divAv.className = "avatar flex-shrink-5 ms-4";
        let divSpanD = document.createElement("span");
        divSpanD.className = "avatar px-3";
        divSpanD.innerHTML = `<i class="fas fa-envelope"></i>`;
        let divf = document.createElement("div");
        divf.className =
          "d-flex w-100 flex-wrap align-items-center justify-content-between gap-2";
        let divme = document.createElement("div");
        divme.className = "me-2";
        let h6me = document.createElement("h6");
        h6me.className = "mb-0 text-auxiliar";
        h6me.textContent = `${dealer.email}`;
        h6me.id = "emailForm";

        let divdf = document.createElement("div");
        divdf.className = "d-flex justify-content-between my-3 mt-4";

        let btnBorrar = document.createElement("a");
        btnBorrar.className = "btn btn-outline-danger";
        btnBorrar.onclick = () => eliminarDealer(`${dealer.id}`);
        btnBorrar.textContent = "Eliminar";
        divdf.appendChild(btnBorrar);

        let btnEditar = document.createElement("a");
        btnEditar.textContent = "Ver Detalle";
        btnEditar.className = "btn btn-outline-secondary";
        btnEditar.onclick = () => cargarDealer(dealer);
        divdf.appendChild(btnEditar);

        divCard.appendChild(divCardHeader);
        divCard.appendChild(divCardBody);

        //Header
        divCardHeader.appendChild(divFlex);
        divFlex.appendChild(divFlextAlign);
        divFlextAlign.appendChild(divAvatar);
        divFlextAlign.appendChild(divM);
        divM.appendChild(h5);
        divM.appendChild(divDealer);
        divDealer.appendChild(divSpan);

        //Body
        divCardBody.appendChild(ul);
        divCardBody.appendChild(divdf);
        ul.appendChild(li);
        li.appendChild(divAv);
        divAv.appendChild(divSpanD);
        li.appendChild(divf);
        divf.appendChild(divme);
        divme.appendChild(h6me);

        div.appendChild(divCard);
        contenedor.appendChild(div);
      }
    });
  };
}

async function eliminarDealer(id) {
  fetch(API_URI + "/users/" + id, {
    method: "DELETE",
    headers: HEADERS_URI,
    Authorization: `Bearer 11| ${getToken()}`,
  })
    .then((respuesta) => respuesta.json())
    .then((data) => {
      if (data.success == true) {
        NotifyService.notificatonSuccess();
        goToPage("../../views/dealers/dealers.html");
      } else {
        NotifyService.notificatonError();
        goToPage("../../views/dealers/dealers.html");
      }
    })

    .catch((error) => alert(error));
}

async function agregarDealer() {
  fetch(url, {
    method: "POST",
    headers: HEADERS_URI,
    Authorization: `Bearer 11| ${getToken()}`,
    body: JSON.stringify({
      name: nombre.value,
      password: 12345,
      first_surname: paterno.value,
      second_surname: materno.value,
      phone: phone.value,
      email: email.value,
      role_id: 2,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        NotifyService.notificatonSuccess();
        goToPage("../../views/dealers/dealers.html");
        console.log(data);
      } else {
        NotifyService.notificatonError();
        goToPage("../../views/dealers/register_dealers.html");
      }
    });
}
//Enviar datos al formulario
function cargarDealer(dealer) {
  setData("dealer", JSON.stringify(dealer));
  goToPage("../../views/dealers/edit_dealer.html");
}

//Cargar datos al formulario Editar
function setDataDealer() {
  const data = JSON.parse(localStorage.getItem("dealer") || null);
  console.log("¨***");
  console.log(data);
  document.getElementById("id").value = data.id;
  document.getElementById("nombreU").value = data.name;
  document.getElementById("paternoU").value = data.first_surname;
  document.getElementById("maternoU").value = data.second_surname;
  document.getElementById("phoneU").value = data.phone;
  document.getElementById("passwordU").value = data.password;
  document.getElementById("emailU").value = data.email;
  document.getElementById("role_idU").value = data.role_id;
}

setDataDealer();

function validarFormularioUpdate() {
  if (
    [
      nombreU.value,
      paternoU.value,
      maternoU.value,
      phoneU.value,
      emailU.value,
    ].includes("")
  ) {
    alert("Todos los campos son obligatorios");
    return true;
  } else {
    actualizarDealer();
  }
}

async function actualizarDealer() {
  fetch(url, {
    method: "PUT",
    headers: HEADERS_URI,
    Authorization: `Bearer 11| ${getToken()}`,
    body: JSON.stringify({
      id: id.value,
      name: nombreU.value,
      password: 12345,
      first_surname: paternoU.value,
      second_surname: maternoU.value,
      phone: phoneU.value,
      email: emailU.value,
      role_id: 2,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        NotifyService.notificatonSuccess();
        goToPage("../../views/dealers/dealers.html");
      } else {
        NotifyService.notificatonError();
        goToPage("../../views/dealers/edit_dealer.html");
      }
    });
}
