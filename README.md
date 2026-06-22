# 🛒 Your Ecommerce

A modern full-stack e-commerce platform built with **React**, **Express.js**, and **MongoDB**. The project follows a scalable architecture with secure authentication, clean code practices, and a modern user experience.

---

## 🚀 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt.js
* Zod Validation

### Frontend

* React.js
* Vite
* Tailwind CSS

---

## 📂 Project Structure

```text
your-ecommerce/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validators/
│   └── index.js
│
├── app/
│   ├── public/
│   ├── src/
│   ├── assets/
│   └── vite.config.js
│
└── README.md
```

---

## ✨ Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Refresh Token Rotation
* Secure Logout
* Password Hashing with Bcrypt
* Request Validation using Zod

### Products

* Product CRUD Operations
* Product Categories
* Search & Filtering
* Pagination

### Orders

* Shopping Cart
* Checkout System
* Order History

### Planned Features

* Payment Gateway Integration
* Wishlist
* Product Reviews & Ratings
* Admin Dashboard
* Email Verification
* Password Reset

---

## 🔒 Security

* Password Hashing with Bcrypt
* JWT Access & Refresh Tokens
* Protected Routes
* Input Validation with Zod
* Secure Cookie Handling
* Centralized Error Handling

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000

MONGO_URL=your_mongodb_connection

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

---

## 🛠️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/your-ecommerce.git
cd your-ecommerce
```

### Backend Setup

```bash
cd server

npm install

npm run dev
```

### Frontend Setup

```bash
cd ../app

npm install

npm run dev
```

---

## 📡 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh-token
POST /api/auth/logout
```

### Products

```http
GET    /api/products
GET    /api/products/:id
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id
```

---

## 📸 Screenshots

Add project screenshots here:

```md
![Home Page](./screenshots/home.png)

![Product Page](./screenshots/product.png)

![Authentication](./screenshots/auth.png)
```

---

## 🧪 Future Improvements

* Redis Caching
* Elasticsearch Integration
* Docker Support
* CI/CD Pipeline
* Microservices Architecture
* Real-Time Notifications

---

## 👨‍💻 Author

**Nasir Ahmad Ehsan**

Backend Developer | JavaScript & Node.js Enthusiast

* GitHub: https://github.com/nasir-ehsan-83
* LinkedIn: https://linkedin.com/in/nasirehsan83

---

## 📄 License

This project is licensed under the MIT License.

```text
Copyright (c) 2026 Nasir Ahmad Ehsan
```
