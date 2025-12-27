import { Router } from "express";
import {
    createTechnician,
    loginTechnician,
    refreshToken
} from "../controllers/technician/technician.auth.controller.js";
import {
    addComment,
    getRequestComments,
    updateComment,
    deleteComment
} from "../controllers/technician/technician.comment.controller.js";
import { authMiddleware } from "../middlewares/auth.js";


const router = Router();


// Auth routes
router.route("/create-account").post(createTechnician);
router.route("/login").post(loginTechnician);
router.route("/refresh-token").post(authMiddleware, refreshToken);

// Comment routes
router.route("/:requestId/add-comment").post(authMiddleware, addComment);
router.route("/:requestId/get-comments").get(authMiddleware, getRequestComments);
router.route("/:commentId/update-comment").put(authMiddleware, updateComment);
router.route("/:commentId/delete-comment").delete(authMiddleware, deleteComment);

export const technician_router = router;
