import {API_URI, HEADERS_URI} from "./API.js";

class AdminRegisterStore {
    RegisterStore(name, phone, address, zipcode, owner) {
        return fetch(API_URI + '/stores', {
            method: 'POST',
            headers: HEADERS_URI,
            body: JSON.stringify({
                name: name,
                phone: phone,
                address: address,
                zipcode: zipcode,
                owner: owner, 
                
            })
        })
    }

    UpdateStore(id, name, phone, address, zipcode, owner){
        return fetch(API_URI + `/stores`,{
            method: 'PUT',
            headers: HEADERS_URI,
            body: JSON.stringify({
                id:id,
                name: name,
                phone: phone, 
                address: address,
                zipcode: zipcode,
                owner: owner
            })
        })
    }
}


export default new AdminRegisterStore();