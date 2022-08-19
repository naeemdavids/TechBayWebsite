/* jshint esversion: 10 */
//above comment is there for esversion 10 features

/**
* First we get the various ID's from the html page that we will be using throughout this script.
*/
let discountCouponAmount = document.getElementById('discountCouponAmount');

let deliveryMethod = document.getElementById('deliveryMethod');

let emptySpace = document.getElementById('emptySpace');

let fullCart = document.getElementById('fullCart');


/**
 * All the items the user adds to their cart is placed in this array. When the page loads it searches the localStorage for any data that could alredy be in the cart, and if there is, it will display the data that is stored in the array in the cart icon and and the cart html page.
 */
let cart = JSON.parse(localStorage.getItem('cartData')) || [];


/**
 * The cartTotal() function is called whenever the updateAmount() function is called. This function displays the total number of items altogether in the cart. It uses the .reduce method since the values are stored in an array, this being cart[]. The value x is the accumulated amount while the y value is the current value being added to the accumulated amount, 0 is the initial amount that the function starts with. Each time a new item is added(this being the y value of the array), its added to the x value(this being the accumulated amount).
 */
 let cartTotal = () => {
    let cartAmountIcon = document.getElementById('cartAmountIcon');
    cartAmountIcon.innerHTML = cart.map((inCart) => inCart.item).reduce((x, y) => x + y, 0);
};
cartTotal();

/**
 * This code is used to display the items in your cart. The function creates the cards in the cart by getting the data of the products from the productsData[] array and displaying it via the function below as a html template literal. In this way the cards are created whenever something is added to the cart[]. This function draws its data from the productsData[]. If nothing is found in the cart[], then it simply returns a empty array.
 */
let createItemsInCart = () => {
    if(cart.length !==0){
        return (fullCart.innerHTML = cart.map((inCartX)=>{
            let {id, item} = inCartX;
            let scanCart = productsData.find((inCartY) => inCartY.id === id) || [];
            return `
            <div class="cartItem d-flex">
                <img src="${scanCart.imgPage}" alt="" width="180">
                <div class="description">
                    <i class="bi bi-x-lg xBox btn-outline-dark" onclick="removeCartItem(${id})"></i>
                    
                    <div class="details d-flex">
                      <h5 class="d-flex nameAndPrice">
                            <p>${scanCart.name}</p>
                            <p class="cartPrice">R ${scanCart.price}</p>
                        </h5>
                    </div>
                    
                    <div class="priceButtons d-flex mx-2">
                        <i class="bi bi-cart4"></i>
                        <i onclick="decreaseAmount(${id})" class="bi bi-dash-lg btn-outline-dark plusMinusButtons"></i>
                        <div class="cartAmount" id="${id}">${item}</div>
                        <i onclick="increaseAmount(${id})" class="bi bi-plus-lg btn-outline-dark plusMinusButtons"></i>
                    </div>
                    
                    <div class="d-flex">
                        <p>Quantity Price:</p>
                        <p class="itemsQuantity mx-1">R ${item * scanCart.price}</hp>
                    </div>
                </div>
            </div>
            `;
        }).join(''));
    } else{
        /**
         *If the cart is empty, this code will be displayed instead. 
        */
        fullCart.innerHTML = ``;
        emptySpace.innerHTML = `
        <h1>YOUR CART IS EMPTY!</h1>
        <a href="../Tech Bay Homepage.html">
            <button class="backHomeBtn btn btn-outline-dark">Back To Home</button>
        </a>
        <div>
            <img src="../images/empty-sign.png" alt="empty-sign" width="400px">
        </div>
        `;
    }
};
createItemsInCart();

/**
* We use the .find method and a conditional statement to search the cart[] array and look if there are already items in the cart[], if there are none, then the cart.push will be activated, adding that item to the cart[]. But if the item already exists in the cart[], then that item will only be incremented by 1. Thanks to each items unique id, javascript can tell which item is already in the cart[] and which only needs to be increased by one.
*/
let increaseAmount = (id) => {
    let cartItem = id;
    let scanCart = cart.find((inCart) => inCart.id === cartItem.id);
    
    if(scanCart === undefined){
        cart.push({
            id: cartItem.id,
            item: 1,
        });
    } else {
        scanCart.item += 1;
    }
    
    createItemsInCart();
    
    updateAmount(cartItem.id);
    
    localStorage.setItem('cartData', JSON.stringify(cart));

    alertTotal();
};


/**
* The process for this one is the same as the increaseAmount() function, only this time instead of incrementing by 1, we are decrementing by 1.
The moment the item in the cart hits 0, the if statement will give return instead, stopping the whole decrementing function, in this case at 0.
*/
let decreaseAmount = (id) => {
    let cartItem = id;
    let scanCart = cart.find((inCart) => inCart.id === cartItem.id);
    
    if (scanCart === undefined) return;
    else if(scanCart.item === 0) return;
    else {
        scanCart.item -= 1;
    }
    
    updateAmount(cartItem.id);
    
    cart = cart.filter((inCart) => inCart.item !== 0);
    
    createItemsInCart();
    
    localStorage.setItem('cartData', JSON.stringify(cart));

    alertTotal();
};


