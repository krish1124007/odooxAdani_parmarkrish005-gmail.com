# 🚀 Quick Start Guide - Postman Testing

## 📥 Import into Postman

### Method 1: Import Collection & Environment Files
1. Open Postman
2. Click **Import** button (top left)
3. Drag and drop these files:
   - `Odoo_Maintenance_API.postman_collection.json`
   - `Odoo_Maintenance_Local.postman_environment.json`
4. Click **Import**

### Method 2: Manual Setup
If you prefer manual setup, see `POSTMAN_API_COLLECTION.md` for detailed API documentation.

---

## ⚙️ Setup Environment

1. In Postman, select **Odoo Maintenance - Local** environment from the dropdown (top right)
2. The `base_url` is pre-configured as `http://localhost:5000`
3. Other variables (`user_token`, `admin_token`, etc.) will auto-populate as you test

---

## 🧪 Testing Workflow (Step-by-Step)

### ✅ Step 1: Start Your Server
Make sure your backend is running:
```bash
cd c:\Users\Krish\Desktop\odoo_back\odoo_backend
npm run dev
```

### ✅ Step 2: Test Admin Flow

#### 2.1 Create Admin Account
- **Folder:** Admin Authentication
- **Request:** Create Admin Account
- **Action:** Click **Send**
- **Expected:** 201 Created

#### 2.2 Admin Login
- **Folder:** Admin Authentication
- **Request:** Admin Login
- **Action:** Click **Send**
- **Expected:** 200 OK
- **Auto-saved:** `admin_token` environment variable ✨

#### 2.3 Create Maintenance Team
- **Folder:** Admin - Maintenance Team Management
- **Request:** Create Maintenance Team
- **Action:** Click **Send**
- **Expected:** 201 Created
- **Auto-saved:** `team_id` environment variable ✨

#### 2.4 Create Technician
- **Folder:** Admin - Technician Management
- **Request:** Create Technician
- **Action:** Click **Send**
- **Expected:** 201 Created
- **Auto-saved:** `technician_id` environment variable ✨

### ✅ Step 3: Test User Flow

#### 3.1 Create User Account
- **Folder:** User Authentication
- **Request:** Create User Account
- **Action:** Click **Send**
- **Expected:** 201 Created

#### 3.2 User Login
- **Folder:** User Authentication
- **Request:** User Login
- **Action:** Click **Send**
- **Expected:** 200 OK
- **Auto-saved:** `user_token` environment variable ✨

#### 3.3 Create Maintenance Request
- **Folder:** User APIs
- **Request:** Create Maintenance Request
- **Note:** Update `equipment_id` and `requestedBy` in the body with actual IDs
- **Action:** Click **Send**
- **Expected:** 201 Created

#### 3.4 Read Maintenance Request
- **Folder:** User APIs
- **Request:** Read Maintenance Request
- **Action:** Click **Send**
- **Expected:** 200 OK

---

## 🎯 Quick Test (All APIs in Order)

Run these requests in sequence:

1. ✅ **Admin Authentication** → Create Admin Account
2. ✅ **Admin Authentication** → Admin Login
3. ✅ **Admin - Maintenance Team** → Create Maintenance Team
4. ✅ **Admin - Maintenance Team** → Read All Maintenance Teams
5. ✅ **Admin - Technician** → Create Technician
6. ✅ **Admin - Technician** → Read All Technicians
7. ✅ **User Authentication** → Create User Account
8. ✅ **User Authentication** → User Login
9. ✅ **User APIs** → Create Maintenance Request
10. ✅ **User APIs** → Read Maintenance Request

---

## 🔑 Environment Variables (Auto-populated)

These variables are automatically set by test scripts in the collection:

| Variable | Set By | Used In |
|----------|--------|---------|
| `base_url` | Pre-configured | All requests |
| `admin_token` | Admin Login | All admin endpoints |
| `user_token` | User Login | All user endpoints |
| `team_id` | Create Maintenance Team | Create Technician, Create Request |
| `technician_id` | Create Technician | Create Request |

---

## 📝 Manual Variable Setup (If Needed)

If auto-population doesn't work:

1. Click the **Environment** icon (eye icon, top right)
2. Click **Edit** next to "Odoo Maintenance - Local"
3. Manually paste values into the **Current Value** column
4. Click **Save**

---

## 🛠️ Common Issues

### Issue: "Cannot connect to localhost:5000"
**Solution:** 
- Make sure your server is running: `npm run dev`
- Check if MongoDB is connected
- Verify the port in `.env` file is 5000

### Issue: "Authorization header missing"
**Solution:**
- Make sure you've logged in (Admin Login or User Login)
- Check that the token is saved in environment variables
- Verify the Authorization header is set: `Bearer {{admin_token}}` or `Bearer {{user_token}}`

### Issue: "Invalid token"
**Solution:**
- Tokens expire after 10 days
- Login again to get a fresh token

### Issue: "All fields are required"
**Solution:**
- Check the request body has all required fields
- Refer to `POSTMAN_API_COLLECTION.md` for required fields

### Issue: Variables not auto-populating
**Solution:**
- Check the **Tests** tab in the request
- Make sure the test script is present
- Manually copy the token from response and paste into environment

---

## 📊 Response Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | ✅ Request successful |
| 201 | Created | ✅ Resource created |
| 400 | Bad Request | ❌ Check request body |
| 401 | Unauthorized | ❌ Check token/login |
| 404 | Not Found | ❌ Resource doesn't exist |
| 500 | Server Error | ❌ Check server logs |

---

## 🎨 Postman Tips

### 1. Use Collection Runner
- Click **Runner** button
- Select "Odoo Maintenance System API" collection
- Click **Run** to test all endpoints sequentially

### 2. Save Responses as Examples
- After a successful request, click **Save Response**
- Click **Save as Example**
- Helps document expected responses

### 3. Use Pre-request Scripts
- Add delays between requests if needed
- Set up dynamic data

### 4. Monitor API Performance
- Check response times in Postman
- Look for slow endpoints

---

## 📚 Additional Resources

- **Full API Documentation:** `POSTMAN_API_COLLECTION.md`
- **Inngest Integration:** `INNGEST_INTEGRATION.md`
- **Inngest Setup:** `INNGEST_SETUP.md`

---

## 🎯 Next Steps

1. ✅ Import collection and environment
2. ✅ Start your server
3. ✅ Test admin flow
4. ✅ Test user flow
5. ✅ Create maintenance requests
6. ✅ Verify Inngest notifications (if configured)

---

**Happy Testing! 🚀**

Last Updated: December 27, 2025
