import { API_URI, HEADERS_URI } from "./API.js";


const name = document.getElementById("name");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const zipcode = document.getElementById("zipcode");
const owner = document.getElementById("owner");


const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get('id');



fetch(API_URI + `/stores/${id}`, {
    method: "GET",
    headers: HEADERS_URI
})
.then((response) => response.json())
.then((data) => {    
    
    name.value = `${data.data.name}`;
    phone.value = `${data.data.phone}`;
    address.value = `${data.data.address}`;
    zipcode.value = `${data.data.zipcode}`;
    owner.value = `${data.data.owner}`;

}).catch((err) => console.log(err));



