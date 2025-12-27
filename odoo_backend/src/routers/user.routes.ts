import { Router } from "express";
import { createAccount, login } from "../controllers/user/user.auth.controller.js";
import {
    suggestion,
    createRequest,
    readRequest
} from "../controllers/user/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";


const router = Router()


router.route("/create-account").post(createAccount)
router.route("/login").post(login)
router.route("/suggestion").get(authMiddleware, suggestion)
router.route("/create-request").post(authMiddleware, createRequest)
router.route("/read-request").get(authMiddleware, readRequest)


export const user_router = router;