import { getProductById } from '../api/products.js';

document.addEventListener('DOMContentLoaded', () => {
	//Load the cart from localStorage 
	const cart = JSON.parse(localStorage.getItem('cart'));
	console.log('Loaded cart:', cart);

	//Select the containers for cart items and total 
	const cartItemsContainer = document.querySelector('.cart-items');
	const cartTotalContainer = document.querySelector('.cart-total');
	const table = document.querySelector('table');

	//Function to update the cart UI
	function updateCart() {
		console.log('Updating cart...');
		cartItemsContainer.innerHTML = ''; //Clear the container 
		let total = 0;
		let cartIsEmpty = true; // Assume cart is empty initially

		//Iterate through the cart items and create UI elements 
		for (let id in cart) {
			const product = cart[id];
			cartIsEmpty = false;

			const row = document.createElement('tr');

			row.innerHTML = `
			<td>
			<a href="../pages/details.html?id=${id}">
			   <img src="${product.imageUrl}" width="90px" />
			</a>
			${product.name}
			</td>
			 <td>${product.price} €</td>
			 <td class="quantity">
			 <button data-id=${id} ${product.quantity === 1 ? 'disabled' : ''} class="decrease">-</button>
			 <span class="quantity-value">${product.quantity}</span>
			 <button data-id="${id}" class="increase">+</button>
			</td>
			<td>${(product.price * product.quantity)} €</td>
                <td><button data-id="${id}" class="delete">Remove</button></td>
			`;

			cartItemsContainer.appendChild(row);

		 //Calculate the total price 
		 total += product.price * product.quantity;
		}

	if (cartIsEmpty) {
		table.style.display ='none';
		cartTotalContainer.innerHTML = 
		total === 0 ? 'The cart is empty' : `Total: ${total.toFixed(2)} €`;
		console.log('Cart updated, total:', total);
	} else {
		table.style.display = 'table';
		cartTotalContainer.innerHTML = `Total: ${total.toFixed(2)} €`;
	}

	console.log('Cart updated, total:', total);
}

	cartItemsContainer.addEventListener('click', async (e) => {
        if (!e.target.classList.contains('increase') && !e.target.classList.contains('decrease') && !e.target.classList.contains('delete')) {
            return;
        }

        const id = e.target.getAttribute('data-id');
        if (e.target.classList.contains('increase')) {
            const productDetails = await getProductById(id).catch(error => {
                console.error('Failed to fetch product details:', error);
                alert('Could not fetch product details. Please try again later.');
                return null;
            });

            if (!productDetails || cart[id].quantity >= productDetails.stock) {
                alert('Cannot add more of this product due to stock limitations.');
                return;
            }

            cart[id].quantity += 1;
        } else if (e.target.classList.contains('decrease')) {
            if (cart[id].quantity > 1) {
                cart[id].quantity -= 1;
            } else {
                alert('Minimum quantity reached.');
                return;
            }
        } else if (e.target.classList.contains('delete')) {
            delete cart[id];
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    });

    updateCart();
});