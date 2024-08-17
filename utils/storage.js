// Function to get the cart from localStorage
export function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '{}');
}

// Function to save the cart to localStorage
export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add a product to the cart, including stock validation
export function addToCart(product, quantity = 1) {
    const cart = getCart();

    if (cart[product.id]) {
        // If the product exists in the cart, update its quantity if below stock
        if (cart[product.id].quantity + quantity > product.stock) {
            return "outOfStock";
        }
        cart[product.id].quantity += quantity;
    } else {
        // If the product does not exist, add it to the cart
        cart[product.id] = {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity,
            stock: product.stock
        };
    }

    saveCart(cart);
    return "success";
}

// Function to check product details from the API or a mock source
export async function getProductDetails(productId) {
    const response = await fetch(`https://668d7a51099db4c579f31799.mockapi.io/books/${productId}`);
    if (!response.ok) throw new Error('Failed to fetch product details');
    return await response.json();
}