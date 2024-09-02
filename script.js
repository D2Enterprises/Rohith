// Initialize cart from localStorage
function initializeCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCartItems(cart);
}

function displayCartItems(cart) {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');

    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="product.jpg" alt="${item.name}">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    totalSpan.textContent = total.toFixed(2);
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(cart);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(cart);

    // Show Dynamic Island with removal effect
    showDynamicIsland('Product removed from cart!', true);
}

function showDynamicIsland(message, isRemoval) {
    const dynamicIsland = document.querySelector('.dynamic-island');
    dynamicIsland.classList.add('show');

    if (isRemoval) {
        dynamicIsland.classList.add('remove-item');
        dynamicIsland.classList.remove('add-item');
    } else {
        dynamicIsland.classList.add('add-item');
        dynamicIsland.classList.remove('remove-item');
    }
    
    dynamicIsland.querySelector('.message').textContent = message;

    setTimeout(() => {
        dynamicIsland.classList.remove('show');
        dynamicIsland.classList.remove('add-item');
        dynamicIsland.classList.remove('remove-item');
    }, 2000); // Hide after 2 seconds
}

function navigateTo(url) {
    window.location.href = url;
}

// Event listeners for adding to cart
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if item is already in cart
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Show Dynamic Island with add effect
        showDynamicIsland('Product added to cart!', false);
    });
});

window.onload = initializeCart;
