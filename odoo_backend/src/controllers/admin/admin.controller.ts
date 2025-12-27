import { operate } from "../../utils/Opreation.js";
import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { TechnicianModel } from "../../models/technician.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { returnResponse } from "../../utils/returnResponse.js";
import bcrypt from "bcrypt";


const createTechnician = operate("Technician", "create");
const readTechnician = operate("Technician", "read");
const updateTechnician = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password, team } = req.body;

    const updateData: any = { name, email, team };

    // If password is provided and not empty, hash it
    if (password && password.trim() !== "") {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedTechnician = await TechnicianModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    ).select("-password");

    if (!updatedTechnician) {
        throw new ApiError(404, "Technician not found or update failed");
    }

    return returnResponse(res, 200, "Technician updated successfully", updatedTechnician);
});
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
