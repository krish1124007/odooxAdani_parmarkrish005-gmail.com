# Odoo Maintenance System - Postman API Collection

**Base URL:** `http://localhost:5000`

---

## 📋 Table of Contents
1. [User Authentication APIs](#user-authentication-apis)
2. [User APIs](#user-apis)
3. [Admin Authentication APIs](#admin-authentication-apis)
4. [Admin - Technician Management](#admin---technician-management)
5. [Admin - Maintenance Team Management](#admin---maintenance-team-management)

---

## 🔐 User Authentication APIs

### 1. Create User Account
**Method:** `POST`  
**URL:** `http://localhost:5000/api/v1/user/create-account`  
**Headers:**
```json
{
  "Content-Type": "application/json"
}
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "phone_number": "+1234567890"
}
```
**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "65abc123...",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone_number": "+1234567890"
  }
}
```

---

### 2. User Login
**Method:** `POST`  
**URL:** `http://localhost:5000/api/v1/user/login`  
**Headers:**
```json
{
  "Content-Type": "application/json"
}
```
**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "_id": "65abc123...",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone_number": "+1234567890",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**⚠️ Important:** Save the `accessToken` from the response. You'll need it for authenticated requests.

---

## 👤 User APIs

### 3. Get Equipment Suggestions
**Method:** `GET`  
**URL:** `http://localhost:5000/api/v1/user/suggestion`  
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_ACCESS_TOKEN_HERE"
}
```
**Request Body:**
```json
{
  "name": "pump"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Equipment found",
  "data": [
    {
      "_id": "65abc456...",
      "name": "Water Pump Model X",
      "category": "Pumps"
    }
  ]
}
```

---

### 4. Create Maintenance Request
**Method:** `POST`  
**URL:** `http://localhost:5000/api/v1/user/create-request`  
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_ACCESS_TOKEN_HERE"
}
```
**Request Body:**
```json
{
  "subject": "Water Pump Repair",
  "type": "corrective",
  "equipment": "65abc456def789...",
  "maintenanceTeam": "65xyz123abc456...",
  "assignedTechnician": "65tech789xyz123...",
  "requestedBy": "65abc123...",
  "scheduledDate": "2025-12-30T10:00:00Z",
  "startedAt": "2025-12-30T10:30:00Z",
  "completedAt": "2025-12-30T14:00:00Z",
  "durationInHours": 3.5,
  "worksheet": "Replaced damaged impeller and checked seals",
  "company": "Adani Power Ltd"
}
```

**Required Fields:**
- `subject` (string)
- `type` (string)
- `equipment` (ObjectId)
- `maintenanceTeam` (ObjectId)
- `requestedBy` (ObjectId)
- `company` (string)

**Optional Fields:**
- `assignedTechnician` (ObjectId)
- `scheduledDate` (Date)
- `startedAt` (Date)
- `completedAt` (Date)
- `durationInHours` (number)
- `worksheet` (string)

**Response (201):**
```json
{
  "success": true,
  "message": "Request created successfully",
  "data": {
    "_id": "65request123...",
    "subject": "Water Pump Repair",
    "type": "corrective",
    "equipment": "65abc456def789...",
    "maintenanceTeam": "65xyz123abc456...",
    "assignedTechnician": "65tech789xyz123...",
    "requestedBy": "65abc123...",
    "scheduledDate": "2025-12-30T10:00:00.000Z",
    "company": "Adani Power Ltd",
    "createdAt": "2025-12-27T06:40:35.000Z"
  }
}
```

---

### 5. Read Maintenance Request
**Method:** `GET`  
**URL:** `http://localhost:5000/api/v1/user/read-request`  
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_ACCESS_TOKEN_HERE"
}
```
**Query Params:** None (reads all requests for authenticated user)

**Response (200):**
```json
{
  "success": true,
  "message": "Request found",
  "data": {
    "_id": "65request123...",
    "subject": "Water Pump Repair",
    "type": "corrective",
    "status": "pending"
  }
}
```

---

## 🔑 Admin Authentication APIs

### 6. Create Admin Account
**Method:** `POST`  
**URL:** `http://localhost:5000/api/v1/admin/create-account`  
**Headers:**
```json
{
  "Content-Type": "application/json"
}
```
**Request Body:**
```json
{
  "email": "admin@odoo.com",
  "password": "AdminSecure123"
}
```
**Response (201):**
```json
{
  "success": true,
  "message": "Admin created successfully",
  "data": {
    "_id": "65admin123...",
    "email": "admin@odoo.com"
  }
}
```

