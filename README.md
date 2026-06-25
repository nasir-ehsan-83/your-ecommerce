# 🛒 Your Ecommerce

A modern full-stack e-commerce platform built with **React**, **Express.js**, and **MongoDB**. The project follows a scalable architecture with secure authentication, clean code practices, and a modern user experience.

---

## 🚀 Tech Stack

### Backend

* Node.js
* Express.js
* Mongoose
* JsonWebToken(JWT)
* Bcrypt.js
* Zod

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
│   │
│   ├── src/
│   │   │
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .example.env
│   ├── package-lock.json
│   └── package.json
│
├── app/
│   │
│   ├── public/
│   ├── src/
│   │   │
│   │   ├── assest/
│   │   ├── admin/
│   │   ├── api/
│   │   ├── component/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json/
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## ✨ Features

### Authentication

* Role-base Authentication
* JWT Authentication
* Refresh Token Rotation
* Request Validation using Zod
* Response Validation using Zod

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
* Input and Output Validation with Zod
* Secure Cookie Handling
* Centralized Error Handling

---

## 🛠️ Installation

### Clone Repository

```bash
git clone https://github.com/nasir-ehsan-83/your-ecommerce.git
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

## 🧪 Future Improvements

* Redis Caching
* Elasticsearch Integration
* Docker Support
* CI/CD Pipeline
* Real-Time Notifications

---

## 👨‍💻 Author

**Nasir Ahmad Ehsan**

Backend Developer 

* GitHub: https://github.com/nasir-ehsan-83
* LinkedIn: https://linkedin.com/in/nasirehsan83

---

## 📄 License

This project is licensed under the MIT License.
