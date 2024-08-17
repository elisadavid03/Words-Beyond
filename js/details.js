import { getProductById } from '../api/products.js';
import { addToCart } from '../utils/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const productId = new URLSearchParams(window.location.search).get('id');
    if (productId) {
        showProductDetails(productId);
    }
    handleAddToCart();
});

async function showProductDetails(productId) {
    try {
        const product = await getProductById(productId);
        document.querySelector('.main').innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.imageUrl}" width="250px" />
            <h4>${product.details}</h4>
            <p class="card-price">${product.price} €</p>
            <h5>Stock: ${product.stock}</h5>
            <div>
                <button class="add-to-cart"
                       data-id="${product.id}"
                       data-name="${product.name}"
                       data-price="${product.price}"
                       data-image="${product.imageUrl}"
                       data-stock="${product.stock}">Add to cart</button>
            </div>
            <div class="notification" style="display:none;">${product.name} has been added to your cart.</div>
        `;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

function handleAddToCart() {
    document.querySelector('.main').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const button = e.target;
            const product = {
                id: button.getAttribute('data-id'),
                name: button.getAttribute('data-name'),
                price: parseFloat(button.getAttribute('data-price')),
                imageUrl: button.getAttribute('data-image'),
                stock: parseInt(button.getAttribute('data-stock')),
            };

            const result = addToCart(product, 1);  // Add one item to cart
            if (result === "outOfStock") {
                alert('Not enough stock available.');
            } else {
                // Show notification
                const notification = document.querySelector('.notification');
                notification.innerText = `${product.name} has been added to your cart.`;
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000); // Hide after 3 seconds
            }
        }
    });
}