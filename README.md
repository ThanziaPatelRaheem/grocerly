# 🌿 Grocerly – Modern Grocery E-Commerce Platform (MERN Stack)

Grocerly is a full-featured, production-ready grocery shopping application built using the **MERN stack**  
(**MongoDB, Express, React, Node.js**) with complete authentication, cart, orders, and an admin dashboard.

A clean, real-world supermarket UI inspired by modern online grocery apps.

---

## 🚀 Live Demo

👉 **https://grocerly-flax.vercel.app**

_(Frontend hosted on Vercel • Backend API hosted on Render)_

---

## 🛒 Features

### 👤 User Features

- Register / Login / Logout (JWT + HTTP-Only Cookies)
- Browse all products
- Search + advanced category filters
- Product details page
- Add to cart / update quantity / remove from cart
- Checkout flow
- Place orders
- View order history
- Add product reviews & ratings

### 🔐 Admin Features

- Admin-only authentication
- Add / edit / delete products
- Upload multiple images (Cloudinary)
- Delete Cloudinary images
- Manage users
- Manage reviews
- Manage orders + update order status
- Sales analytics dashboard (date-range filter)

### ⚙️ Backend Features

- Fully structured REST API
- Role-based route protection
- Secure cookies
- Custom error middleware
- MongoDB validation
- Stripe (payment boilerplate ready)
- CORS configured for Vercel + Render
- Clean MVC folder structure

---

## 🧰 Tech Stack

### Frontend

- React 18 + Vite
- React Router
- Redux Toolkit + RTK Query
- CSS Modules / Custom styles
- React Hot Toast
- Cloudinary image preview

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary SDK
- JWT Authentication
- bcrypt password hashing
- Stripe (optional)
- Cookie Parser
- CORS middleware

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **Image Hosting:** Cloudinary

---

## 📁 Folder Structure

    grocerly/
    │
    ├── backend/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middlewares/
    │   ├── utils/
    │   ├── dbConnect.js
    │   ├── server.js
    │   └── .env              # backend environment variables (ignored in git)
    │
    └── frontend/
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   ├── redux/
        │   │   ├── api/      # RTK Query slices
        │   │   └── store.js
        │   ├── hooks/
        │   ├── assets/
        │   ├── App.jsx
        │   └── main.jsx
        ├── .env.local        # frontend env for local dev (ignored in git)
        └── vite.config.js

---

## 🔧 Environment Variables

### 🔹 Backend (`backend/.env`)

    PORT=3000
    NODE_ENV=PRODUCTION
    FRONTEND_URL=https://grocerly-flax.vercel.app

    DB_URI=your_mongodb_connection_string

    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_TIME=7d
    COOKIE_EXPIRES_TIME=7

    STRIPE_SECRET_KEY=
    STRIPE_WEBHOOK_SECRET=

    SMTP_HOST=
    SMTP_PORT=
    SMTP_EMAIL=
    SMTP_PASSWORD=
    SMTP_FROM_EMAIL=noreply@grocerly.com
    SMTP_FROM_NAME=Grocerly

    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

### 🔹 Frontend – Local Development (`frontend/.env.local`)

    VITE_API_URL=http://localhost:3000/api

### 🔹 Frontend – Production (Vercel Environment Variable)

    VITE_API_URL=https://grocerly-csmo.onrender.com/api

---

## 💳 Test Card Details (Stripe Sandbox)

To simulate a successful checkout in **test mode**, use the official Stripe test card:

- **Card Number:** `4242 4242 4242 4242`
- **Expiry Date:** any future date (e.g. `12/34`)
- **CVC:** any 3 digits (e.g. `123`)
- **ZIP:** any 5 digits (e.g. `12345`)

> 💡 These are Stripe test card details and **will not charge a real card.**

---

## ⭐ Support

If you like this project, please give it a **star ⭐ on GitHub** — it really helps!

---

## ❤️ Author

**Thanzia Patel**  
Full-Stack MERN Developer  
GitHub: [https://github.com/ThanziaPatelRaheem](https://github.com/ThanziaPatelRaheem)
