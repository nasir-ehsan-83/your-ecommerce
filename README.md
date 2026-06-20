# Your E-Commerce Application

A full-stack e-commerce web application featuring a modern React frontend and a robust Node.js/Express backend API.

## 📁 Project Structure

This repository is split into two main sections:
*   **`app/`**: The frontend application built with React, Vite, and Tailwind CSS.
*   **`server/`**: The backend REST API built with Node.js, Express, and MongoDB.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your machine.

### Prerequisites
Make sure you have **Node.js** (v18 or higher recommended) and **npm** installed.

### 1. Backend Setup (`server`)
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server/` directory and define your environment variables:
   ```env
   PORT=4500
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:4500`.

### 2. Frontend Setup (`app`)
1. Open a new terminal window and navigate to the app folder:
   ```bash
   cd app
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend application will open on `http://localhost:5173` (or the port specified by Vite).

---

## 🛠️ Tech Stack

*   **Frontend**: React, Vite, Tailwind CSS, ESLint
*   **Backend**: Node.js, Express, CORS, Dotenv
*   **Database**: MongoDB (configured via `server/src/config/db.js`)

---

## 📄 License
This project is licensed under the terms specified in the [LICENSE](LICENSE) file.
