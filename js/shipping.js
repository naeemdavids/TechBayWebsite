/* jshint esversion: 10 */
//above comment is there for esversion 10 features

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
 * Simple code for when the user fills in the shipping form about the deliver details. Makes a simple alert telling them their details have been saved.
 */
let shipDetailsSavedInternational = () => {
    alert('Your Details for International Shipping have been Saved!');
};

let shipDetailsSavedLocal = () => {
    alert('Your Details for Local Shipping have been Saved!');
};