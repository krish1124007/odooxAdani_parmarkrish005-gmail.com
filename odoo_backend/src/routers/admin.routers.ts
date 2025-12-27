import {
    createTechnician,
    readTechnician,
    updateTechnician,
    deleteTechnician,
    createMaintenance,
    readMaintenance,
    updateMaintenance,
    deleteMaintenance,
} from "../controllers/admin/admin.controller.js";
import { Router } from "express";


const router = Router();

router.post("/createTechnician", createTechnician);
router.get("/readTechnician", readTechnician);
router.put("/updateTechnician/:id", updateTechnician);
router.delete("/deleteTechnician/:id", deleteTechnician);
router.post("/createMaintenance", createMaintenance);
router.get("/readMaintenance", readMaintenance);
router.put("/updateMaintenance/:id", updateMaintenance);
router.delete("/deleteMaintenance/:id", deleteMaintenance);


export const admin_router = router;