/** 
 * The updateAmount() function is called when ever the user increases or decreases the quantity of the selected item in their cart, this function then displays that number to the user on the web page(GUI). The function first looks in the cart and if the item already exists in the cart, then the number will increase(or decrease). This code uses each items unique ID to target that specific item.
*/
let updateAmount = (id) => {
    let scanCart = cart.find((inCart)=>inCart.id === id);
    document.getElementById(id).innerHTML = scanCart.item;
    cartTotal();
    totalCartBill();
};

/**
 * As the name implies, this functions purpose is to remove a whole specific item regardless of how much of it is in cart whenever the X button of the items card is pressed in cart. 
 */
let removeCartItem = (id) => {
    let cartItem = id;
    cart = cart.filter((inCart) => inCart.id !== cartItem.id);

    createItemsInCart();

    totalCartBill();

    cartTotal();

    localStorage.setItem('cartData', JSON.stringify(cart));
};





/**
 * As the name implies, this function collects the price data of the items stored in the cart[] and adds all their values together using the array .reduce method. This includes the amount of each specific item in the cart. After the total price is collected it displyed on the html page. If there is nothing in the cart it simply displays nothing.
 * It also displays data such as the Vat, Discount reduction amount and delivery cost. This all culminates into 1 single total cart bill. 
 */
let totalCartBill = () => {
    if (cart.length !== 0) {
        let bill = cart.map((incartX) => {
            let { item, id} = incartX;
            let scanCart = productsData.find((inCartY) => inCartY.id === id) || [];
            return item * scanCart.price;
        }).reduce((x,y) => x + y, 0);
    

        let vat = bill * 15/100;
        
        /**
         * Gets the various information stored in the user's local storage to see what method of delivery the user used and if if they used a discount coupon or not.
        */
        let discountReductionValue = JSON.parse(localStorage.getItem('discountReductionValue')) || [];
        let discountPrice = bill * discountReductionValue/100;

        let deliveryMethodStorage = JSON.parse(localStorage.getItem('deliveryMethodStorage')) || [];
        let deliveryMethodWay = 'None';
        let deliveryMethodPrice = 0;

        /**
         * The conditional statements here determine what method of delivery is being used and displays it to the user.
        */
        if(deliveryMethodStorage === 'international' || 'local'){
            if(deliveryMethodStorage === 'international'){
                deliveryMethodWay = 'R 750 (International)';
                deliveryMethodPrice = 750;
            }
            else if(deliveryMethodStorage === 'local'){
                deliveryMethodWay = 'R 100 (Local)';
                deliveryMethodPrice = 100;
            }
            else{
                deliveryMethodWay = 'None (Collection)';
                deliveryMethodPrice = 0;
            }
        }
        
        /**
         * Displays all the necessary data to the user concerning the user's cart bill, the user's vat, if discount coupon is applied and the deliver method.
        */
        emptySpace.innerHTML = `
            <div>
                <h2>Cart Bill: R ${bill}</h2>
                <h4>Vat : R ${vat}</h4>
                <h4>Delivery Cost : ${deliveryMethodWay}</h4>
                <h4>Discount Reduction : R ${discountPrice}</h4>
                <h2>Total Cart Bill (Delivery&VAT.incl): R ${bill + vat + deliveryMethodPrice - discountPrice}</h2>
                <button class="checkout btn btn-outline-dark" onclick="checkout()">Checkout</button>
                <button class="clearCart btn btn-outline-dark" onclick="clearCart()">Clear Cart</button>
            </div>
        `;
    } else return;
};
totalCartBill();


/**
 * As the function name says, it clears the cart when the user clicks the clear cart button. It makes the cart[] array equal to an empty array in the local storage. Then updats all the relevent functions.
 */
let clearCart = () => {
    cart = [];
    
    createItemsInCart();
    
    cartTotal();
    
    localStorage.setItem('cartData', JSON.stringify(cart));
};



/**
 * Alert function for whenever a new item is added to the cart. It will make a alert and display the total bill of your cart whenever a new item is added or removed.
 */
 let alertTotal = () => {
    let bill = cart.map((incartX) => {
        let { item, id} = incartX;
        let scanCart = productsData.find((inCartY) => inCartY.id === id) || [];
        return item * scanCart.price;
    }).reduce((x,y) => x + y, 0);
    alert('Your Total Bill is Now : R'+ ' ' + bill);
};



/**
 * Shows the user if they have a discount coupon or not. It looks in the user's local storage to see if they have a discount coupon and dispalys how much they have.
 */
let showDiscount = () => {
    let discountCoupon = JSON.parse(localStorage.getItem('coupon')) || [];

    if(discountCoupon <= 0){
        discountCouponAmount.innerHTML = `
        <p>0</p>
        `;
    }
    else{
        discountCouponAmount.innerHTML = `
        ${discountCoupon}
        `;
    }
};
showDiscount();

