import { API_URI, HEADERS_URI } from "./API.js";



class ProductService{
    RegisterProduct(name, description, price, image){
        return fetch(API_URI + `/products`,{
            method:'POST',
            headers: HEADERS_URI,
            body:JSON.stringify({
                name: name,
                description:description,
                price:price,
                image:image
            })
        })
    }
}

export default new ProductService();