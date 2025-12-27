import { Document } from "mongoose";

interface IMaintenanceTeam extends Document {
    name: string;
    code: string;
    description?: string;
    isActive: boolean;
}

export type {
    IMaintenanceTeam
};
