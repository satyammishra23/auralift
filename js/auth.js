// ---------- Shared Auth Helpers (used by every page) ----------
function getUsers() {
  return JSON.parse(localStorage.getItem('auralift_users') || '[]');
}
function setUsers(users) {
  localStorage.setItem('auralift_users', JSON.stringify(users));
}
function setCurrentUser(user) {
  localStorage.setItem('auralift_current', JSON.stringify(user));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('auralift_current') || 'null');
}
function clearCurrentUser() {
  localStorage.removeItem('auralift_current');
}

// Shows "Hi, name" chip in navbar if the element exists and user is logged in.
// Safe to call on every page — does nothing if #userChip isn't present.
function renderUserChip() {
  const chip = document.getElementById('userChip');
  if (!chip) return;
  const user = getCurrentUser();
  if (user) {
    chip.textContent = 'Hi, ' + user.name.split(' ')[0];
    chip.classList.remove('hidden');
  } else {
    chip.classList.add('hidden');
  }
}

// Call this at the top of any page that must be fully locked behind login
// (e.g. product.html). Redirects instantly if nobody is logged in.
function requireLogin() {
  const user = getCurrentUser();
  if (!user) {
    window.location.replace('account.html');
  }
  return user;
}

document.addEventListener('DOMContentLoaded', renderUserChip);