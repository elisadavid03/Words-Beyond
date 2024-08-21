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
        <div class="product-container">
           <div class="product-images">
              <img src="${product.imageUrl}" width="250px" alt="Product Image" class="main-image" />
        </div>
        <div class="product-content">
        <div class="details"> 
             <h2>${product.name}</h2>
             <h3>${product.details}</h3>
        </div>
        <div class="product-details">
            <p class="card-price">${product.price.toFixed(2)} €</p>
            <h5>Available Stock: ${product.stock} pcs. </h5>
            <div class="quantity-section">
            <label for ="quantity"> Quantity: </label>
            <input type="number" id="quantity" name="quantity" value="1" min="1" max="${product.stock}" class="quantity-input">
            </div>
                <button class="add-to-cart"
                       data-id="${product.id}"
                       data-name="${product.name}"
                       data-price="${product.price}"
                       data-image="${product.imageUrl}"
                       data-stock="${product.stock}">Add to cart</button>
                <div class="notification" style="display:none;">${product.name} has been added to your cart.</div>
             </div>
        </div>
    </div>
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

            const quantityInput = document.getElementById('quantity');
            const quantity = parseInt(quantityInput.value); 

            if (quantity > product.stock) {
                alert('Not enough stock available.'); 
                return;
            }

            const result = addToCart(product, quantity);  // Add the specified quantity to cart

            if (result === "outOfStock") {
                alert('Not enough stock available.');
            } else {
                // Show notification
                const notification = document.querySelector('.notification');
                notification.innerText = `${quantity} x ${product.name} has been added to your cart.`;
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000); 
            }
        }
    });
}
