# Maintenance Request Comment System

## Overview
A GitHub-style commenting system for maintenance requests that allows both technicians and users to communicate about request updates and progress.

## Features

### 🎯 Core Functionality
- **Add Comments**: Both users and technicians can comment on requests
- **View Comments**: See all comments in chronological order
- **Edit Comments**: Authors can edit their own comments (marked as edited)
- **Delete Comments**: Authors can delete their own comments
- **Comment Count**: Requests display the number of comments

### 🔐 Authorization
- **Technicians**: Can only comment on requests assigned to them
- **Users**: Can only comment on requests they created
- **Privacy**: Users can only edit/delete their own comments

## Database Schema

### Comment Model
```typescript
{
    request: ObjectId,          // Reference to MaintenanceRequest
    author: ObjectId,           // Reference to User or Technician
    authorModel: "User" | "Technician",  // Discriminator
    content: string,            // Comment text (max 2000 chars)
    isEdited: boolean,          // Whether comment was edited
    editedAt: Date,             // When it was last edited
    createdAt: Date,            // Auto-generated
    updatedAt: Date             // Auto-generated
}
```

## API Endpoints

### Technician Endpoints

#### 1. Add Comment
```
POST /api/technician/requests/:requestId/comments
Authorization: Bearer <technician_token>

Body:
{
    "content": "Working on this issue now..."
}

Response:
{
    "success": true,
    "message": "Comment added successfully",
    "data": {
        "_id": "...",
        "request": "...",
        "author": {
            "_id": "...",
            "name": "John Technician",
            "email": "john@example.com"
        },
        "authorModel": "Technician",
        "content": "Working on this issue now...",
        "isEdited": false,
        "createdAt": "2025-12-27T09:00:00.000Z",
        "updatedAt": "2025-12-27T09:00:00.000Z"
    }
}
```

#### 2. Get All Comments
```
GET /api/technician/requests/:requestId/comments
Authorization: Bearer <technician_token>

Response:
{
    "success": true,
    "message": "Comments retrieved successfully",
    "data": {
        "count": 5,
        "comments": [...]
    }
}
```

#### 3. Update Comment
```
PUT /api/technician/comments/:commentId
Authorization: Bearer <technician_token>

Body:
{
    "content": "Updated comment text..."
}

Response:
{
    "success": true,
    "message": "Comment updated successfully",
    "data": {
        ...comment with isEdited: true, editedAt: Date
    }
}
```

#### 4. Delete Comment
```
DELETE /api/technician/comments/:commentId
Authorization: Bearer <technician_token>

Response:
{
    "success": true,
    "message": "Comment deleted successfully",
    "data": null
}
```

### User Endpoints
Same structure as technician endpoints, but under `/api/user/` prefix:
- `POST /api/user/requests/:requestId/comments`
- `GET /api/user/requests/:requestId/comments`
- `PUT /api/user/comments/:commentId`
- `DELETE /api/user/comments/:commentId`

## Enhanced Request Listing

The `seeAllRequests` endpoint now includes comment counts:

```
GET /api/technician/requests
Authorization: Bearer <technician_token>

Response:
{
    "success": true,
    "message": "All requests",
    "data": [
        {
            "_id": "...",
            "subject": "Equipment malfunction",
            "status": "in_progress",
            "equipment": {...},
            "maintenanceTeam": {...},
            "requestedBy": {
                "name": "Jane User",
                "email": "jane@example.com"
            },
            "commentCount": 5,  // ← NEW!
            ...
        }
    ]
}
```

## Usage Examples

### Scenario 1: Technician Updates Progress
```javascript
// Technician posts an update
POST /api/technician/requests/req123/comments
{
    "content": "Diagnosed the issue. Waiting for replacement parts."
}

// User sees the update and responds
POST /api/user/requests/req123/comments
{
    "content": "Thanks for the update! When do you expect the parts?"
}

// Technician replies
POST /api/technician/requests/req123/comments
{
    "content": "Parts should arrive by tomorrow afternoon."
}
```

### Scenario 2: Editing a Comment
```javascript
// Technician makes a typo
POST /api/technician/requests/req123/comments
{
    "content": "Will be there at 3pm"
}

// Realizes the time is wrong, edits it
PUT /api/technician/comments/comment456
{
    "content": "Will be there at 4pm"
}

// Comment now shows: isEdited: true, editedAt: <timestamp>
```

## Files Created

1. **Interfaces**
   - `src/interfaces/comment.interface.ts` - Comment type definition

2. **Models**
   - `src/models/comment.models.ts` - Mongoose schema

3. **Controllers**
   - `src/controllers/technician/technician.comment.controller.ts`
   - `src/controllers/user/user.comment.controller.ts`

4. **Updated Files**
   - `src/controllers/technician/technician.controller.ts` - Added comment count
   - `src/types/express.d.ts` - Enhanced JWT payload typing

## Next Steps

### 1. Create Routes
You need to create route files to wire up these controllers:

```typescript
// src/routes/technician.routes.ts
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import * as commentController from "../controllers/technician/technician.comment.controller.js";

const router = Router();

// Comment routes
router.post("/requests/:requestId/comments", authMiddleware, commentController.addComment);
router.get("/requests/:requestId/comments", authMiddleware, commentController.getRequestComments);
router.put("/comments/:commentId", authMiddleware, commentController.updateComment);
router.delete("/comments/:commentId", authMiddleware, commentController.deleteComment);

export default router;
```

### 2. Register Routes in App
```typescript
// src/app.ts
import technicianRoutes from "./routes/technician.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use("/api/technician", technicianRoutes);
app.use("/api/user", userRoutes);
```

### 3. Optional Enhancements
- **Real-time notifications**: Use WebSockets to notify users of new comments
- **Mentions**: Add @mention functionality
- **Attachments**: Allow file uploads with comments
- **Reactions**: Add emoji reactions to comments
- **Threading**: Support nested replies

## Testing

### Manual Testing with curl/Postman

1. **Login as technician** to get token
2. **Get assigned requests** to find a requestId
3. **Add a comment** to that request
4. **View all comments** for the request
5. **Edit your comment**
6. **Delete your comment**

### Example Test Flow
```bash
# 1. Login
POST /api/technician/login
{ "email": "tech@example.com", "password": "password" }
# Save the accessToken

# 2. Add comment
POST /api/technician/requests/REQUEST_ID/comments
Authorization: Bearer YOUR_TOKEN
{ "content": "Test comment" }

# 3. Get comments
GET /api/technician/requests/REQUEST_ID/comments
Authorization: Bearer YOUR_TOKEN
```

## Security Considerations

✅ **Implemented**:
- Authorization checks (users can only comment on their requests)
- Author verification (can only edit/delete own comments)
- Input validation (content required, max length 2000 chars)
- Request validation (must exist and be accessible)

⚠️ **Consider Adding**:
- Rate limiting (prevent comment spam)
- Content moderation (filter inappropriate content)
- Audit logs (track who deleted what)
- Soft deletes (keep deleted comments in DB)

## Performance

- **Indexed fields**: `request` and `createdAt` for fast queries
- **Pagination**: Consider adding pagination for requests with many comments
- **Caching**: Consider caching comment counts

---

**Created**: 2025-12-27
**Version**: 1.0.0
