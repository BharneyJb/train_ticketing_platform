# SwiftRails Backend API 🚂

> A robust, scalable Node.js/Express backend for the SwiftRails train ticketing platform, powered by MySQL.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![License](https://img.shields.io/badge/License-ISC-grey)

## 📋 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Frontend Integration](#frontend-integration)
- [Contributing](#contributing)
- [Contact](#contact)

## 📖 Introduction
The **SwiftRails Backend** is the server-side component of the SwiftRails ecosystem. It provides a RESTful API to manage the entire lifecycle of a train ticketing system, including user authentication, train scheduling, seat booking, coach management, and admin operations. It communicates seamlessly with the SwiftRails Flutter mobile application.

## ✨ Features
- **Authentication & Security**
  - specific Customer & Admin login flows
  - JWT (JSON Web Token) based authentication
  - Password encryption using Bcrypt

- **Train Management**
  - Manage trains, stations, and routes
  - Configure schedules and travel classes
  - Coach and seat layout management

- **Booking System**
  - Real-time seat availability
  - Booking creation and cancellation
  - Ticket generation and management
  - Fare calculation based on distance and class

- **User Profile**
  - Customer registration and profile management
  - Booking history tracking

## 🛠 Technology Stack
- **Runtime Environment**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/)
- **Authentication**: JWT & Bcrypt
- **Validation**: Express-Validator
- **ORM/Query Builder**: MySQL2 (Direct queries & Promise wrapper)

## 📂 Project Structure
```
train_ticketing_platform/
├── controllers/      # Request handlers for API endpoints
├── middleware/       # Custom middleware (Auth, Validation)
├── models/           # Database models and schema logic
├── routes/           # API route definitions
├── validators/       # Request validation logic
├── app.js            # Application entry point & config
├── package.json      # Dependencies and scripts
└── train_ticketing.sql # Database schema import file
```

## ✅ Prerequisites
Ensure you have the following installed on your local machine:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MySQL Server** (local or remote instance)
- **Git**

## 🚀 Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/tessyjonburica/train_ticketing_platform.git
   cd train_ticketing_platform
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   - Ensure your MySQL server is running.
   - Update database credentials in `models/connection.js` if necessary (Default: root/no password).

4. **Run the Server**
   ```bash
   # Development mode (with Nodemon)
   npm run dev

   # Production mode
   node app.js
   ```
   The server will start on `http://localhost:3000`.

## 🗄️ Database Setup
1. Log in to your MySQL console or client.
2. Create a new database (optional, or use the one in the SQL file).
3. Import the provided schema:
   ```bash
   mysql -u root -p < train_ticketing.sql
   ```
   *Note: This will create the necessary tables and seed initial data.*

## 📡 API Documentation
The API is designed with REST principles.

### Base URL
`http://localhost:3000`

### Key Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| **Auth** | | | |
| `POST` | `/login` | Customer login | ❌ |
| **Customers** | | | |
| `GET` | `/customers` | Get profile details | ✅ |
| `PUT` | `/customers` | Update profile | ✅ |
| **Trains & Schedules** | | | |
| `GET` | `/trains` | List all trains | ❌ |
| `GET` | `/schedules` | List all schedules | ❌ |
| `GET` | `/routes` | Search routes | ❌ |
| **Bookings** | | | |
| `POST` | `/bookings` | Create a new booking | ✅ |
| `GET` | `/bookings/:id` | Get booking details | ✅ |

*For a full list of endpoints, please refer to the `routes/` directory.*

## 📱 Frontend Integration
This backend is designed to work with the **SwiftRails Flutter App**.
- **Location**: `../swift_rails-master`
- **Connection**: Update `lib/app/core/utils/api_endpoints.dart` in the Flutter project to point to this server's IP address (e.g., `http://localhost:3000` or your machine's local IP).

## 🤝 Contributing
Contributions are welcome!
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📩 Contact
**SwiftRails Team**
- GitHub: [https://github.com/tessyjonburica](https://github.com/tessyjonburica)

---
*Generated for SwiftRails Project*