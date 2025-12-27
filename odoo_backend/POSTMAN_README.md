# 📦 Postman Testing Files - Summary

I've created a complete Postman testing suite for your Odoo Maintenance System API. Here's what you have:

---

## 📁 Files Created

### 1. **POSTMAN_API_COLLECTION.md** (Detailed Documentation)
- Complete API reference with all 15 endpoints
- Request/Response examples for each endpoint
- Authentication details
- Field descriptions (required vs optional)
- Testing workflow recommendations
- Common issues & solutions

### 2. **Odoo_Maintenance_API.postman_collection.json** (Import File)
- Ready-to-import Postman collection
- All 15 API endpoints pre-configured
- Organized into 5 folders:
  - User Authentication (2 endpoints)
  - User APIs (3 endpoints)
  - Admin Authentication (2 endpoints)
  - Admin - Technician Management (4 endpoints)
  - Admin - Maintenance Team Management (4 endpoints)
- Auto-save scripts for tokens and IDs

### 3. **Odoo_Maintenance_Local.postman_environment.json** (Environment File)
- Pre-configured environment variables
- Base URL set to `http://localhost:5000`
- Variables for tokens and IDs

### 4. **POSTMAN_QUICK_START.md** (Quick Guide)
- Step-by-step testing instructions
- Import guide
- Testing workflow
- Troubleshooting tips

---

## 🚀 How to Use

### Option 1: Import Everything (Recommended)
1. Open Postman
2. Click **Import**
3. Drag these files:
   - `Odoo_Maintenance_API.postman_collection.json`
   - `Odoo_Maintenance_Local.postman_environment.json`
4. Select environment "Odoo Maintenance - Local" from dropdown
5. Start testing!

### Option 2: Manual Setup
1. Read `POSTMAN_API_COLLECTION.md`
2. Create requests manually in Postman
3. Use the examples provided

---

## 📋 All Available Endpoints

### User Endpoints (Base: `/api/v1/user`)
1. `POST /create-account` - Create user account
2. `POST /login` - User login
3. `GET /suggestion` - Get equipment suggestions (Auth required)
4. `POST /create-request` - Create maintenance request (Auth required)
5. `GET /read-request` - Read maintenance requests (Auth required)

### Admin Endpoints (Base: `/api/v1/admin`)
6. `POST /create-account` - Create admin account
7. `POST /login` - Admin login
8. `POST /createTechnician` - Create technician (Auth required)
9. `GET /readTechnician` - Read all technicians (Auth required)
10. `PUT /updateTechnician/:id` - Update technician (Auth required)
11. `DELETE /deleteTechnician/:id` - Delete technician (Auth required)
12. `POST /createMaintenance` - Create maintenance team (Auth required)
13. `GET /readMaintenance` - Read all maintenance teams (Auth required)
14. `PUT /updateMaintenance/:id` - Update maintenance team (Auth required)
15. `DELETE /deleteMaintenance/:id` - Delete maintenance team (Auth required)

---

## 🔧 What I Fixed

1. ✅ Added admin router to `app.ts` (was missing)
2. ✅ Admin routes now accessible at `/api/v1/admin`
3. ✅ Fixed the `comparePassword` TypeScript error in admin interface

---

## 🎯 Quick Test Sequence

Run these in order for a complete test:

```
1. Create Admin Account
2. Admin Login (saves token automatically)
3. Create Maintenance Team (saves team_id automatically)
4. Create Technician (saves technician_id automatically)
5. Create User Account
6. User Login (saves user_token automatically)
7. Create Maintenance Request
8. Read Maintenance Request
```

---

## 💡 Pro Tips

### Auto-Save Feature
The collection includes test scripts that automatically save:
- `admin_token` after admin login
- `user_token` after user login
- `team_id` after creating maintenance team
- `technician_id` after creating technician

You don't need to manually copy/paste these values!

### Environment Variables
Use `{{variable_name}}` in your requests:
- `{{base_url}}` - http://localhost:5000
- `{{admin_token}}` - Auto-populated after admin login
- `{{user_token}}` - Auto-populated after user login
- `{{team_id}}` - Auto-populated after creating team
- `{{technician_id}}` - Auto-populated after creating technician

---

## 📖 Documentation Files

| File | Purpose | When to Use |
|------|---------|-------------|
| `POSTMAN_QUICK_START.md` | Quick setup guide | First time setup |
| `POSTMAN_API_COLLECTION.md` | Complete API reference | Detailed documentation |
| `*.postman_collection.json` | Import file | Import into Postman |
| `*.postman_environment.json` | Environment setup | Import into Postman |

---

## 🔐 Authentication Flow

### For User APIs:
1. Create account or login
2. Copy `accessToken` from response
3. Add to headers: `Authorization: Bearer <accessToken>`

### For Admin APIs:
1. Create admin account or login
2. Copy `token` from response
3. Add to headers: `Authorization: Bearer <token>`

**Note:** The Postman collection does this automatically! ✨

---

## ✅ Testing Checklist

- [ ] Server is running (`npm run dev`)
- [ ] MongoDB is connected
- [ ] Postman collection imported
- [ ] Environment selected
- [ ] Admin account created
- [ ] Admin logged in
- [ ] Maintenance team created
- [ ] Technician created
- [ ] User account created
- [ ] User logged in
- [ ] Maintenance request created
- [ ] All endpoints tested

---

## 🆘 Need Help?

1. Check `POSTMAN_QUICK_START.md` for common issues
2. Check `POSTMAN_API_COLLECTION.md` for API details
3. Check server logs for errors
4. Verify MongoDB connection
5. Check environment variables in Postman

---

## 📊 Server Info

- **Base URL:** http://localhost:5000
- **Port:** 5000 (from .env)
- **Database:** MongoDB
- **JWT Expiry:** 10 days

---

**Ready to test! 🎉**

Start with `POSTMAN_QUICK_START.md` for step-by-step instructions.
