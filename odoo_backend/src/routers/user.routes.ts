import { Router } from "express";
import { createAccount, login } from "../controllers/user/user.auth.controller.js";
import {
    suggestion,
    createRequest,
    readRequest
} from "../controllers/user/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
    addComment,
    getRequestComments,
    updateComment,
    deleteComment
} from "../controllers/user/user.comment.controller.js";

const router = Router()


router.route("/create-account").post(createAccount)
router.route("/login").post(login)
router.route("/suggestion").get(authMiddleware, suggestion)
router.route("/create-request").post(authMiddleware, createRequest)
router.route("/read-request").get(authMiddleware, readRequest)

// Comment routes
router.route("/:requestId/add-comment").post(authMiddleware, addComment);
router.route("/:requestId/get-comments").get(authMiddleware, getRequestComments);
router.route("/:commentId/update-comment").put(authMiddleware, updateComment);
router.route("/:commentId/delete-comment").delete(authMiddleware, deleteComment);

export const user_router = router;