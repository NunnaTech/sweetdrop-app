import {getToken} from "../utils/LocalStorage.js";

const API_URI = 'https://sweetdrop-production.up.railway.app/api'

const HEADERS_URI = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': '*',
    'Authorization': 'Bearer ' + getToken()
}

export {
    API_URI,
    HEADERS_URI
}
