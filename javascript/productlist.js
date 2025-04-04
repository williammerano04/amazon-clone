import {cart , cartQty ,dropdownMENU} from '../data/cart.js';
import {productList} from '../data/products.js';
import {dateDelivery} from '../data/date.js'



let HTMLshow = ''



productList.forEach(function(value,index){
    let ratingImg = ''
    if(value.ratings <= 0){
        ratingImg = 'rating-0.png'
    } else if (value.ratings >= 50){
        ratingImg = 'rating-50.png'
    } else if (value.ratings >= 45){
        ratingImg = 'rating-45.png'
    } else if (value.ratings >= 40){
        ratingImg = 'rating-40.png'
    }  else if (value.ratings >= 35){
        ratingImg = 'rating-35.png'
    }else if (value.ratings >= 30){
        ratingImg = 'rating-30.png'
    }else if (value.ratings >= 25){
        ratingImg = 'rating-25.png'
    }else if (value.ratings >= 20){
        ratingImg = 'rating-20.png'
    }else if (value.ratings >= 15){
        ratingImg = 'rating-15.png'
    }else if (value.ratings >= 10){
        ratingImg = 'rating-10.png'
    }else if (value.ratings >= 5 || value.ratings <= 5){
        ratingImg = 'rating-05.png'
    }

    value.priceCents = (value.priceCents/100).toFixed(2)

    let quantitySelect = document.querySelector(`.quantity-selector-${value.productid}`)
    let html =''
    html = `
    <div class="productlist">
        <div class="product-img-container">
            <img class="product-img"src="${value.img}">
        </div>
        <div class="product-name-container">
            <p class="product-name">${value.name}</p>
        </div>
        <div class="product-ratings-container">
            <div class="ratings-container">
                <img class="ratings-img"src="images/ratings/${ratingImg}">
            </div>
            <div>
                <p class="ratings-number">${value.ratings}</p>
            </div>
            
        </div>
        <div>
            <p class="product-price">$${value.priceCents}</p>
        </div>
        <div class="quantity-container">
            <select class="quantity-selector-${value.productid}" name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
        <div class="added-container added-container${value.productid}">
            <img class="checkmark-logo"src="icons/checkmark.png">
            <p class="added-text">Added</p>
        </div>
        <div class="addtocart-btn-container">
            <button 
            class="addtocart-btn"
            data-productid="${value.productid}"
            >Add to Cart</button>
        </div>
        
         
    </div>
    `;
    
    
    HTMLshow = HTMLshow + html

})
document.querySelector('.productlist-container').innerHTML = HTMLshow
/*
let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
if (!cartQuantity){
    cartQuantity = 0
    localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity))
}*/

// add to cart button //

document.querySelectorAll('.addtocart-btn').forEach(function(addBtn){
    addBtn.addEventListener('click', function(){
        let productID = addBtn.dataset.productid
        let elemQty = document.querySelector(`.quantity-selector-${productID}`)
        let matchingItem;
        
        cart.forEach(function(value){
            if(value.productid === productID){
                matchingItem = value
            }
        })
            if(matchingItem){
                matchingItem.quantity = Number(matchingItem.quantity) + Number(elemQty.value)
            } else {
                cart.push({
                    productid:productID,
                    quantity:Number(elemQty.value),
                    deliverytime:dateDelivery(7),
                    deliverycost:0,
                    deliveryoption:1})
                
            }
            
         /*   console.log(cart)
        cart.forEach(function(value){
            quantity = quantity + value.quantity
        })
        cartQuantity = quantity;
        elemQuantity.innerHTML = cartQuantity    */
        
        addedHtmlAppear(productID)
        
        cartQty()
        /*localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity))*/
        localStorage.setItem('cart',JSON.stringify(cart))
    })
})
cartQty()
/*
// Cart Quantity Update //
let quantity2 = 0
if(cart.length === 0){
    cartQuantity = 0
}
cart.forEach(function(value){
   
    quantity2 = quantity2 + value.quantity
    cartQuantity = quantity2
    localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity))
    elemQuantity.innerHTML = cartQuantity 
    
    
})
elemQuantity.innerHTML = cartQuantity 



//Html cart quanttity Align if quantiy = 10 //

function htmlQtyAlign(){
    if(cartQuantity >= 10){
        elemQuantity.classList.add('cart-quantity-container2')
    }else if (cartQuantity < 10){
        elemQuantity.classList.remove('cart-quantity-container2')
    };
}

htmlQtyAlign()
*/
// Added Text Show when Clicked

let timeOut = {};
function addedHtmlAppear(productid){
    let addedHTML = document.querySelector(`.added-container${productid}`)
    
    addedHTML.classList.add('added-container-appear')
    
    if(timeOut){
        clearTimeout(timeOut)
    }

    let timeoutID = setTimeout(function(){
        addedHTML.classList.remove('added-container-appear')
    },1000)

    timeOut = {timeoutID}
    
}


dropdownMENU();