/**
 * Code that runs when the pade loads. It checks to see if the user had already enabled the discount coupon the last time the user had use this webpage and then shows to the user on the browser that it is ON or OFF.
 * This is needed if the user exits the browser and then returns expecting the page to look exactly how they left it.
 */
let isDiscountReductionOn = () => {
    let discountReductionValue = JSON.parse(localStorage.getItem('discountReductionValue')) || [];

    if(discountReductionValue === 10){
        document.getElementById('discountOnOff').innerHTML='ON';
    }
    else{
        document.getElementById('discountOnOff').innerHTML='OFF';
    }
};


/**
 * Acivates the discount coupon when the user clicks the enable discount coupon button. It first looks in local storage to see if the user has a discount coupon. If the user has one, the discount reduction value of 10% will be stored in the local storage to be used by the totalCartBill() for the final calculations in reducing the carts overall prive by 10%. If there is no discount coupon in the local storage JS will then make a alert instead that tells the user they have no coupon.
 */
let enableDiscount = () => {
    let discountCoupon = JSON.parse(localStorage.getItem('coupon')) || [];
    let discountReductionValue = JSON.parse(localStorage.getItem('discountReductionValue')) || [];
    
    if(discountCoupon === 1){
        document.getElementById('discountOnOff').innerHTML='ON';
        
        discountReductionValue = 10;
        
        localStorage.setItem('discountReductionValue', JSON.stringify(discountReductionValue));
    }
    else{
        alert("You Don't Hava A Discount Coupon!!!");
        alert('You Can Get One On Tech Bay Home Page!');
    }

    totalCartBill();
};

/**
 * If the user has the discount value of 10% on, then this code simply turns it into zero instead. If the discount value is not on, then it still returns zero.
 */
let disableDiscount = () => {
    document.getElementById('discountOnOff').innerHTML='OFF';
    
    let discountReductionValue = JSON.parse(localStorage.getItem('discountReductionValue')) || [];
        
    discountReductionValue = 0;
    
    localStorage.setItem('discountReductionValue', JSON.stringify(discountReductionValue));

    totalCartBill();
};



/**
 * This code shows the user what delivery they are using. It gets this information from the local storage where the method that the user chose is stored.
 */
let showDeliveryMethod = () => {
    let deliveryMethodStorage = JSON.parse(localStorage.getItem('deliveryMethodStorage')) || [];

    if(deliveryMethodStorage === 'international'){
        deliveryMethod.innerHTML='International Delivery';
    }
    else{
        deliveryMethod.innerHTML='Local Delivery';
    }
};
showDeliveryMethod();


/**
 * This code runs when the user chooses local delivery. It goes into the local storage and looks for the 'deliveryMethodStorage' key where it then changes it's value to 'local'. If there is no array yet, it makes one.
 */
let deliveryLocal = () => {
    let deliveryMethodStorage = JSON.parse(localStorage.getItem('deliveryMethodStorage')) || [];
    
    deliveryMethodStorage = 'local';

    deliveryMethod.innerHTML='Local Delivery';

    localStorage.setItem('deliveryMethodStorage', JSON.stringify(deliveryMethodStorage));

    totalCartBill();
};


/**
 * This code runs when the user chooses international delivery. It goes into the local storage and looks for the 'deliveryMethodStorage' key where it then changes it's value to 'international'. If there is no array yet, it makes one.
 */
let deliveryInternational = () => {
    let deliveryMethodStorage = JSON.parse(localStorage.getItem('deliveryMethodStorage')) || [];
    
    deliveryMethodStorage = 'international';

    deliveryMethod.innerHTML='International Delivery';

    localStorage.setItem('deliveryMethodStorage', JSON.stringify(deliveryMethodStorage));

    totalCartBill();
};


/**
 * If there user clicks on Collection instead. This code goes into the local storage and looks for the 'deliveryMethodStorage' key where it then changes it's value to 'none'. If there is no array yet, it makes one. It also fades out the delivery options block. This is the default value when the page first loads.
 */
let receivingCollection = () => {
    let deliveryMethodStorage = JSON.parse(localStorage.getItem('deliveryMethodStorage')) || [];

    deliveryMethodStorage = 'none';

    localStorage.setItem('deliveryMethodStorage', JSON.stringify(deliveryMethodStorage));

    $('.deliveryMethodBlock').fadeOut(400);
    
    totalCartBill();
};


/**
 * Fades in the delivery options block when the user clicks on delivery instead of collection. Collection is the default value though so it hidden away until the user clicks receiving their items via delivery.
 */
let receivingDelivery = () => {
    $('.deliveryMethodBlock').fadeIn(600);
};


/**
 * This code generates a unique code for the user when they checkout their cart.
 */
let checkout = () => {
    let keyword = Math.floor(Math.random() * 10000000000) + 10000000;

    alert('Your Order has been Processed!');
    alert('Your Order Reference Number Is: ' + keyword);
};



/**
 * This is The drop down menu that uses jquery.
 */
$(function(){
    $('.main li').hover(
        function(){
            $('ul.sub',this).slideDown(500);
        },
        function(){
            $('ul.sub',this).slideUp(380);
        }
    );
});