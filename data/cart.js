
export let cart = JSON.parse(localStorage.getItem('cart'));
export let productextra = []

export function saveCartDatatoStorage(){
    localStorage.setItem('cart',JSON.stringify(cart))
}
if(!cart){
    cart = []
   
}
console.log(cart)

export function removeFromCart(productID){
    let newCart = []
    
    cart.forEach(function(value){

      
        if(value.productid !== productID){
            newCart.push(value)
            
        } 
    })
    cart = newCart
    
    localStorage.setItem('cart',JSON.stringify(cart))
}

export function removeAllCart(){
    cart = []
}

export function cartQty(){
    
    let cartQuantity = 0
    cart.forEach(function(value){
        cartQuantity = cartQuantity + value.quantity
    })
    
    let elemQuantity = document.querySelector('.cart-quantity')
    let elemQuantity2 = document.querySelector('.dropdown-menu-quantity')
    
    if(cartQuantity >= 10){
        elemQuantity.classList.add('cart-quantity-container2')
    }else if (cartQuantity < 10){
        elemQuantity.classList.remove('cart-quantity-container2')
    };
    elemQuantity.innerHTML = cartQuantity;
    elemQuantity2.innerHTML = `(${cartQuantity})`
}
export function dropdownMENU(){
    document.querySelector('.section3-5').addEventListener('click',function(){
        let dropdownMenu = document.querySelector('.dropdown-menu');

        if(dropdownMenu.classList.contains('dropdown-menu-appear')){
            dropdownMenu.classList.remove('dropdown-menu-appear')
        } else {
            dropdownMenu.classList.add('dropdown-menu-appear')
        }
    })
}