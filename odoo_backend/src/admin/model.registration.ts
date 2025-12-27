import { Model } from "mongoose";
import { UserModel } from "../models/user.models.js";
import { MaintenanceTeamModel } from "../models/maintenance.models.js";
import { TechnicianModel } from "../models/technician.models.js";
import { EquipmentModel } from "../models/equipment.models.js";

export const models: Record<string, Model<any>> = {
    User: UserModel,
    MaintenanceTeam: MaintenanceTeamModel,
    Technician: TechnicianModel,
    Equipment: EquipmentModel,
};

export type ModelType = keyof typeof models;
