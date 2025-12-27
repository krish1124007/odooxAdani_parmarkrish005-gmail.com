import type { IMaintenanceTeam } from "../interfaces/maintenance.interface.js";
import mongoose from "mongoose";



const MaintenanceTeamSchema = new mongoose.Schema<IMaintenanceTeam>({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
},
{
    timestamps: true,
})

export const MaintenanceTeamModel = mongoose.model<IMaintenanceTeam>("MaintenanceTeamModel", MaintenanceTeamSchema);