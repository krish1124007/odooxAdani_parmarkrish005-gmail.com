import { operate } from "../../utils/Opreation.js";
import type { NextFunction, Request, Response } from "express";


const createTechnician = operate("Technician", "create");
const readTechnician = operate("Technician", "read");
const updateTechnician = operate("Technician", "update");
const deleteTechnician = operate("Technician", "delete");

const createMaintenance = operate("MaintenanceTeam", "create");
const readMaintenance = operate("MaintenanceTeam", "read");
const updateMaintenance = operate("MaintenanceTeam", "update");
const deleteMaintenance = operate("MaintenanceTeam", "delete");


const addQuipment = operate("Equipment", "create");
const readQuipment = operate("Equipment", "read");
const updateQuipment = operate("Equipment", "update");
const deleteQuipment = operate("Equipment", "delete");

export { 
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
};
