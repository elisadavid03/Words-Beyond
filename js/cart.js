import { getProductById } from '../api/products.js';

document.addEventListener('DOMContentLoaded', () => {
	//Load the cart from localStorage 
	const cart = JSON.parse(localStorage.getItem('cart'));
	console.log('Loaded cart:', cart);

	//Select the containers for cart items and total 
	const cartItemsContainer = document.querySelector('.cart-items');
	const cartTotalContainer = document.querySelector('.cart-total');

	//Function to update the cart UI
	function updateCart() {
		console.log('Updating cart...');
		cartItemsContainer.innerHTML = ''; //Clear the container 
		let total = 0;

		//Iterate through the cart items and create UI elements 
		for (let id in cart) {
			const product = cart[id];

			const productCard = document.createElement('div');
			productCard.className =
				'flex justify-between items-center w-300 border-bottom';
			const descreaseDisabled = product.quantity === 1 ? 'disabled' : ''; //Disable decrease button if quantity is 1 

			//Create the product card HTML
			productCard.innerHTML = `
			<img width="20px" src="${product.imageUrl}" />
				<div class="w-150 h-40 flex gap-20 justify-between items-center">
            	<span>${product.name}</span>
            	<div>
						<button data-id=${id} ${descreaseDisabled} class="decrease">-</button>
						<span>${product.quantity}</span>
						<button data-id="${id}" class="increase">+</button>
            	</div>
				</div>
				<span>${product.price * product.quantity} €</span>
				<button data-id="${id}" class="delete">Sterge</button>
         `;

		 //Calculate the total price 
			total = total + product.price * product.quantity;
			cartItemsContainer.appendChild(productCard); //Add the product card to the container 
		}

		// Update the total container with the total price or empty cart message
		cartTotalContainer.innerHTML =
			total === 0 ? 'The cart is empty' : `Total: ${total} €`;
			console.log('Cart updated, total:', total);
	}

	// Update the total container with the total price or empty cart message
	cartItemsContainer.addEventListener('click', (e) => {
		if (e.target.classList.contains('increase')) {
			const id = e.target.getAttribute('data-id'); // Get the product ID from the button
			cart[id].quantity += 1;
		} else if (e.target.classList.contains('decrease')) {
			const id = e.target.getAttribute('data-id');
			cart[id].quantity -= 1;
		} else if (e.target.classList.contains('delete')) {
			const id = e.target.getAttribute('data-id');
			delete cart[id];
		}
		// Save the updated cart to localStorage and update the UI
		localStorage.setItem('cart', JSON.stringify(cart));
		updateCart();
	});

	// Initial call to update the cart UI
	updateCart();
});