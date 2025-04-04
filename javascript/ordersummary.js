
import {productList} from "../data/products.js";
import {totalOrder} from "../data/order.js"
import { cart, cartQty, saveCartDatatoStorage, dropdownMENU } from "../data/cart.js";
import {dateDelivery} from "../data/date.js"
import { trackingItem, trackingReset } from "../data/trackingitem.js";

let showOrderIdHTML = ''


console.log(productList)
console.log(totalOrder)
cartQty()

function totalOrderHTML(){
    totalOrder.forEach(function(value){
        let html = ''
        let showOrderItem = ''
        
        let productitems = value.orderItems
        let matchingItem = ''
        productitems.forEach(function(item){
            let html2 = ''
        
            productList.forEach(function(productlist){
                
                if(item.productid === productlist.productid){
                    matchingItem = productlist
                }

            })
            html2 = `
                <div class="product-item-order-container">
                    <div class="product-img-details-container">
                        <div class="product-img-container">
                            <img class="product-img" src="${matchingItem.img}">
                        </div>
                        <div class="product-order-details-container">
                            <p class="p-bold2">${matchingItem.name}</p>
                            <p>Arriving on: ${item.deliverytime}</p>
                            <p>Quantity:${item.quantity}</p>
                            <button class="buyit-again-btn" data-productid="${matchingItem.productid}">Buy it Again</button>
                        </div>
                    </div>
                    <a href="tracking.html"><div class="track-btn-container">
                        <button class="track-btn" data-orderid="${value.orderid}" data-productid="${matchingItem.productid}">Track Package</button>
                    </div></a>

                </div>
                `

                showOrderItem = showOrderItem + html2
        
        })
        
            html = `
            <div class="order-summary-items-container">
                <div class="order-details-container">
                    <div class="order-date-qty-container">
                        <div>
                            <p class="p-bold2">Date Ordered:&nbsp;</p>
                            <p> ${value.orderDate}</p>
                        </div>
                        <div>
                            <p class="p-bold2">Total Price:&nbsp;</p>
                            <p> $${value.ordertotalprice}</p>
                        </div>
                    
                    </div>
                    <div class="order-id-container">
                        <p class="p-bold2">Order ID:&nbsp;</p>
                        <p> ${value.orderid}</p>
                    </div>
                </div>

                <div class="order-items-container">
                ${showOrderItem} 
                </div>

            </div>
            `
            showOrderIdHTML = showOrderIdHTML + html
        
    })
    document.querySelector('.ordersummary-container').innerHTML = showOrderIdHTML


    document.querySelectorAll('.track-btn').forEach(function(trackBtn){
        trackBtn.addEventListener('click', function(){
            let orderID = trackBtn.dataset.orderid
            let productID = trackBtn.dataset.productid
            let matchingItem
            let matchingItem2
            trackingReset()

            totalOrder.forEach(function(order){
               if(order.orderid === orderID){
                    matchingItem = order.orderItems
               }
            })
            matchingItem.forEach(function(value){
                if(value.productid === productID){
                    matchingItem = value
                   
                }
            })

            productList.forEach(function(product){
                if(matchingItem.productid === product.productid){
                    matchingItem2 = product
                }
            })
          
            trackingItem.push({
                orderid:orderID,
                productid:productID,
                productname:matchingItem2.name,
                productqty:matchingItem.quantity,
                deliverytime:matchingItem.deliverytime,
                deliveryoption:matchingItem.deliveryoption,
                productimg:matchingItem2.img
            })
                
            localStorage.setItem('trackingItem',JSON.stringify(trackingItem))
        }) 
    })
    document.querySelectorAll('.buyit-again-btn').forEach(function(buyitagain){
        buyitagain.addEventListener('click', function(){
            let productID = buyitagain.dataset.productid
            let matchingItem

            cart.forEach(function(value){
                if(value.productid === productID){
                    matchingItem = value
                }
            })
                if(matchingItem){
                    matchingItem.quantity = matchingItem.quantity + 1
                } else {
                    cart.push({
                        productid:productID,
                        quantity:1,
                        deliverytime:dateDelivery(7),
                        deliverycost:0,
                        deliveryoption:1})
                    
                }
                
                saveCartDatatoStorage ();
                cartQty();
            
        })
    })

} 
totalOrderHTML()


dropdownMENU();






