import { API_URI, HEADERS_URI } from "./API.js";


const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get('id');
console.log("DEBUG " + id);


fetch(API_URI + `/stores/${id}`, {
    method: "GET",
    headers: HEADERS_URI
})
.then((response) => response.json())
.then((data) => {    
    
    console.log(data);

}).catch((err) => console.log(err));

