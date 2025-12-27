import { operate } from "../../utils/Opreation.js";
import type { NextFunction, Request, Response } from "express";


const createTechnician = operate("Technician", "create");
const readTechnician = operate("Technician", "read");
const updateTechnician = operate("Technician", "update");
const deleteTechnician = operate("Technician", "delete");

const createMaintenance = operate("Maintenance", "create");
const readMaintenance = operate("Maintenance", "read");
const updateMaintenance = operate("Maintenance", "update");
const deleteMaintenance = operate("Maintenance", "delete");


const addQuipment = operate("Quipment", "create");
const readQuipment = operate("Quipment", "read");
const updateQuipment = operate("Quipment", "update");
const deleteQuipment = operate("Quipment", "delete");

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
