//importaciones
import { API_URI, HEADERS_URI } from "./API.js";
import NotifyService from "../utils/NotifyService.js";
import { goToPage } from "../utils/Routes.js";

const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get('id');


//Formulario de Actualizacion
const formU = document.querySelector("#formularioU") || document.createElement('form');
//FormUpdate

const nombreU = document.getElementById("nombreU");
const paternoU = document.getElementById("paternoU");
const maternoU = document.getElementById("maternoU");
const phoneU = document.getElementById("phoneU");
const emailU = document.getElementById("emailU");

//Actualizar Repartidor

fetch(API_URI+'/users/'+id, {
method: "GET",
headers: HEADERS_URI,
   }).then((response) => response.json())
     .then((data) => {
      nombreU.value = data.data.name,
      paternoU.value= data.data.first_surname;
      maternoU.value= data.data.second_surname;
      phoneU.value=  data.data.phone;
      emailU.value= data.data.email;
     }).catch((err) => console.log(err));

     formU.addEventListener('submit', validarFormularioUpdate)


     function validarFormularioUpdate(e) {
      e.preventDefault();
   
      if (
        [
          nombreU.value,
          paternoU.value,
          maternoU.value,
          phoneU.value,
          emailU.value,
        ].includes("")
      ) {
        NotifyService.notificatonError('Todos los campos son obligatorios')
        return true;
      } else {
        actualizarDealer();
      }
    }    

    async function actualizarDealer() {
      fetch(API_URI+'/users/dealers', {
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
          if (data.success === true) {
            goToPage("../../views/dealers/dealers.html");
          } else {
            NotifyService.notificatonError('No se actualizo correctamente!');
          }
        });
    }

//Eliminar Repartidor
      fetch(API_URI+'/users/'+id, {
        method: "DELETE",
        headers: HEADERS_URI,
        
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === true) {
            NotifyService.notificatonSuccess('Se elimino Correctamente!');
            goToPage("../../views/dealers/dealers.html");
          } else {
            NotifyService.notificatonError('No se elimino correctamente!');
          }
        });
    
