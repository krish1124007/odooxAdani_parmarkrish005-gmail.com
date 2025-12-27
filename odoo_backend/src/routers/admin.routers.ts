import {
    createTechnician,
    readTechnician,
    updateTechnician,
    deleteTechnician,
    createMaintenance,
    readMaintenance,
    updateMaintenance,
    deleteMaintenance,
<<<<<<< HEAD
    addQuipment,
    readQuipment,
    updateQuipment,
    deleteQuipment,
} from "../controllers/admin/admin.controller.js";
import { createAdmin,loginAdmin } from "../controllers/admin/admin.auth.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
=======
} from "../controllers/admin/admin.controller.js";
>>>>>>> 70b56b98879f24b41ee33c0254d168d0226a0792
import { Router } from "express";


const router = Router();

<<<<<<< HEAD
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
=======
router.post("/createTechnician", createTechnician);
router.get("/readTechnician", readTechnician);
router.put("/updateTechnician/:id", updateTechnician);
router.delete("/deleteTechnician/:id", deleteTechnician);
router.post("/createMaintenance", createMaintenance);
router.get("/readMaintenance", readMaintenance);
router.put("/updateMaintenance/:id", updateMaintenance);
router.delete("/deleteMaintenance/:id", deleteMaintenance);

>>>>>>> 70b56b98879f24b41ee33c0254d168d0226a0792

export const admin_router = router;

