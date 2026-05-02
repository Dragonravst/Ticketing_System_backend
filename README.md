# Ticketing System Backend

A robust Node.js and Express-based backend for a hierarchical ticketing system, featuring MySQL integration via Sequelize, JWT authentication, and structured logging.

## 🚀 Features

- **Express Framework**: Fast, unopinionated, minimalist web framework.
- **Sequelize ORM**: Promise-based Node.js ORM for MySQL.
- **JWT Authentication**: Secure token-based authentication.
- **Password Hashing**: Secure password storage using `bcrypt`.
- **Winston Logging**: Structured logging for debugging and production monitoring.
- **Automatic Sync**: Database tables are automatically synchronized with models using `{ alter: true }`.

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dragonravst/Ticketing_System_backend.git
   cd Ticketing_System_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add your credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=Akash
   DB_NAME=personalprojectno1
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

## 🏃 Running the App

### Development Mode (with nodemon)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 📋 API Design Overview

### User Flow
- **Signup**: Register as a User or Admin (Admin can assign roles).
- **Login**: Authenticate with username and password to receive a JWT.
- **Forgot Password**: Reset password via email verification.

### Ticket Flow
- **Creation**: Both Users and Admins can create tickets.
- **Update**: Restricted strictly to **ADMIN** users (status, priority, etc.).
- **Viewing**: Users/Agents can view their own tickets; Admins can view all tickets.

## 📂 Project Structure

```text
├── config/             # Configuration files
├── middleware/         # Custom Express middleware (Auth, Validation)
├── models/             # Sequelize database models
├── utils/              # Utility classes (Logger, DB connection)
├── index.js            # Main entry point
└── api design.txt      # Detailed API flow documentation
```
