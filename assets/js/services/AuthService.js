import {API_URI, HEADERS_URI} from "./API.js";

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
            headers: HEADERS_URI
        })
    }

    Profile(user) {
        return fetch(API_URI + '/profile', {
            method: 'PUT',
            headers: HEADERS_URI,
            body: JSON.stringify({
                id: user.id,
                email: user.email,
                name: user.name,
                first_surname: user.first_surname,
                second_surname: user.second_surname,
                phone: user.phone,
                role_id: user.role_id
            })
        })
    }

    ChangePassword(passwords) {
        return fetch(API_URI + '/changePassword', {
            method: 'PUT',
            headers: HEADERS_URI,
            body: JSON.stringify({
                password: passwords.password,
                new_password: passwords.new_password,
                new_password_confirmation: passwords.new_password_confirmation
            })
        })
    }
}

export default new AuthService();

