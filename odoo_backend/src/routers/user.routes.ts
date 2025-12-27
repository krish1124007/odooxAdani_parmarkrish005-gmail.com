import { Router } from "express";
import { createAccount, login } from "../controllers/user/user.auth.controller.js";


const router = Router()


router.route("/create-account").post(createAccount)
router.route("/login").post(login)


export const user_router = router;