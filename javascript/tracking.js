import { cartQty } from "../data/cart.js";
import { trackingItem } from "../data/trackingitem.js";
import { dateDelivery, dateDeliveryProgress } from "../data/date.js";
cartQty();


function showTrackingHTML(){
    
    let html = ''
        trackingItem.forEach(function(value){
            html = `
            <div class="deliverytime-container">
            <p class="deliverytime">Arriving on ${value.deliverytime}</p>
            </div>
            <div class="product-details-container">
            <p>${value.productname}</p>
            <p>Quantity: ${value.productqty}</p>
            </div>
            <div class="product-img-container">
            <img class="product-img"src="${value.productimg}">
            </div>
            <div class="progress-container">
                <div class="preparing-container">
                    <p>Preparing</p>
                </div>
                <div class="shipping-container">
                    <p>Shipping</p>
                </div>
                <div class="delivered-container">
                    <p>Delivered</p>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-bar-green-25percent">
                </div>
                <div class="progress-bar-green-45percent">
                </div>
                <div class="progress-bar-green-65percent">
                </div>
                <div class="progress-bar-green-85percent">
                </div>
                <div class="progress-bar-green-100percent">
                </div>
            </div>
            `


            
        })

        
    document.querySelector('.tracking-list-container').innerHTML = html

   
}

showTrackingHTML()
console.log(trackingItem)