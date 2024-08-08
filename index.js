import { getAllProducts } from './api/products.js';
import { mapProductToCard } from './utils/layout.js';

//Ensure the DOM is fully loaded before running the script 
document.addEventListener('DOMContentLoaded', () => {
    displayAllProducts();
});

//Async function to fetch and display products
async function displayAllProducts() {
    const mainContainer = document.querySelector('.main');
    const products = await getAllProducts();

    //Render products
    mainContainer.innerHTML = products.map(mapProductToCard).join(' ');

    // Add event listeners to the buttons after the products are displayed
    addEventListenersToButtons();
}

//Function to add event listeners to the "Add to cart" button
function addEventListenersToButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    console.log('Add to cart buttons:', addToCartButtons); // Log buttons for debugging 
    
    //Attach click event listener to each "Add to cart" button 
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            console.log('Button clicked:', button); // Log button click for debugging

            //Retrieve product information from data attributes
            const productId = button.getAttribute('data-id');
            const price = button.getAttribute('data-price');
            const name = button.getAttribute('data-name');
            const imageUrl = button.getAttribute('data-image');

            //Get the current cart from localStorage or initialize it 
            let cart = JSON.parse(localStorage.getItem('cart')) || {};

            //Update the cart: increment quantity if product exists, otherwise add new product
            if (cart[productId]) {
                cart[productId].quantity += 1;
            } else {
                cart[productId] = {
                    quantity: 1,
                    price: price,
                    name: name,
                    imageUrl: imageUrl,
                };
            }

            //Save the updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Product added to cart:', cart); //Log the updated cart for debugging
        });
    });
}
