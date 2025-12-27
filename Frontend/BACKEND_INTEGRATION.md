# GearGuard Frontend - Backend Integration Guide

## Backend API Structure

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### 1. User Registration (Signup)
**Endpoint:** `POST /user/create-account`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "password": "string (required)",
  "phone_number": "number (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "phone_number": "number"
  }
}
```

#### 2. User Login
**Endpoint:** `POST /user/login`

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "phone_number": "number",
    "accessToken": "string (JWT token, expires in 10 days)"
  }
}
```

### Admin Endpoints (Maintenance Teams)

#### 1. Create Maintenance Team
**Endpoint:** `POST /admin/createMaintenance`

**Request Body:**
```json
{
  "name": "string (required)",
  "code": "string (required)",
  "description": "string (optional)",
  "isActive": "boolean (default: true)"
}
```

#### 2. Get All Maintenance Teams
**Endpoint:** `GET /admin/readMaintenance`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "name": "string",
      "code": "string",
      "description": "string",
      "isActive": "boolean",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

#### 3. Update Maintenance Team
**Endpoint:** `PUT /admin/updateMaintenance/:id`

**Request Body:**
```json
{
  "name": "string (optional)",
  "code": "string (optional)",
  "description": "string (optional)",
  "isActive": "boolean (optional)"
}
```

#### 4. Delete Maintenance Team
**Endpoint:** `DELETE /admin/deleteMaintenance/:id`

### Admin Endpoints (Technicians)

#### 1. Create Technician
**Endpoint:** `POST /admin/createTechnician`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "password": "string (required)",
  "team": "string (required, MongoDB ObjectId of MaintenanceTeam)"
}
```

#### 2. Get All Technicians
**Endpoint:** `GET /admin/readTechnician`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "name": "string",
      "email": "string",
      "team": {
        "_id": "string",
        "name": "string",
        "code": "string"
      },
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

#### 3. Update Technician
**Endpoint:** `PUT /admin/updateTechnician/:id`

**Request Body:**
```json
{
  "name": "string (optional)",
  "email": "string (optional)",
  "password": "string (optional)",
  "team": "string (optional, MongoDB ObjectId)"
}
```

#### 4. Delete Technician
**Endpoint:** `DELETE /admin/deleteTechnician/:id`

## Frontend Services Created

### 1. authService.js
- `login(credentials)` - Login user
- `logout()` - Logout user
- `signup(userData)` - Create new account
- `getCurrentUser()` - Get current user from localStorage
- `isAuthenticated()` - Check if user is logged in
- `getToken()` - Get JWT token

### 2. maintenanceService.js
- `createMaintenanceTeam(teamData)` - Create new team
- `getAllMaintenanceTeams()` - Get all teams
- `getMaintenanceTeamById(id)` - Get team by ID
- `updateMaintenanceTeam(id, teamData)` - Update team
- `deleteMaintenanceTeam(id)` - Delete team
- `getActiveMaintenanceTeams()` - Get only active teams

### 3. technicianService.js
- `createTechnician(technicianData)` - Create new technician
- `getAllTechnicians()` - Get all technicians
- `getTechnicianById(id)` - Get technician by ID
- `updateTechnician(id, technicianData)` - Update technician
- `deleteTechnician(id)` - Delete technician

## Authentication Flow

1. **Registration:**
   - User fills signup form
   - Frontend calls `authService.signup()`
   - Backend creates user (password is hashed with bcrypt)
   - User redirected to login page

2. **Login:**
   - User enters credentials
   - Frontend calls `authService.login()`
   - Backend validates credentials and generates JWT token
   - Token and user data stored in localStorage
   - User redirected to dashboard

3. **Protected Routes:**
   - All API calls include `Authorization: Bearer <token>` header
   - Token is automatically added by axios interceptor
   - Token expires in 10 days

## Environment Variables

Create a `.env` file in the Frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Database Models

### User Model
- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)
- phone_number: Number (optional)

### Maintenance Team Model
- name: String (required)
- code: String (required)
- description: String (optional)
- isActive: Boolean (default: true)

### Technician Model
- name: String (required)
- email: String (required)
- password: String (required, hashed)
- team: ObjectId ref MaintenanceTeam (required)

## Next Steps

1. Start backend server:
```bash
cd odoo_backend
npm install
npm run dev
```

2. Start frontend dev server:
```bash
cd Frontend
npm install
npm run dev
```

3. The frontend will automatically connect to the backend API.

4. Updated pages:
   - ✅ LoginPage - Integrated with backend
   - ✅ SignupPage - Integrated with backend
   - 🚧 TeamsListPage - Ready for backend integration
   - 🚧 DashboardPage - Using mock data (can be integrated)
   - 🚧 EquipmentListPage - Using mock data (needs backend endpoints)

## Error Handling

All services include try-catch blocks and return error messages from the backend. Backend errors follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400
}
```
