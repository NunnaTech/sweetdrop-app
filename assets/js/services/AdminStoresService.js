import { API_URI, HEADERS_URI } from "./API.js";
import { getToken, setData, getUser } from "../utils/LocalStorage.js";
import { goToPage } from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";

const user = getUser();

const form = document.querySelector('#formulario') || document.createElement('formulario');
const name = document.getElementById('name');
const phone = document.getElementById('phone');
const address = document.getElementById('address');
const zipcode = document.getElementById('zipcode');
const owner = document.getElementById('owner');

const contenedor = document.getElementById("page-content") ||document.createElement("page-content");

const url = API_URI + "/stores";
console.log(getToken());

form.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
  e.preventDefault();

  if (
    [
      name.value,
      phone.value,
      address.value,
      zipcode.value,
      owner.value,
    ].includes("")
  ) {
    alert("Todos los campos son obligatorios");
    return true;
  } else {
    agregarStores();
  }
}

getStores();

//Obtener Tiendas
function getStores() {
  NotifyService.loadingNotification();
  fetch(API_URI + `/stores'`, {
    method: "GET",
    headers: HEADERS_URI,
    Authorization: `Bearer 11| ${getToken()}`,
  })
    .then((response) => response.json())
    .then((data) => mostrar(data))
    .catch(err => {console.error(err); 
    NotifyService.loadingNotificationRemove();})
  const mostrar = (stores) => {
    console.log(stores)
    NotifyService.loadingNotificationRemove();
    stores.data.forEach((store) => {
        
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
        h5.textContent = `${store.name} ${store.phone} ${store.address} `;

        h5.id = "nameForm";
        let divDealer = document.createElement("div");
        divDealer.className = "dealer-info d-flex align-items-center";
        let divSpan = document.createElement("span");
        divSpan.textContent = `${store.zipcode}`;
        divSpan.id = "zipcode";

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
        let divf = document.createElement("div");
        divf.className =
          "d-flex w-100 flex-wrap align-items-center justify-content-between gap-2";
        let divme = document.createElement("div");
        divme.className = "me-2";
        let h6me = document.createElement("h6");
        h6me.className = "mb-0 text-auxiliar";
        h6me.textContent = `${store.owner}`;
        h6me.id = "ownerForm";

        let divdf = document.createElement("div");
        divdf.className = "d-flex justify-content-between my-3 mt-4";

        let btnBorrar = document.createElement("a");
        btnBorrar.className = "btn btn-outline-danger";
        btnBorrar.onclick = () => eliminarStore(`${store.id}`);
        btnBorrar.textContent = "Eliminar";
        divdf.appendChild(btnBorrar);

        let btnEditar = document.createElement("a");
        btnEditar.textContent = "Ver Detalle";
        btnEditar.className = "btn btn-outline-secondary";
        btnEditar.onclick = () => editStore(store);
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
        divCardBody.appendChild(divbg);
        divCardBody.appendChild(divdf);
        ul.appendChild(li);
        li.appendChild(divAv);
        divAv.appendChild(divSpanD);
        li.appendChild(divf);
        divf.appendChild(divme);
        divme.appendChild(h6me);

        div.appendChild(divCard);
        contenedor.appendChild(div);
      
    });
  };
}

async function eliminarStore(id) {
  fetch(API_URI + "/stores/" + id, {
    method: "DELETE",
    headers: HEADERS_URI,
    Authorization: `Bearer 11| ${getToken()}`,
  })
    .then((respuesta) => respuesta.json())
    .then((data) => {
      if (data.success == true) {
        alert("Se borró exitosamente");
        goToPage("../../../views/store/stores.html");
      } else {
        alert("Error al eliminar");
        goToPage("../../../views/store/stores.html");
      }
    })

    .catch((error) => alert(error));
}

async function agregarStores() {
  fetch(url, {
    method: "POST",
    headers: HEADERS_URI,
    Authorization: `Bearer 11| ${getToken()}`,
    body: JSON.stringify({
      name: name.value,
      phone: phone.value,
      address: address.value,
      zipcode: zipcode.value,
      owner: owner.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        alert("registro exitoso");
        goToPage("../../../views/store/stores.html");
        console.log(data);
      } else {
        console.log(data);
      }
    });
  console.log(url);
}
//Enviar datos al formulario
function editStore(store) {
  setData("store", JSON.stringify(store));
  goToPage("../../../views/store/edit_store.html");
}


