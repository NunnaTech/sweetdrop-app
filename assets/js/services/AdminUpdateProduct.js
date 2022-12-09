import { API_URI, HEADERS_URI } from "./API.js";
import { goToPage } from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";
import { saveImageFirestore } from "../utils/Firestore-functions.js";

const updateForm =
  document.querySelector("#updateForm") || document.createElement("form");
const inputUpdateName =
  document.querySelector("#name") || document.createElement("input");
const inputUpdateSku =
  document.querySelector("#sku") || document.createElement("input");
const inputUpdatePrice =
  document.querySelector("#price") || document.createElement("input");
const inputUpdateDescription =
  document.querySelector("#description") || document.createElement("input");
const inputUpdateImage =
  document.querySelector("#image") || document.createElement("input");

const getUrl = new URLSearchParams(window.location.search);
const id = getUrl.get("id");
let sku = "";
let image = "";
let newImage = false;
// get data product
getProduct();

// check if image was changed
inputUpdateImage.addEventListener("change", (e) => {
  if (e.target.value !== "") {
    newImage = true;
    console.log("new image");
    setNewPreviewImage(e.target.files[0]);
  }
});
async function getProduct() {
  NotifyService.loadingNotification();
  fetch(API_URI + "/products/" + id, {
    method: "GET",
    headers: HEADERS_URI,
  })
    .then((response) => response.json())
    .then((data) => {
      (inputUpdateName.value = data.data.name),
        (inputUpdatePrice.value = data.data.price);
      inputUpdateDescription.value = data.data.description;
      image = data.data.image;
      inputUpdateSku.value = data.data.sku;
      sku = data.data.sku;
      setPreviewImage(image);
      NotifyService.loadingNotificationRemove();
    })
    .catch((err) => {
      console.log(err);
      NotifyService.loadingNotificationRemove();
    });
}

updateForm.addEventListener("submit", validInputsUpdate);

function validInputsUpdate(e) {
  e.preventDefault();

  if (
    [
      inputUpdateName.value,
      inputUpdatePrice.value,
      inputUpdateDescription.value,
    ].includes("")
  ) {
    NotifyService.notificatonError("Todos los campos son obligatorios");
    return true;
  } else {
    updateProduct();
  }
}

async function updateProduct() {
  NotifyService.loadingNotification();

  if (newImage) {
    // upload image to firebase
    image = await saveImageFirestore(inputUpdateImage.files[0]);
  }
  const body = JSON.stringify({
    sku: sku,
    id: id,
    name: inputUpdateName.value,
    price: inputUpdatePrice.value,
    description: inputUpdateDescription.value,
    image: image,
  });
  fetch(API_URI + "/products/", {
    method: "PUT",
    headers: HEADERS_URI,

    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success === true) {
        goToPage("../../../views/products/products.html");
        NotifyService.notificatonSuccess("Producto actualizada correctamente");
        NotifyService.loadingNotificationRemove();
      } else {
        NotifyService.notificatonError("Error al actualizar");
        NotifyService.loadingNotificationRemove();
      }
    });
}

function setPreviewImage(url) {
  const imagePreview = document.getElementById("image-preview");
  imagePreview.src = url;
  imagePreview.setAttribute("style", "width: 30%;");
}
function setNewPreviewImage(file) {
  const imagePreview = document.getElementById("image-preview");

  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
    imagePreview.src = reader.result;
    imagePreview.setAttribute("style", "width: 30%; display: block;");
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}
