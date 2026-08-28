🏋️ Auralift — Fitness & Sports E-Commerce Store
Auralift is a fitness and sports gear e-commerce website — a fully functional shopping experience with product browsing, cart, login-gated checkout, and order history, built entirely with front-end technologies.
> 📘 **Academic Context:** This project was built as the **Minor Project for 5th Semester, Diploma in Computer Science Engineering** (Government Polytechnic). It has since been iteratively improved with additional features beyond the original submission.

Author: Satyam Mishra
---
📖 About the Project
Auralift simulates a real-world online store for gym wear, sports equipment, and nutrition supplements. The goal was to go beyond a static multi-page website and build something that actually behaves like an e-commerce platform — with working authentication, a persistent cart, and real purchase tracking — all without a backend, using the browser's `localStorage` for data persistence.
---
✨ Features
Feature	Description
🛍️ Product Catalog	Browse products across 3 categories with live search, filter pills, and sort by price/name
🔐 User Authentication	Sign up / log in (demo auth, stored in `localStorage`); store pages are locked behind login
🛒 Shopping Cart	Add, update quantity, remove items — live total in a slide-out cart drawer
📦 Checkout & Orders	Checkout saves a real order to the logged-in user's account
👤 Account Dashboard	Profile editing, password change, and Purchase History in one tabbed panel
❤️ Wishlist	Save products for later from any product card
📱 Responsive Design	Mobile hamburger nav, responsive grids, touch-friendly UI
🔔 Toast Notifications	Non-blocking feedback instead of browser `alert()` popups
---
🛠️ Tech Stack
HTML5 — semantic structure across 8 pages
Tailwind CSS (CDN) — utility-first styling with a custom brand theme
Vanilla JavaScript — no frameworks; shared logic split into reusable modules
Browser localStorage — client-side persistence for users, cart, wishlist, and orders
---
📁 Project Structure
```
auralift/
├── index.html              # Homepage — hero, categories, featured products
├── product.html             # Full product listing — filters, search, sort
├── product-detail.html      # Single product view (reads details from URL)
├── about.html                # About the brand + team
├── contact.html              # Contact form
├── account.html              # Login / signup / account dashboard
├── login.html                 # Redirects to account.html (single auth entry point)
├── thankyou.html             # Contact form confirmation page
├── images/                    # Product, brand, and UI images
└── js/
    ├── auth.js                # Shared login/session helpers
    ├── cart.js                # Shared cart + checkout logic
    ├── toast.js               # Shared toast notification component
    └── wishlist.js            # Shared wishlist logic
```
---
🚀 Getting Started
No build step or server required — it's a static site.

   ```
Visit `http://localhost:5500`.
Demo account notes: Sign up with any email/password — data stays only in your browser. Adding to cart or checking out requires being logged in, and logging out clears the active cart.
---
🗺️ Roadmap
Planned improvements beyond the original diploma submission:
[ ] Real backend (Node.js + Express + MongoDB) with hashed passwords and JWT sessions
[ ] Payment gateway integration (test/sandbox mode)
[ ] Product ratings & reviews
[ ] Order status tracking (Pending → Shipped → Delivered)
[ ] Coupon code support at checkout
[ ] Custom 404 page
[ ] Dark mode toggle
---
👤 Author
Satyam Mishra
Diploma in Computer Science Engineering, Government Polytechnic\\ Pursuing BTech from SIET Prayagraj 
Built for the 5th Semester Minor Project, and continuously improved as a personal learning exercise in front-end development, UX, and client-side state management.
---
📄 License
This project was built for academic and educational purposes as part of a diploma minor project submission.
