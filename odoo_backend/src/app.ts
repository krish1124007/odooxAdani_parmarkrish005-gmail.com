import express from "express";
import type { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { user_router } from "./routers/user.routes.js";
<<<<<<< HEAD
import { admin_router } from "./routers/admin.routers.js";
import { technician_router } from "./routers/technician.routes.js";
import { inngestServe } from "./inngest/index.js";
=======
>>>>>>> 70b56b98879f24b41ee33c0254d168d0226a0792
dotenv.config();


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

<<<<<<< HEAD
app.use("/api/v1/user", user_router);
app.use("/api/v1/admin", admin_router);
app.use("/api/v1/technician", technician_router);

// Inngest endpoint for background tasks
app.use("/api/inngest", inngestServe);
=======
app.use("/api/v1/user",user_router);
>>>>>>> 70b56b98879f24b41ee33c0254d168d0226a0792

export { app }