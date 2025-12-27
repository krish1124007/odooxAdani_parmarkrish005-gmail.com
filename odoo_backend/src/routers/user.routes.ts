import { Router } from "express";
import { createAccount, login } from "../controllers/user/user.auth.controller.js";
<<<<<<< HEAD
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
=======

>>>>>>> 70b56b98879f24b41ee33c0254d168d0226a0792

const router = Router()


router.route("/create-account").post(createAccount)
router.route("/login").post(login)
<<<<<<< HEAD
router.route("/suggestion").get(authMiddleware, suggestion)
router.route("/create-request").post(authMiddleware, createRequest)
router.route("/read-request").get(authMiddleware, readRequest)

// Comment routes
router.route("/:requestId/add-comment").post(authMiddleware, addComment);
router.route("/:requestId/get-comments").get(authMiddleware, getRequestComments);
router.route("/:commentId/update-comment").put(authMiddleware, updateComment);
router.route("/:commentId/delete-comment").delete(authMiddleware, deleteComment);
=======

>>>>>>> 70b56b98879f24b41ee33c0254d168d0226a0792

export const user_router = router;