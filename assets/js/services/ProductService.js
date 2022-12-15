import { API_URI, HEADERS_URI } from "./API.js";

import { goToPage } from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";
const getUrl = new URLSearchParams(window.location.search);

const contenedor = document.getElementById("page");

getProductos();

function getProductos() {
  NotifyService.loadingNotification();
  fetch(API_URI + "/products", {
    method: "GET",
    headers: HEADERS_URI,
  })
    .then((response) => response.json())
    .then((data) => mostrar(data));
  const mostrar = (products) => {
    NotifyService.loadingNotificationRemove();
    products.data.forEach((product) => {
      contenedor.innerHTML += `<div class="col-xl-4 col-lg-6 col-md-6">
                <div class="card mb-3">
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
                                <p class="card-text text-auxiliar font-extrabold">$ ${product.price}
                                    MXN
                                </p>
                                <div class="my-3">
                                </a>
                                <a href="../../views/products/edit_product.html?id=${product.id}" class="btn btn-outline-secondary col-12 mb-3"
                                  type="submit">
                                  <i class="fas fa-pencil-alt me-2"></i>
                                  Ver Detalles
                                </a> 
                                <a   id="${product.id}" class="btn btn-outline-danger col-12" >
                                <i class="fas fa-trash me-2"></i>
                                 Eliminar
                                </a>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
          </div>
                `;
    });
    products.data.forEach((i) => {
      let id = document.getElementById(`${i.id}`);
      id.onclick = () => {
        deleteProduct(id.id);
      };
    });
  };
}

//Eliminar Producto
function deleteProduct(id) {
  Notiflix.Confirm.show(
    "Confirmación",
    "¿Estás seguro de eliminar el Producto?",
    "Sí, eliminar",
    "No, cancelar",
    () => {
      eliminarProducto(id);
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
function eliminarProducto(id) {
  fetch(API_URI + "/products/" + id, {
    method: "DELETE",
    headers: HEADERS_URI,
  })
    .then((respuesta) => respuesta.json())
    .then((data) => {
      if (data.success == true) {
        goToPage("../../views/products/products.html");
      } else {
        NotifyService.notificatonError("Error al eliminar!");
      }
    })
    .catch((error) => console.log(error));
}
