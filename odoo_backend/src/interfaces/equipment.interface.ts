import { Document, Types } from "mongoose";

export type EquipmentStatus = "active" | "under_maintenance" | "scrapped";

export interface IEquipment extends Document {
    name: string;
    serialNumber: string;

    category: string; // IT, Mechanical, Electrical, etc.

    location: string; // Office 2nd Floor, Assembly Line A

    maintenanceTeam: Types.ObjectId; // MaintenanceTeam
    defaultTechnician?: Types.ObjectId; // User (technician)

    purchaseDate?: Date;
    warrantyExpiry?: Date;

    status: EquipmentStatus;



    createdAt: Date;
    updatedAt: Date;
}
