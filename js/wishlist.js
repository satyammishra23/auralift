// ---------- Shared Wishlist Helpers ----------
// Wishlist is stored per-user (inside the same users array auth.js manages).

function toggleWishlist(name, price) {
  const user = getCurrentUser();
  if (!user) {
    showToast('Please login first to use your wishlist.');
    setTimeout(() => window.location.href = 'account.html', 900);
    return;
  }

  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx === -1) return;

  users[idx].wishlist = users[idx].wishlist || [];
  const existingIndex = users[idx].wishlist.findIndex(w => w.name === name);

  let added;
  if (existingIndex > -1) {
    users[idx].wishlist.splice(existingIndex, 1);
    added = false;
  } else {
    users[idx].wishlist.push({ name, price: parseFloat(price) });
    added = true;
  }

  setUsers(users);
  setCurrentUser(users[idx]);
  showToast(added ? name + ' added to wishlist' : name + ' removed from wishlist');
  updateWishlistIcons();
}

function isInWishlist(name) {
  const user = getCurrentUser();
  if (!user) return false;
  return (user.wishlist || []).some(w => w.name === name);
}

// Fills every heart icon on the page (product-card elements) to reflect
// whether that product is currently in the logged-in user's wishlist.
function updateWishlistIcons() {
  document.querySelectorAll('.wishlistBtn').forEach(btn => {
    const card = btn.closest('.product-card');
    if (!card) return;
    const svg = btn.querySelector('svg');
    if (isInWishlist(card.dataset.name)) {
      btn.classList.add('text-brand');
      svg.setAttribute('fill', 'currentColor');
    } else {
      btn.classList.remove('text-brand');
      svg.setAttribute('fill', 'none');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.wishlistBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.product-card');
      toggleWishlist(card.dataset.name, card.dataset.price);
    });
  });
  updateWishlistIcons();
});