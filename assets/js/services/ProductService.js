import { API_URI, HEADERS_URI } from "./API.js";
import { getToken} from "../utils/LocalStorage.js";
import {goToPage} from "../utils/Routes.js";
const contenedor = document.getElementById('page') || document.createElement('page');


fetch(API_URI+'/products', {
    
    method: "GET",
    headers: HEADERS_URI, 'Authorization': `Bearer 11| ${getToken()}`
  })
    .then(response => response.json())
    .then(data =>mostrar(data))
    const mostrar = (products) => {
        console.log(products)
        products.data.data.forEach(product => {

                let divRow = document.createElement('div');
                divRow.className = 'row gx-4';

                let div = document.createElement('div');
                div.className = 'col-xl-4 col-lg-6  col-md-6';
                let divS = document.createElement('div');
                divS.className = 'card mb-3 bg-light';
                let divR = document.createElement('div');
                divR.className = 'row g-0t';
                let divIm = document.createElement('div');
                divIm.className = 'col-md-4 d-flex align-items-center justify-content-center pt-4 pb-1';
                let divImage = document.createElement('img');
                divImage.className = 'card-img card-img-left img-fluid w-75 h-auto product-image'
                divImage.src = `${product.image}`
                divImage.style = 'height: 250px;width: 250px;'

                let divCol = document.createElement('div');
                divCol.className = 'col-md-8'
                let divCardBody = document.createElement('div');
                divCardBody.className = 'card-body'
                let h4Title = document.createElement('h4')
                h4Title.className = 'card-title mb-0'
                h4Title.textContent = `${product.name}`
                let p1 = document.createElement('p')
                p1.className = 'card-text text-auxiliar font-extrabold'
                p1.textContent = `${product.sku}`
                let pText = document.createElement('p')
                pText.className = 'card-text'
                pText.textContent = `${product.description}`

                let buy = document.createElement('div')
                buy.className = 'buy d-flex justify-content-between align-items-center'
                let pCard = document.createElement('p')
                pCard.className = 'card-text text-auxiliar font-extrabold'
                pCard.textContent = `${product.price}` + ' MXN'

                let divButton = document.createElement('div')
                divButton .className = 'btn-group align-items-center mx-2 px-1'

                let btnBorrar = document.createElement('a');
                btnBorrar.className = 'btn btn-link p-2 m-1 text-gray-600';
                btnBorrar.onclick= () =>eliminarProducto(`${product.id}`);
                btnBorrar.textContent = 'Eliminar'
                divButton.appendChild(btnBorrar)

                 
                let btnEditar = document.createElement('a');
                btnEditar.className = 'btn btn-link p-2 m-1 text-gray-600'
                btnBorrar.textContent = 'Editar'
                divButton.appendChild(btnEditar)
                


            
          

            //Header
            div.appendChild(divS)
            divS.appendChild(divR)
            divR.appendChild(divIm)
            divIm.appendChild(divImage)
            divR.appendChild(divCol)
            divCol.appendChild(divCardBody)
            divCardBody.appendChild(h4Title)
            divCardBody.appendChild(p1)
            divCardBody.appendChild(pText)
            divCardBody.appendChild(buy)
            buy.appendChild(pCard)
            buy.appendChild(divButton)     
            
            divRow.appendChild(div)
            contenedor.appendChild(div);
  
            
           
           
        });
        

        
        
    }

    async function eliminarProducto(id){
        fetch(API_URI +'/products/'+id,
                        {
                            method: 'DELETE',
                            headers:HEADERS_URI ,'Authorization': `Bearer 11| ${getToken()}`,
                            
                        })
                        .then(respuesta => respuesta.json())
                        .then(data =>{
                            if(data.success == true){
                                alert('Se borró exitosamente')
                                goToPage('../../views/products/products.html');
                        }else{
                            alert('No se borro')
                            goToPage('../../views/products/products.html');
                        }
                    })
                            
                            
                        .catch(error => alert(error))
        
                
        }
