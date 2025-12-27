<<<<<<< HEAD
import { Document, Types } from "mongoose";
import type { RequestType, RequestStatus } from "../types/request.types.js";

export interface IMaintenanceRequest extends Document {
    subject: string;

    type: RequestType; // corrective | preventive
    status: RequestStatus; // new | in_progress | repaired | scrap

    equipment: Types.ObjectId; // reference to Equipment
    maintenanceTeam: Types.ObjectId; // reference to MaintenanceTeam
    assignedTechnician?: Types.ObjectId; // User (technician)

    requestedBy: Types.ObjectId; // User who created request

    scheduledDate?: Date; // mandatory for preventive
    startedAt?: Date;
    completedAt?: Date;

    durationInHours?: number; // filled when repaired

    worksheet?: string; // technician work notes

    company: Types.ObjectId; // multi-company ready
    isActive: boolean;
    assignedByTechnician: boolean;

    createdAt: Date;
    updatedAt: Date;
}
=======
>>>>>>> 19aa003f32d52a841ca0d273417bf9a9c9fcb1b1
