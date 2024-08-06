import { getAllProducts } from './api/products.js';
import { mapProductToCard } from './utils/layout.js';

document.addEventListener('DOMContentLoaded', () => {
    displayAllProducts();
});

async function displayAllProducts() {
    const mainContainer = document.querySelector('.main');
    const products = await getAllProducts();
    mainContainer.innerHTML = products.map(mapProductToCard).join(' ');

    // Add event listeners to the buttons after the products are displayed
    addEventListenersToButtons();
}

function addEventListenersToButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    console.log('Add to cart buttons:', addToCartButtons); // Log buttons

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            console.log('Button clicked:', button); // Log button click

            const productId = button.getAttribute('data-id');
            const price = button.getAttribute('data-price');
            const name = button.getAttribute('data-name');
            const imageUrl = button.getAttribute('data-image');

            let cart = JSON.parse(localStorage.getItem('cart')) || {};
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

            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Product added to cart:', cart);
        });
    });
}
