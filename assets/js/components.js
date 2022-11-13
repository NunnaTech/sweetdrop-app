import {getUser} from "./utils/LocalStorage.js";

const navTemplate = document.querySelector('#navTemplate');
document.addEventListener('DOMContentLoaded', setNavbar)

function setNavbar() {
    let user = getUser();
    if (user.role_id === 1) {
        getTemplate('../templates/AdminNav.html')
    } else getTemplate('../templates/DealerNav.html');
}

function getTemplate(template) {
    fetch(template).
    then(response => response.text().
    then(data =>  {
        let parse = new DOMParser();
        let doc = parse.parseFromString(data, 'text/html');
        navTemplate.innerHTML = doc.body.innerHTML;
    }));
}

