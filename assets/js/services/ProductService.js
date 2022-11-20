import { API_URI, HEADERS_URI } from "./API.js";
import { getToken} from "../utils/LocalStorage.js";
import {goToPage} from "../utils/Routes.js";
import NotifyService from "../utils/NotifyService.js";

const contenedor = document.getElementById('page') || document.createElement('page');


fetch(API_URI+'/products', {
    
    method: "GET",
    headers: HEADERS_URI, 'Authorization': `Bearer 11| ${getToken()}`
  })
    .then(response => response.json())
    .then(data =>mostrar(data))
    const mostrar = (products) => {
        
        products.data.forEach(product => {
console.log(product)
            contenedor.innerHTML += `      <div class="col-xl-4 col-lg-6 col-md-6">
            <div class="card mb-3 bg-light">
                <div class="row g-0">
                    <div
                            class="col-md-4 d-flex align-items-center justify-content-center pt-4 pb-1">
                        <img class="card-img card-img-left img-fluid w-75 h-auto product-image"
                             src="${product.image}"
                             alt="Product image">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title mb-0">${product.name}</h5>
                            <small>SKU: ${product.sku}</small>
                            <p class="card-text text-auxiliar font-extrabold">$ ${product.price}
                                MXN
                            </p>
                            
                            <div class="input-group my-3">
                          
                            
                            <a  href="/views/resources/products/products.html?id=${product.id}" class="btn btn-outline-danger col-12" >
                            <i class="fas fa-trash me-2"></i>
                             Eliminar
                       </a>
                       <a href="/views/resources/products/edit_product.html" class="btn btn-outline-secondary col-12 "
                       type="submit">
                       <i class="fas fa-pencil-alt me-2"></i>
                   Ver Detalle
           </a>
                             
                            
                        </div>

                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
            `
                        
           
           
        });
        

        
        
    }

    
        fetch(API_URI +'/products/'+id,
                        {
                            method: 'DELETE',
                            headers:HEADERS_URI ,
                            
                        })
                        .then(respuesta => respuesta.json())
                        .then(data =>{
                            if(data.success == true){
                                
                                goToPage('../../views/products/products.html');
                        }else{
                            NotifyService.notificatonError('No se borro correctamente!')
                            
                        }
                    })
                            
                            
                        .catch(error => alert(error))
        
                