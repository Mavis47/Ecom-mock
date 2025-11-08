🛒 Nexora Fashion – Cart Badge & Product Management
📌 Overview

This module implements a React frontend for the Nexora Fashion e-commerce application. It includes:

A dynamic cart badge in the navigation bar that displays the total number of items in the user's cart.

A main product listing page where users can view available products and add them to their cart.

API integration with a Node.js + Express backend for fetching products and managing the shopping cart.

🚀 Features
🧭 Navbar Component (Navbar.tsx)

Displays the website title and a shopping cart icon with a real-time item count badge.

Key Functionalities

Fetches cart items from backend API:

GET http://localhost:4000/api/cart/getAllCartItems


Calculates total items using:

const totalCount = items.reduce((sum, item) => sum + item.qty, 0);


Displays a red circular badge on the cart icon showing the number of total items in the cart.

UI Example:
<nav>
  Nexora Fashion        🛒(3)
</nav>

Core Logic:
useEffect(() => {
  getCartItems();
}, []);


This ensures the cart item count is fetched once when the navbar loads.

🛍️ Main Page Component (Mainpage.tsx)

Displays all products and allows users to add items to the shopping cart.

Key Functionalities

Fetches product list from:

GET http://localhost:4000/api/product/getProduct


Adds a product to cart via:

POST http://localhost:4000/api/cart/addToCart


Shows toast notifications upon successful addition.

Example Function:
const addToCart = async (productId: number) => {
  const res = await axios.post("http://localhost:4000/api/cart/addToCart", { productId, qty: 1 });
  toast.success("Product added to cart");
};

🧩 UI Components Used

Card – Displays product details (name, price, and Add to Cart button).

Navbar – Persistent top navigation bar.

ToastContainer – Shows success/error notifications.

ShoppingCart from lucide-react – Used as the cart icon.

⚙️ API Endpoints Summary

Endpoint	Method	Description

/api/product/getProduct	GET	Fetch all available products

/api/cart/addToCart	POST	Add a specific product to the user’s cart

/api/cart/getAllCartItems	GET	Retrieve all cart items for the current user

/api/cart/checkout POST Generate mock data after finalizing cartItems

📸 UI Preview (Example Layout)
----------------------------------------------------
| Nexora Fashion                         🛒 (2)     |
----------------------------------------------------
| [Product 1]  ₹1000   [Add to Cart]               |
| [Product 2]  ₹850    [Add to Cart]               |
| [Product 3]  ₹1200   [Add to Cart]               |
----------------------------------------------------

🧠 Notes

The badge value automatically updates after refreshing the page.

The implementation does not use React Context or Redux — it directly fetches cart data in the Navbar.

Axios handles all API communication.

Tailwind CSS handles layout and styling.

🖥️ Backend

The backend runs using the Bun runtime:

bun run server.ts

Make sure your backend server runs on port 4000 (or update the API URLs accordingly).

🌐 Frontend

The frontend runs with Vite:

npm run dev