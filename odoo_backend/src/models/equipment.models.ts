import mongoose, { Schema } from "mongoose";
import type { IEquipment } from "../interfaces/equipment.interface.js";

const EquipmentSchema = new Schema<IEquipment>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        serialNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        maintenanceTeam: {
            type: Schema.Types.ObjectId,
            ref: "MaintenanceTeam",
            required: true,
        },

        defaultTechnician: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        purchaseDate: {
            type: Date,
        },

        warrantyExpiry: {
            type: Date,
        },

        status: {
            type: String,
            enum: ["active", "under_maintenance", "scrapped"],
            default: "active",
        },

    },
    {
        timestamps: true,
    }
);

export const EquipmentModel = mongoose.model<IEquipment>(
    "Equipment",
    EquipmentSchema
);
