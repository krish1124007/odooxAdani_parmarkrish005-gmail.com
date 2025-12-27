# GearGuard - Maintenance Management System

A comprehensive maintenance management system inspired by Odoo, featuring Admin, User, and Technician portals.

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (Local or Atlas connection string)

---

### 1. Backend Setup (`odoo_backend`)

The backend is built with Node.js, Express, and MongoDB.

1.  Navigate to the backend directory:
    ```bash
    cd odoo_backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Create a `.env` file in the `odoo_backend` directory (copy from `.env.sample` if available, or use the following template):

    ```env
    PORT=5000
    MONGO_URL=mongodb://localhost:27017/gear_guard_db  # Or your MongoDB Atlas URL
    CORS_ORIGIN=*
    
    # JWT Secrets (Generate secure random strings)
    JWT_SECRET=your_super_secret_jwt_key
    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    
    # Token Expiry
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_EXPIRY=10d
    ```

4.  Start the Development Server:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

---

### 2. Frontend Setup (`Frontend`)

The frontend is built with React and Vite.

1.  Navigate to the frontend directory:
    ```bash
    cd Frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Create a `.env` file in the `Frontend` directory if necessary (defaults are usually set in code, but for custom config):

    ```env
    VITE_API_BASE_URL=http://localhost:5000/api/v1
    ```

4.  Start the Development Server:
    ```bash
    npm run dev
    ```
    The application will typically start on `http://localhost:5173`.

---

### 🔑 Default Credentials

Use these credentials to access the Admin Dashboard and set up other users/technicians.

*   **Role**: Admin
*   **Email**: `admin@admin.com`
*   **Password**: `admin123`

> **Note**: You can create new Users and Technicians through the Admin Dashboard or the Signup page.

---

### 🛠️ Tech Stack

*   **Frontend**: React, Vite, Bootstrap (Custom Styled), Context API
*   **Backend**: Node.js, Express, TypeScript, Mongoose
*   **Database**: MongoDB
