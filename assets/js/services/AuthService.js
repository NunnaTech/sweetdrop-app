import {API_URI, HEADERS_URI} from "./API.js";
import {getToken} from "../utils/LocalStorage.js";

class AuthService {
    Login(email, password) {
        return fetch(API_URI + '/login', {
            method: 'POST',
            headers: HEADERS_URI,
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
    }

    Logout() {
        console.log(HEADERS_URI)
        return fetch(API_URI + '/logout', {
            method: 'GET',
            headers: HEADERS_URI, 'Authorization': `Bearer 11| ${getToken()}`
        })
    }
}

export default new AuthService();

