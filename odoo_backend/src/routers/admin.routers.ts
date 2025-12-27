import {
    createTechnician,
    readTechnician,
    updateTechnician,
    deleteTechnician,
    createMaintenance,
    readMaintenance,
    updateMaintenance,
    deleteMaintenance,
    addQuipment,
    readQuipment,
    updateQuipment,
    deleteQuipment,
} from "../controllers/admin/admin.controller.js";
import { createAdmin,loginAdmin } from "../controllers/admin/admin.auth.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { Router } from "express";


const router = Router();

router.post("/create-account",createAdmin)
router.post("/login",loginAdmin)

router.post("/createTechnician", authMiddleware, createTechnician);
router.get("/readTechnician", authMiddleware, readTechnician);
router.put("/updateTechnician/:id", authMiddleware, updateTechnician);
router.delete("/deleteTechnician/:id", authMiddleware, deleteTechnician);
router.post("/createMaintenance", authMiddleware, createMaintenance);
router.get("/readMaintenance", authMiddleware, readMaintenance);
router.put("/updateMaintenance/:id", authMiddleware, updateMaintenance);
router.delete("/deleteMaintenance/:id", authMiddleware, deleteMaintenance);
router.post("/addQuipment", authMiddleware, addQuipment);
router.get("/readQuipment", authMiddleware, readQuipment);
router.put("/updateQuipment/:id", authMiddleware, updateQuipment);
router.delete("/deleteQuipment/:id", authMiddleware, deleteQuipment);

export const admin_router = router;

