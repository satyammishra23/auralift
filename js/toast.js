// ---------- Toast Notification (replaces ugly browser alert()) ----------
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'fixed top-5 right-5 z-[100] space-y-2';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'bg-gray-900 text-white text-sm px-4 py-3 rounded-lg shadow-lg opacity-0 translate-x-4 transition-all duration-300';
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-x-4');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-4');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}