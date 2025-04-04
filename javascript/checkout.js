import {cart, saveCartDatatoStorage, removeFromCart, removeAllCart} from "../data/cart.js";
import {productList} from "../data/products.js"
import { dateDelivery } from "../data/date.js";
import { totalOrder } from "../data/order.js";
let elemCartOrder = document.querySelector('.cart-order');
let elemCartTotal = document.querySelector('.order-total')
let elemCheckOutP = document.querySelector('.checkout-p')




let htmlCartTotal = ''


function showAllHtml (){
    let htmlCartShow = '';
    let quantity = 0
    let totalprice = 0
    
    
   
    cart.forEach(function(cartproduct,index){
    console.log(cartproduct)
    let productDetails;

        
    
    productList.forEach(function(productlist,index){

        if(productlist.productid === cartproduct.productid)
            productDetails = productlist;
            
        })
        let option1checked
        let option2checked 
        let option3checked
        if(cartproduct.deliverycost === 0){
         option1checked = true
        } else if (cartproduct.deliverycost === 4.99){
         option2checked = true
        } else if (cartproduct.deliverycost === 9.99){
         option3checked = true
        }
      
       
    let html = ''

    html = `<div class="cart-items-container">
                <div class="delivery-date-container">
                <p class="delivery-date-${cartproduct.productid}">Delivery Date: ${cartproduct.deliverytime}</p>
                </div>
                <div class="cart-items">
                    <div class="img-nameprice-container"> 
                        <div> 
                            <img class="cart-product-img"src="${productDetails.img}">
                        </div>
                        <div class="name-price-container">
                            <p class="product-name">${productDetails.name}</p>
                            <p class="product-price">$${(productDetails.priceCents/100).toFixed(2)}</p>
                            <div class="quantiy-container">
                            <p>Quantity Order:</p>
                            <p class="quantity quantity-${productDetails.productid}">${cartproduct.quantity}</p>
                            <input class="quantity-update-input quantity-update-input-${productDetails.productid}" type="number" value="${cartproduct.quantity}"> 
                            <button class="save-btn save-btn-${productDetails.productid}">Save</button>
                            <button class="update-btn update-btn-${productDetails.productid}" data-productid="${productDetails.productid}">Update</button>
                            <button class="delete-btn js-delete-btn" data-productid="${productDetails.productid}">Delete</button>
                            </div>
                            <p class="total-price">Total:$${((productDetails.priceCents/100) * cartproduct.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="delivery-option-container">
                        <div>
                            <p class="delivery-option">Delivery Option</p>
                        </div>
                        <div class="delivery-option1-container">
                            <input class="extracharge1-radiobtn extra1-${productDetails.productid}"
                            ${option1checked ? 'checked' :''}
                            id="extra1-${productDetails.productid}" 
                            
                            type="radio" 
                            data-option="${productDetails.productid}"
                            data-optiondate="${dateDelivery(7)}"
                            name="${productDetails.productid}">
                            <div class="delivery-option1">
                                <p class="date-delivery">${dateDelivery(7)}</p>
                                <p class="date-delivery-option">Free Shipping</p>
                            </div>
                        </div>
                        <div class="delivery-option2-container">
                            <input type="radio" class="extracharge1-radiobtn extra2-${productDetails.productid}"
                             ${option2checked ? 'checked' :''}
                            data-option="${productDetails.productid}"
                            data-optiondate="${dateDelivery(3)}"
                             name="${productDetails.productid}">
                            <div class="delivery-option2">
                                <p class="date-delivery">${dateDelivery(3)}</p>
                                <p class="date-delivery-option">$4.99 - Shipping</p>
                            </div>
                        </div>
                        <div class="delivery-option3-container">
                            <input type="radio" class="extracharge1-radiobtn extra3-${productDetails.productid}" name="${productDetails.productid}" 
                             ${option3checked ? 'checked' :''}
                            data-option="${productDetails.productid}" 
                            data-optiondate="${dateDelivery(1)}">
                            <div class="delivery-option3">
                                <p class="date-delivery">${dateDelivery(1)}</p>
                                <p class="date-delivery-option">$9.99 - Shipping</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            htmlCartShow = htmlCartShow + html
    
          
    quantity = quantity + cartproduct.quantity
    
    let price = 0
    
    price = (productDetails.priceCents/100) * (cartproduct.quantity).toFixed(2)
    
    totalprice = totalprice + price
    
    })

    


elemCartOrder.innerHTML = htmlCartShow;
elemCheckOutP.innerHTML = `Check Out Items (<span class="green-text">${quantity} Items</span>)`

document.querySelectorAll('.update-btn')
.forEach(function(updateBtn){
    updateBtn.addEventListener('click', function(){
        let matchingItem
        let productid = updateBtn.dataset.productid
        let quantityInput = document.querySelector(`.quantity-update-input-${productid}`)
        let quantityElem = document.querySelector(`.quantity-${productid}`)
        let upBtn = document.querySelector(`.update-btn-${productid}`)
        let saveBtn = document.querySelector(`.save-btn-${productid}`)
        saveBtn.classList.add('save-btn-appear')
        upBtn.classList.add('update-btn-disappear')
        quantityInput.classList.add('quantity-update-input-appear')
        quantityElem.classList.add('quantity-disappear')

        cart.forEach(function(value){
            if(value.productid === productid){
                matchingItem = value
            }
        })
            
                saveBtn.addEventListener('click', function(){
                    if(quantityInput.value < 0){
                        alert('Quantity Invalid')
                    } else if(quantityInput.value === '0'){
                        removeFromCart(productid)
                        console.log(cart)
                    }
                    else {
                    matchingItem.quantity = Number(quantityInput.value)
                    console.log(cart)
                    saveBtn.classList.remove('save-btn-appear')
                    upBtn.classList.remove('update-btn-disappear')
                    quantityInput.classList.remove('quantity-update-input-appear')
                    quantityElem.classList.remove('quantity-disappear')
                    
                    }
                    showAllHtml ()
                    showOrdertotal()
                    saveCartDatatoStorage()
                })      
                
    })
})


document.querySelectorAll('.extracharge1-radiobtn')
.forEach(function(extracharge){
    extracharge.addEventListener('click', function(){
        let option = extracharge.dataset.option
        let optiondate = extracharge.dataset.optiondate
        let charge = 0
        let deliveryoption = 1
        let matchingItem;
        let deliveryTime = document.querySelector(`.delivery-date-${option}`)
        deliveryTime.innerHTML = `Delivery Date: ${optiondate}`
        if(optiondate === dateDelivery(7)){
            charge = 0
            deliveryoption = 1
        } else if (optiondate === dateDelivery(3)){
            charge = 499/100
            deliveryoption = 2
        } else if (optiondate === dateDelivery(1)){
            charge = 999/100
            deliveryoption = 3
        }
        cart.forEach(function(value){
            if(value.productid === option){
                matchingItem = value
            }
        })
        if (matchingItem){
            matchingItem.deliverytime = optiondate
            matchingItem.deliverycost = charge
            matchingItem.deliveryoption = deliveryoption
        }
        console.log(cart)
        showOrdertotal()
        saveCartDatatoStorage()
        
    })
    
})
document.querySelectorAll('.js-delete-btn')
.forEach((deleteBtn) =>{
    deleteBtn.addEventListener('click', ()=>{
        let productID = deleteBtn.dataset.productid
       
       removeFromCart(productID);
       
       showAllHtml ()
       showOrdertotal()
       
    })
});
    

}
showAllHtml ()

function showOrdertotal(){
    let quantity = 0
    let totalprice = 0
    let shippingcost = 0
    cart.forEach(function(value){
        let matchingItem
        let producttotalprice = 0
        quantity = quantity + value.quantity

        productList.forEach(function(product){
            if(value.productid === product.productid){
                matchingItem = product
            }
        })
        
        shippingcost = shippingcost + value.deliverycost
        producttotalprice = value.quantity * (matchingItem.priceCents/100)
        totalprice = totalprice + producttotalprice
    })
    elemCartTotal.innerHTML = 
    `   
        <div class="order-summary-container">
            <p>Order Summary</p>
        </div>
        <div class="ordertotal1">
            <p>Items(${quantity})</p>
            <p>$${(totalprice).toFixed(2)}</p>
        </div>
        <div class="ordertotal1">
            <p>Shipping & Handling:</p>
            <p>$${shippingcost.toFixed(2)}</p>
        </div>
        <div class="ordertotal1">
            <p>Total before tax</p>
            <p>$${((totalprice)+(shippingcost)).toFixed(2)}</p>
        </div>
            <div class="ordertotal1">
            <p>Estimated tax (10%)</p>
            <p>$${((totalprice+shippingcost)*0.10).toFixed(2)}</p>
        </div>
            <div class="ordertotal2">
            <p>Order Total:</p>
            <p>$${((totalprice)+(shippingcost)+((totalprice+shippingcost)*0.10)).toFixed(2)}</p>
        </div>
            <div class="order-button-container-disabled">
                <button class="order-button-disabled">Place Your Order</button>
            </div>
            <a href="ordersummary.html" style="text-decoration:none"
            <div class="order-button-container">
                <button class="order-button">Place Your Order</button>
            </div></a>
             

            
        


    `;

    let orderBtnDisabled = document.querySelector('.order-button-container-disabled')
    let orderBtn= document.querySelector('.order-button-container')
    
    document.querySelector('.order-button').addEventListener('click', function(){
        let randomID = crypto.randomUUID()
        
        totalOrder.push({
            orderid:randomID,
            orderDate:dateDelivery(0),
            orderItems:cart,
            ordertotalQty:quantity,
            ordertotalprice:((totalprice)+(shippingcost)+((totalprice+shippingcost)*0.10)).toFixed(2)
            }
        )
        localStorage.setItem('totalOrder',JSON.stringify(totalOrder))
        removeAllCart();
        saveCartDatatoStorage();
    })

    if(cart.length === 0){
        orderBtnDisabled.classList.add('order-button-container-disabled-appear')
        orderBtn.classList.add('order-button-container-disappear')
    } else {
        orderBtn.classList.remove('order-button-container-disappear')
        orderBtnDisabled.classList.remove('order-button-container')
    }
}
showOrdertotal()




