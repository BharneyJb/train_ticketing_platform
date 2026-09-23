# SwiftRails Train Ticketing Platform 🚂

A complete train ticketing ecosystem comprising a robust Node.js/Express backend and a modern frontend (Flutter/Web).

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![License](https://img.shields.io/badge/License-ISC-grey)

## 📋 Table of Contents
- [Introduction](#introduction)
- [Architecture Overview](#architecture-overview)
- [Backend Structure](#backend-structure)
- [Frontend Guide](#frontend-guide)
  - [Proposed Structure](#proposed-frontend-structure)
  - [Key Workflows](#key-frontend-workflows)
  - [API Integration](#api-integration)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [Contributing](#contributing)

## 📖 Introduction
SwiftRails is a comprehensive platform for managing train schedules and ticketing. It allows customers to search for trains, check seat availability, and book tickets, while providing administrators with a full suite of tools to manage the railway infrastructure (trains, stations, coaches, and fares).

## 🏗 Architecture Overview
The project follows a **Client-Server architecture**:
- **Backend**: A RESTful API built with Node.js and Express, using MySQL for data persistence.
- **Frontend**: A consumer application (e.g., Flutter) that interacts with the API via JSON.

## 📂 Backend Structure
The backend is organized by concern to ensure scalability and maintainability:

```
train_ticketing_platform/
├── controllers/      # Request handlers (Business logic)
├── middleware/       # Auth (JWT), validation, and error handling
├── models/           # Database queries and connection logic
├── routes/           # API endpoint definitions (Admin vs Client)
├── validators/       # Input validation schemas
├── app.js            # Entry point & Express configuration
├── package.json      # Dependencies and scripts
└── train_ticketing.sql # Database schema
```

## 📱 Frontend Guide
This section provides the blueprint for the frontend implementation to ensure alignment with the backend API.

### 📂 Proposed Frontend Structure
To maintain a clean and scalable frontend, the following feature-based architecture is recommended:

```
frontend/
├── src/
│   ├── api/                # API Client & Endpoint Definitions
│   │   ├── client.js       # Axios/Fetch base configuration & Interceptors
│   │   ├── auth.api.js      # /login, /customers (profile)
│   │   ├── booking.api.js  # /schedules, /seats, /bookings, /fares
│   │   └── admin.api.js    # Admin-specific management endpoints
│   ├── assets/             # Static assets (Images, SVGs, Fonts)
│   ├── components/         # Shared UI Components
│   │   ├── common/         # Buttons, Inputs, Loaders
│   │   └── layout/         # Navigation, Header, Footer
│   ├── constants/           # App constants, Route names, API Base URLs
│   ├── hooks/              # Custom logic (e.g., useAuth, useBookingFlow)
│   ├── models/             # Type definitions (User, Train, Schedule, Booking)
│   ├── pages/              # Feature-based views
│   │   ├── auth/           # Login, Registration, Forgot Password
│   │   ├── customer/       # Profile, My Bookings, Notifications
│   │   ├── booking/        # Search $\rightarrow$ Schedule Selection $\rightarrow$ Seat Selection $\rightarrow$ Payment
│   │   └── admin/          # Dashboard, Train Mgmt, Station Mgmt, Booking Mgmt
│   ├── store/              # State Management (Redux, Zustand, or Provider)
│   │   ├── authStore.js    # User session, JWT token, Role
│   │   └── bookingStore.js # Current search filters, selected seat, fare
│   └── utils/              # Helper functions (Date formatting, currency, validation)
```

### 🔄 Key Frontend Workflows

#### 1. Ticket Booking Flow
The frontend should orchestrate the following API sequence:
1. **Search**: `GET /stations` $\rightarrow$ User selects `from` and `to` $\rightarrow$ `GET /schedules/route/:fromStationId/:toStationId`.
2. **Schedule Selection**: User selects a train $\rightarrow$ `GET /schedules/:id/options`.
3. **Seat Selection**: `GET /seats` (filtered by coach/train) $\rightarrow$ User selects a seat.
4. **Pricing**: `GET /fares/pricing` $\rightarrow$ Display final amount.
5. **Confirmation**: `POST /bookings` $\rightarrow$ `POST /booked-seats`.

#### 2. Authentication Flow
- **Login**: `POST /login` $\rightarrow$ Receive JWT $\rightarrow$ Store in secure storage.
- **Authorization**: Attach `Authorization: Bearer <token>` to all requests to protected routes.
- **Profile**: `GET /customers` $\rightarrow$ Populate user profile in the app.

#### 3. Admin Management Flow
- **Dashboard**: `GET /trains`, `GET /stations` $\rightarrow$ Summary cards.
- **CRUD Operations**: Use `POST`, `PUT`, `DELETE` on admin routes (e.g., `/admin/coaches`) to manage infrastructure.

### 📡 API Integration

#### Base URL
`http://localhost:3000` (or your server's IP)

#### Primary Endpoints

| Feature | Client Endpoint | Admin Endpoint | Auth Required |
| :--- | :--- | :--- | :---: |
| **Auth** | `POST /login` | `POST /login` | ❌ |
| **Customers** | `GET /customers`, `PUT /customers` | `GET /customers`, `POST /customers` | ✅ |
| **Schedules** | `GET /schedules/route/...` | `POST /schedules`, `PUT /schedules` | Client: ❌ / Admin: ✅ |
| **Bookings** | `POST /bookings`, `GET /bookings/:id` | `GET /bookings`, `DELETE /bookings` | ✅ |
| **Seats** | `GET /seats`, `GET /seats/:id` | `POST /seats`, `PUT /seats` | Client: ❌ / Admin: ✅ |
| **Fares** | `GET /fares/pricing` | `POST /fares`, `PUT /fares` | Client: ❌ / Admin: ✅ |
| **Trains** | `GET /trains`, `GET /trains/:id` | `POST /trains`, `PUT /trains` | Client: ❌ / Admin: ✅ |

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14+) & **npm**
- **MySQL Server**

### Installation
1. **Clone & Install**:
   ```bash
   git clone https://github.com/tessyjonburica/train_ticketing_platform.git
   cd train_ticketing_platform
   npm install
   ```
2. **Database Setup**:
   ```bash
   mysql -u root -p < train_ticketing.sql
   ```
3. **Run**:
   ```bash
   npm run dev  # Development
   node app.js  # Production
   ```

## 🤝 Contributing
1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/AmazingFeature`.
3. Commit and push.
4. Open a Pull Request.

---
*SwiftRails Project Documentation*
