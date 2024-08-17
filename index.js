import { getAllProducts } from '../api/products.js';
import { mapProductToCard } from '../utils/layout.js';
import { getCart, saveCart, } from '../utils/storage.js'; 

document.addEventListener('DOMContentLoaded', () => {
    displayAllProducts();
});

async function displayAllProducts() {
    const mainContainer = document.querySelector('.main');
    const products = await getAllProducts();
    mainContainer.innerHTML = products.map(mapProductToCard).join(' ');
    addEventListenersToButtons(products);
}

function addEventListenersToButtons(products) {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', async () => {  // Make the function async to handle product fetching
            const productId = button.getAttribute('data-id');
            const product = products.find(p => p.id === productId);

            // Get the current cart from localStorage or initialize it
            let cart = getCart();  // Utilize getCart from storage.js

            if (cart[productId] && cart[productId].quantity >= product.stock) {
                alert('Not enough stock available.');
                return;  // Prevent adding beyond available stock
            }

            // Update the cart: increment quantity if product exists, otherwise add new product
            if (cart[productId]) {
                cart[productId].quantity += 1;
            } else {
                cart[productId] = {
                    quantity: 1,
                    price: product.price,
                    name: product.name,
                    imageUrl: product.imageUrl,
                };
            }

            // Save the updated cart back to localStorage
            saveCart(cart);  // Utilize saveCart from storage.js
            console.log('Product added to cart:', cart); // Log the updated cart for debugging
        });
    });
}

