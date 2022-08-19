/* jshint esversion: 10 */
//above comment is there for esversion 10 features

/**
* Get the id from the html page so we can make a html literal template in javascript.
*/
let shopProducts = document.getElementById('shopProducts');


/**
* All the items the user adds to their cart is placed in this array. When the page loads it searches the localStorage for any data that could alredy be in the cart, and if there is, it will display the data that is stored in the array in the cart icon and and the cart html page.
*/
let cart = JSON.parse(localStorage.getItem('cartData')) || [];
 
/**
* Rather then hard coding the product decriptions every time with HTML, I decided to make a JS function that could replicate the process of adding different products to your shopping store. I use the same HTML code template and replace the product decriptions with the relevent data everytime using the .map method with itemData as the keyword.
The data stored in the productsData[] array passes through this code, replacing the data where the itemData keyword is placed with the data stored in the productsData[] array.
*/
let createProducts = () => {
    return (shopProducts.innerHTML = productsData.map((itemData)=>{
        let {id, name, price, desc1, imgPage, readMorePage} = itemData;
        let scanCart = cart.find((itemData) => itemData.id === id) || [];
        return `
        <div class="itemsHome" id="Product-ID-${id}">
            <img src="${imgPage}" alt="${name}" width="220">
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
                <a href="${readMorePage}" class="readMore my-1 pt-1 px-3 bg-primary btn-outline-light">Read More Details</a>
            </div>
        </div>
        `;
    }).join(''));
};
createProducts();

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