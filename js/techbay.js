/* jshint esversion: 10 */
//above comment is there for esversion 10 features

/**
 * Get the id from the html page so we can make a html literal template in javascript.
 */
let latestProducts = document.getElementById('latestProducts');


/**
 * All the items the user adds to their cart is placed in this array. When the page loads it searches the localStorage for any data that could alredy be in the cart, and if there is, it will display the data that is stored in the array in the cart icon and and the cart html page.
 */
let cart = JSON.parse(localStorage.getItem('cartData')) || [];

/**
 * Rather then hard coding the product decriptions every time with HTML, I decided to make a JS function that could replicate the process of adding different products to your shopping store. I use the same HTML code template and replace the product decriptions with the relevent data everytime using the .map method with itemData as the keyword.
 The data stored in the productsData[] array passes through this code, replacing the data where the itemData keyword is placed with the data stored in the productsData[] array.
 The .slice method allows us to draw only the first 4 items of the productsData[] array.
 */
let createLatestProducts = () => {
    return (latestProducts.innerHTML = productsData.slice(0,4).map((itemData)=>{
        let {id, name, price, desc1, img, readMore} = itemData;
        let scanCart = cart.find((itemData) => itemData.id === id) || [];
        return `
        <div class="itemsHome" id="Product-ID-${id}">
            <h5><span class="newTag">New!</span></h5>
            <img src="${img}" alt="${name}" width="220">
            <div class="description">
                <h6>${name}</h6>
                <p>${desc1}</p>
                <div class="price d-flex text-center">
                    <h5 class="mx-2">R ${price}</h5>
                    <div class="priceButtons d-flex mx-2">
                        <i class="bi bi-cart4"></i>
                        <i onclick="decreaseAmount(${id})" class="bi bi-dash-lg btn-outline-dark plusMinusButtons"></i>
                        <div class="cartAmount" id="${id}">${scanCart.item === undefined? 0 : scanCart.item}</div>
                        <i onclick="increaseAmount(${id})" class="bi bi-plus-lg btn-outline-dark plusMinusButtons"></i>
                    </div>
                </div>
            </div>
            <div class="text-center readMoreBlock">
                <a href="${readMore}" class="readMore my-1 pt-1 px-3 bg-primary btn-outline-light">Read More Details</a>
            </div>
        </div>
        `;
    }).join(''));
};
createLatestProducts();


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
};


/**
 * The cartTotal() function is called whenever the updateAmount() function is called. This function displays the total number of items altogether in the cart. It uses the .reduce method since the values are stored in an array, this being cart[]. The value x is the accumulated amount while the y value is the current value being added to the accumulated amount, 0 is the initial amount that the function starts with. Each time a new item is added(this being the y value of the array), its added to the x value(this being the accumulated amount).
 */
let cartTotal = () => {
    let cartAmountIcon = document.getElementById('cartAmountIcon');
    cartAmountIcon.innerHTML = cart.map((inCart) => inCart.item).reduce((x, y) => x + y, 0);
};
cartTotal();


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
 * The array where the users email address and name are stored. Although it is stored it is never actually used other then to confirm the fact that the user filled in the submit form.
 */
let submitDetailsArray = JSON.parse(localStorage.getItem('submitDetails')) || [];


/**
 * This function runs when the use clicks the submit button in the form. This function first checks to see if the are any blank spaces in the form. If there is it will tell the user. When the form is filled in and then submited, the data will be collected and stored in an array in the local storage. It also sets a key being 'areDetailsSubmitted' with a value of 'yes' which is then later used by the getDiscountCoupon() function to see if the users details has been submitted before giving the user a Discount Coupon.
 */
let submitCouponBlankCheck = () => {
    let emailAddress = document.getElementById('emailAddress');
    let yourName = document.getElementById('yourName');

    if(emailAddress.value == ""){
        alert('Please Enter your Email Address');
        emailAddress.style.borderColor = 'red';
        return false;
    }
    else if(yourName.value == ""){
        alert('Please Enter your Name');
        yourName.style.borderColor = 'red';
        return false;
    }
    else{
        let submitDetails = {
            emailAddress: emailAddress.value,
            yourName: yourName.value
        };
        submitDetailsArray.push(submitDetails);
        
        localStorage.setItem('submitDetails', JSON.stringify(submitDetailsArray));

        let areDetailsSubmitted = 'yes';
        localStorage.setItem('areDetailsSubmitted', JSON.stringify(areDetailsSubmitted));
        
        alert('Thank you for Submitting your Details!');
        return false;
    }
};



/**
 * This code is activated by the user when they click the "Get My Coupon" button on tech bays home page. As the name implies, it gives the user 1 discount coupon after they fill their details in the Discount Coupon form, the coupon is stored in the user's local storage. Only one will be given, if JS detects that you already have a coupon in the local storage then it will not give you one.
 */
let getDiscountCoupon = () => {
    let areDetailsSubmitted = JSON.parse(localStorage.getItem('areDetailsSubmitted')) || [];

    let discountCoupon = JSON.parse(localStorage.getItem('coupon')) || [];
    
    /**
     * This conditional statement first checks if the discount form has been filled in and submitted.
     */
    if(areDetailsSubmitted === 'yes'){
        if(discountCoupon === 1){
            alert("You Already Got A Discount Coupon This Month!!!");
        }
        else{
            discountCoupon++;
            localStorage.setItem('coupon', JSON.stringify(discountCoupon));
            alert("You Got A Discount Coupon!!!");
        }
    }
    else{
        alert('Please fill in your details in the form Above!');
        alert('Then Click Submit!');
    }
};



/**
 * This code is for The drop down menu that uses jquery.
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


/**
 * This uses a show and hide jquery function for the Read More buttons that show and hide themselves when the user hovers over a item block.
 */
$(document).ready(function(){
    $('.itemsHome').hover(function(){
        $(this).find('.readMore').show(300);
    }, function(){
        $(this).find('.readMore').hide(300);
    });
});



/**
 * Jquery code used to animate the upper animation on the tech bay home page, uses a while loop to accomplish this task. 
 */
let counter = 1;
while(counter < 1000){
    
    $('#content-before').animate({
        width: '200px',
        height: '100px',
    }, 3000);

    $('#content-before').animate({
        width: '1200px',
        height: '100px',
    }, 3000);

    $('#content-after').animate({
        width: '1200px',
        height: '100px',
    }, 3000);

    $('#content-after').animate({
        width: '200px',
        height: '100px',
    }, 3000);
    
    counter++;
}

