---

### 7. Admin Login
**Method:** `POST`  
**URL:** `http://localhost:5000/api/v1/admin/login`  
**Headers:**
```json
{
  "Content-Type": "application/json"
}
```
**Request Body:**
```json
{
  "email": "admin@odoo.com",
  "password": "AdminSecure123"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Admin logged in successfully",
  "data": {
    "admin": {
      "_id": "65admin123...",
      "email": "admin@odoo.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**⚠️ Important:** Save the `token` from the response for admin authenticated requests.

---

## 👨‍🔧 Admin - Technician Management

### 8. Create Technician
**Method:** `POST`  
**URL:** `http://localhost:5000/api/v1/admin/createTechnician`  
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer ADMIN_TOKEN_HERE"
}
```
**Request Body:**
```json
{
  "name": "Mike Johnson",
  "email": "mike.johnson@odoo.com",
  "password": "TechPassword123",
  "team": "65team123abc456..."
}
```
**Response (201):**
```json
{
  "success": true,
  "message": "Technician created successfully",
  "data": {
    "_id": "65tech789...",
    "name": "Mike Johnson",
    "email": "mike.johnson@odoo.com",
    "team": "65team123abc456..."
  }
}
```

---

### 9. Read All Technicians
**Method:** `GET`  
**URL:** `http://localhost:5000/api/v1/admin/readTechnician`  
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer ADMIN_TOKEN_HERE"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Technicians retrieved successfully",
  "data": [
    {
      "_id": "65tech789...",
      "name": "Mike Johnson",
      "email": "mike.johnson@odoo.com",
      "team": {
        "_id": "65team123...",
        "name": "Electrical Team"
      }
    }
  ]
}
```

---

### 10. Update Technician
**Method:** `PUT`  
**URL:** `http://localhost:5000/api/v1/admin/updateTechnician/:id`  
**Example:** `http://localhost:5000/api/v1/admin/updateTechnician/65tech789xyz123`  
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer ADMIN_TOKEN_HERE"
}
```
**Request Body:**
```json
{
  "name": "Michael Johnson",
  "email": "michael.johnson@odoo.com",
  "team": "65newteam456..."
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Technician updated successfully",
  "data": {
    "_id": "65tech789...",
    "name": "Michael Johnson",
    "email": "michael.johnson@odoo.com",
    "team": "65newteam456..."
  }
}
```

---

### 11. Delete Technician
**Method:** `DELETE`  
**URL:** `http://localhost:5000/api/v1/admin/deleteTechnician/:id`  
**Example:** `http://localhost:5000/api/v1/admin/deleteTechnician/65tech789xyz123`  
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer ADMIN_TOKEN_HERE"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Technician deleted successfully",
  "data": null
}
```

---

## 🛠️ Admin - Maintenance Team Management

### 12. Create Maintenance Team
**Method:** `POST`  
**URL:** `http://localhost:5000/api/v1/admin/createMaintenance`  
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer ADMIN_TOKEN_HERE"
}
```
**Request Body:**
```json
{
  "name": "Electrical Maintenance Team",
  "code": "EMT-001",
  "description": "Handles all electrical equipment maintenance",
  "isActive": true
}
```
**Response (201):**
```json
{
  "success": true,
  "message": "Maintenance team created successfully",
  "data": {
    "_id": "65team123...",
    "name": "Electrical Maintenance Team",
    "code": "EMT-001",
    "description": "Handles all electrical equipment maintenance",
    "isActive": true,
    "createdAt": "2025-12-27T06:40:35.000Z"
  }
}
```

---

### 13. Read All Maintenance Teams
**Method:** `GET`  
**URL:** `http://localhost:5000/api/v1/admin/readMaintenance`  
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer ADMIN_TOKEN_HERE"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Maintenance teams retrieved successfully",
  "data": [
    {
      "_id": "65team123...",
      "name": "Electrical Maintenance Team",
      "code": "EMT-001",
      "description": "Handles all electrical equipment maintenance",
      "isActive": true
    }
  ]
}
```

---

### 14. Update Maintenance Team
**Method:** `PUT`  
**URL:** `http://localhost:5000/api/v1/admin/updateMaintenance/:id`  
**Example:** `http://localhost:5000/api/v1/admin/updateMaintenance/65team123abc456`  
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer ADMIN_TOKEN_HERE"
}
```
**Request Body:**
```json
{
  "name": "Advanced Electrical Team",
  "code": "AET-001",
  "description": "Updated description",
  "isActive": true
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Maintenance team updated successfully",
  "data": {
    "_id": "65team123...",
    "name": "Advanced Electrical Team",
    "code": "AET-001",
    "description": "Updated description",
    "isActive": true
  }
}
```

---

### 15. Delete Maintenance Team
**Method:** `DELETE`  
**URL:** `http://localhost:5000/api/v1/admin/deleteMaintenance/:id`  
**Example:** `http://localhost:5000/api/v1/admin/deleteMaintenance/65team123abc456`  
**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer ADMIN_TOKEN_HERE"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Maintenance team deleted successfully",
  "data": null
}
```

---

## 📝 Testing Workflow

### Step 1: Setup
1. Make sure your server is running on `http://localhost:5000`
2. Ensure MongoDB is connected

