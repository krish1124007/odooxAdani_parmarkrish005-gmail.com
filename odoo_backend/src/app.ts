import express from "express";
import type { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { user_router } from "./routers/user.routes.js";
import { inngestServe } from "./inngest/index.js";
dotenv.config();


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use("/api/v1/user", user_router);

// Inngest endpoint for background tasks
app.use("/api/inngest", inngestServe);

export { app }