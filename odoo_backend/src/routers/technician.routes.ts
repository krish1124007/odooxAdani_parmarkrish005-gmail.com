import { Router } from "express";
import {
    createTechnician,
    loginTechnician,
    refreshToken
} from "../controllers/technician/technician.auth.controller.js";
import { authMiddleware } from "../middlewares/auth.js";


const router = Router();


// Auth routes
router.route("/create-account").post(createTechnician);
router.route("/login").post(loginTechnician);
router.route("/refresh-token").post(authMiddleware, refreshToken);


export const technician_router = router;