### Step 2: Create Admin Account
1. Use API #6 to create an admin account
2. Use API #7 to login and get the admin token
3. Save the token for subsequent admin requests

### Step 3: Create Maintenance Team
1. Use API #12 with admin token to create a maintenance team
2. Save the team `_id` for creating technicians

### Step 4: Create Technician
1. Use API #8 with admin token and the team `_id` from Step 3
2. Save the technician `_id`

### Step 5: Create User Account
1. Use API #1 to create a user account
2. Use API #2 to login and get the user access token

### Step 6: Create Maintenance Request
1. Use API #4 with user token
2. Use the equipment, team, and technician IDs from previous steps

---

## 🔧 Common Issues & Solutions

### Issue: "Authorization header missing"
**Solution:** Make sure you include the `Authorization` header with format: `Bearer YOUR_TOKEN`

### Issue: "Invalid token"
**Solution:** The token might be expired (10 days validity). Login again to get a new token.

### Issue: "All fields are required"
**Solution:** Check that you're sending all required fields in the request body.

### Issue: "Cannot find name 'process'"
**Solution:** This is already fixed. Make sure you have `@types/node` installed.

---

## 📦 Postman Environment Variables

Create these variables in Postman for easier testing:

| Variable Name | Initial Value | Current Value |
|--------------|---------------|---------------|
| `base_url` | `http://localhost:5000` | `http://localhost:5000` |
| `user_token` | | (Set after user login) |
| `admin_token` | | (Set after admin login) |
| `team_id` | | (Set after creating team) |
| `technician_id` | | (Set after creating technician) |
| `equipment_id` | | (Set after creating equipment) |

### How to use variables in Postman:
- URL: `{{base_url}}/api/v1/user/login`
- Authorization Header: `Bearer {{user_token}}`

---

## 🎯 Quick Test Collection Order

1. ✅ Create Admin Account (#6)
2. ✅ Admin Login (#7) → Save token
3. ✅ Create Maintenance Team (#12)
4. ✅ Create Technician (#8)
5. ✅ Create User Account (#1)
6. ✅ User Login (#2) → Save token
7. ✅ Create Maintenance Request (#4)
8. ✅ Read Maintenance Request (#5)

---

**Last Updated:** December 27, 2025  
**API Version:** v1  
**Server Port:** 5000
