import mongoose, { Schema } from "mongoose";
import type { IMaintenanceRequest } from "../interfaces/request.interface.js";

const MaintenanceRequestSchema = new Schema<IMaintenanceRequest>(
    {
        subject: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            enum: ["corrective", "preventive"],
            required: true,
        },

        status: {
            type: String,
            enum: ["new", "in_progress", "repaired", "scrap"],
            default: "new",
        },

        equipment: {
            type: Schema.Types.ObjectId,
            ref: "Equipment",
            required: true,
        },

        maintenanceTeam: {
            type: Schema.Types.ObjectId,
            ref: "MaintenanceTeam",
            required: true,
        },

        assignedTechnician: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        requestedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        scheduledDate: {
            type: Date,
        },

        startedAt: {
            type: Date,
        },

        completedAt: {
            type: Date,
        },

        durationInHours: {
            type: Number,
            min: 0,
        },

        worksheet: {
            type: String,
        },

        company: {
            type: Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
        assignedByTechnician: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const MaintenanceRequestModel = mongoose.model(
    "MaintenanceRequest",
    MaintenanceRequestSchema
);
