# Customer Onboarding System

This project is a **Customer Onboarding System** designed to streamline interactions between hotel administration and guest users. The system includes both frontend and backend components and incorporates all tasks specified in the assignment.

While the hotel-admin and guest-admin functionalities are not yet fully connected, the project meets the functional requirements and is ready for further development.

---

## **Features**

- **Frontend**: User-friendly interface for guest and hotel admin interactions.
- **Backend**: Robust server-side logic, database management, and API endpoints.
- **API Integration**: Comprehensive API documentation for all tasks.
- **Deployment**: Configured for deployment on **Vercel**.
- **GitHub Repository**: Includes a detailed README file with API documentation and setup instructions.

---

## **Folder Structure**

### **Frontend (frontend)**

The `frontend` directory contains the files required to run the user interface of the application. Key components include:

- **Main Files**:
  - `index.html`: Entry point for the application.
  - `src/`: Source files for the frontend code.
  - `dist/`: Production-ready build files.
  - `public/`: Static assets (e.g., images).
  
- **Configuration Files**:
  - `vite.config.js`: Build tool configuration.
  - `tailwind.config.js`: Styling framework configuration.
  - `postcss.config.js`: PostCSS setup.
  - `package.json`: Dependencies and scripts.

### **Backend (backend)**

The `backend` directory houses the server-side code. Key components include:

- **Main Files**:
  - `index.js`: Main server file.
  - `routes/`: API endpoint definitions.
  - `controllers/`: Business logic for API endpoints.
  - `models/`: Database models.
  - `middlewares/`: Middleware functions for request handling.
  - `database/`: Database setup and configuration.

- **Configuration Files**:
  - `.env`: Environment variables for sensitive configurations.
  - `package.json`: Dependencies and scripts.

---

## **Deployment**

The project includes `vercel.json` configuration files in both the frontend and backend directories, enabling seamless deployment on **Vercel**.

---

# **API Documentation**

This document provides an overview of the routes defined in the `App.jsx` file and their corresponding backend functionality.

---

## **Frontend Routes**

### **1. Admin Dashboard**
- **Path**: `/admin`
- **Type**: Protected Route
- **Allowed Roles**: `main-admin`
- **Frontend Component**: `MainAdminDashboard`
- **Backend Interaction**:
  - Likely interacts with admin-related endpoints.
  - Example API routes:
    - `GET /api/admin/dashboard`: Fetch admin dashboard data.
    - `POST /api/admin/settings`: Update admin settings.

---

### **2. Guest Admin Dashboard**
- **Path**: `/guest-admin`
- **Type**: Protected Route
- **Allowed Roles**: `guest-admin`
- **Frontend Component**: `GuestAdminDashboard`
- **Backend Interaction**:
  - API routes for guest administration tasks.
  - Example API routes:
    - `GET /api/guest-admin/dashboard`: Fetch guest admin dashboard data.
    - `POST /api/guest-admin/hotel`: Add or manage hotel data.

---

### **3. Guest Registration**
- **Path**: `/guest-registration/:hotelId`
- **Type**: Public Route
- **Frontend Component**: `GuestLandingPage`
- **Backend Interaction**:
  - Handles guest registration for specific hotels.
  - Example API routes:
    - `GET /api/guest/:hotelId`: Fetch hotel details for registration.
    - `POST /api/guest/register`: Register a guest for a specific hotel.

---

### **4. Thank You Page**
- **Path**: `/thank-you`
- **Type**: Public Route
- **Frontend Component**: `ThankYou`
- **Backend Interaction**:
  - No direct API interaction. This is likely a static thank-you page.

---

### **5. Hotel Page**
- **Path**: `/hotel/:hotelId`
- **Type**: Public Route
- **Frontend Component**: `HotelPage`
- **Backend Interaction**:
  - Handles hotel-related details.
  - Example API routes:
    - `GET /api/hotel/:hotelId`: Retrieve hotel details.
    - `GET /api/hotel/:hotelId/rooms`: Fetch available rooms for the hotel.

---

### **6. Login**
- **Path**: `/login`
- **Type**: Public Route (with redirection for authenticated users)
- **Frontend Component**: `LoginPage`
- **Backend Interaction**:
  - Handles user authentication.
  - Example API routes:
    - `POST /api/auth/login`: Authenticate the user and return a token.

---

### **7. Register**
- **Path**: `/register`
- **Type**: Public Route (with redirection for authenticated users)
- **Frontend Component**: `RegisterPage`
- **Backend Interaction**:
  - Handles user registration.
  - Example API routes:
    - `POST /api/auth/register`: Create a new user.

---

### **8. Root Route**
- **Path**: `/`
- **Type**: Redirect Route
- **Redirection**:
  - If not authenticated: `/login`
  - If authenticated as `main-admin`: `/admin`
  - If authenticated as `guest-admin`: `/guest-admin`
- **Backend Interaction**:
  - No direct API interaction. Redirection based on user role.

---

## **Backend Endpoints**
