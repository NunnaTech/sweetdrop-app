import {API_URI, HEADERS_URI} from "./API.js";
import {goToPage} from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";
import {saveImageFirestore} from "../utils/Firestore-functions.js";
//import { fileToBase64 } from "../utils/FileFormat.js";

const updateForm =
    document.querySelector("#updateForm") || document.createElement("form");
const inputUpdateName =
    document.querySelector("#name") || document.createElement("input");
const inputUpdatePrice =
    document.querySelector("#price") || document.createElement("input");
const inputUpdateDescription =
    document.querySelector("#description") || document.createElement("input");
const inputUpdateImage =
    document.querySelector("#image") || document.createElement("input");

let sku = "";
let image = "";
let newImage = false;
// get data product
// check if image was changed
inputUpdateImage.addEventListener("change", async (e) => {
    if (e.target.value !== "") {
        newImage = true;
        setPreviewImage(e.target.files[0]);
    }
});

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
        addProduct();
    }
}

async function addProduct() {
    if (newImage) {
        image = await saveImageFirestore(inputUpdateImage.files[0]);
    }
    const body = JSON.stringify({
        sku: sku,
        name: inputUpdateName.value,
        price: inputUpdatePrice.value,
        description: inputUpdateDescription.value,
        image: image,
    });
    fetch(API_URI + "/products/", {
        method: "POST",
        headers: HEADERS_URI,

        body: body,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success === true) {
                goToPage("../../views/products/products.html");
                NotifyService.notificatonSuccess("Producto agregado correctamente");
                NotifyService.loadingNotificationRemove();
            } else {
                NotifyService.notificatonError("Error al Agregar");
            }
        });
}

function setPreviewImage(file) {
    const imagePreview = document.getElementById("image-preview");

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        imagePreview.src = reader.result;
        imagePreview.setAttribute("style", "width: 30%; display: block;");
    };
    reader.onerror = function (error) {
        console.log("Error: ", error);
    };
}
