import express from "express";
import type { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { user_router } from "./routers/user.routes.js";
import { admin_router } from "./routers/admin.routers.js";
import { technician_router } from "./routers/technician.routes.js";
import { inngestServe } from "./inngest/index.js";
dotenv.config();


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use("/api/v1/user", user_router);
app.use("/api/v1/admin", admin_router);
app.use("/api/v1/technician", technician_router);

// Inngest endpoint for background tasks
app.use("/api/inngest", inngestServe);

export { app }