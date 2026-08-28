// ---------- Shared Cart Helpers (used by index.html, product.html) ----------
function getCart() {
  return JSON.parse(localStorage.getItem('auralift_cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('auralift_cart', JSON.stringify(cart));
  renderCart();
}

function addToCart(name, price) {
  const user = getCurrentUser();
  if (!user) {
    showToast('Please login first to add items to your cart.');
    setTimeout(() => window.location.href = 'account.html', 900);
    return;
  }
  const cart = getCart();
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price: parseFloat(price), qty: 1 });
  }
  setCart(cart);
  showToast(name + ' added to cart');
  openCart();
}

function removeFromCart(name) {
  setCart(getCart().filter(i => i.name !== name));
}

function changeQty(name, delta) {
  const cart = getCart();
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    setCart(cart.filter(i => i.name !== name));
  } else {
    setCart(cart);
  }
}

function renderCart() {
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartCountEl = document.getElementById('cartCount');
  if (!cartItemsEl) return;

  const cart = getCart();
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  cartCountEl.textContent = totalItems;
  cartTotalEl.textContent = '$' + totalPrice.toFixed(2);

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="text-gray-500 text-sm">Your cart is empty.</p>';
    return;
  }

  cartItemsEl.innerHTML = '';
  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between border-b pb-3';
    row.innerHTML = `
      <div class="flex-1 pr-2">
        <p class="font-medium text-sm">${item.name}</p>
        <p class="text-brand text-sm font-semibold">$${item.price.toFixed(2)}</p>
        <div class="flex items-center gap-2 mt-1">
          <button class="qtyMinus w-6 h-6 border rounded text-sm" data-name="${item.name}">−</button>
          <span class="text-sm">${item.qty}</span>
          <button class="qtyPlus w-6 h-6 border rounded text-sm" data-name="${item.name}">+</button>
        </div>
      </div>
      <button class="removeItem text-gray-400 hover:text-brand text-lg" data-name="${item.name}" aria-label="Remove item">&times;</button>
    `;
    cartItemsEl.appendChild(row);
  });

  cartItemsEl.querySelectorAll('.qtyPlus').forEach(b => b.addEventListener('click', () => changeQty(b.dataset.name, 1)));
  cartItemsEl.querySelectorAll('.qtyMinus').forEach(b => b.addEventListener('click', () => changeQty(b.dataset.name, -1)));
  cartItemsEl.querySelectorAll('.removeItem').forEach(b => b.addEventListener('click', () => removeFromCart(b.dataset.name)));
}

function openCart() {
  const user = getCurrentUser();
  if (!user) {
    showToast('Please login first to view your cart.');
    setTimeout(() => window.location.href = 'account.html', 900);
    return;
  }
  document.getElementById('cartDrawer').classList.remove('translate-x-full');
  document.getElementById('cartOverlay').classList.remove('hidden');
}
function closeCartDrawer() {
  document.getElementById('cartDrawer').classList.add('translate-x-full');
  document.getElementById('cartOverlay').classList.add('hidden');
}

// Real checkout — saves the order into the logged-in user's Purchase History
function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty.');
    return;
  }
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'account.html';
    return;
  }

  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);
  const order = {
    id: 'ORD' + Date.now(),
    date: new Date().toISOString().slice(0, 10),
    status: 'Pending',
    items: cart.map(i => ({ name: i.name, price: i.price, qty: i.qty })),
    total: total
  };

  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx > -1) {
    users[idx].orders = users[idx].orders || [];
    users[idx].orders.unshift(order);
    setUsers(users);
    setCurrentUser(users[idx]);
  }

  localStorage.removeItem('auralift_cart');
  renderCart();
  closeCartDrawer();
  showToast('Order placed! Check Purchase History in your account.');
}

// Wire up cart UI elements that exist on this page (safe no-op if missing)
document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cartBtn');
  const closeCart = document.getElementById('closeCart');
  const cartOverlay = document.getElementById('cartOverlay');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (closeCart) closeCart.addEventListener('click', closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);
  if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);

  document.querySelectorAll('.addToCartBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      addToCart(card.dataset.name, card.dataset.price);
    });
  });

  renderCart();
});