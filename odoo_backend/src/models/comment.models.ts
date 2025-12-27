import mongoose, { Schema } from "mongoose";
import type { IComment } from "../interfaces/comment.interface.js";

const CommentSchema = new Schema<IComment>(
    {
        request: {
            type: Schema.Types.ObjectId,
            ref: "MaintenanceRequest",
            required: true,
            index: true, // for faster queries
        },

        author: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: "authorModel", // dynamic reference
        },

        authorModel: {
            type: String,
            required: true,
            enum: ["User", "Technician"],
        },

        content: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 2000, // limit comment length
        },

        isEdited: {
            type: Boolean,
            default: false,
        },

        editedAt: {
            type: Date,
        },
    },
    {
        timestamps: true, // auto-creates createdAt and updatedAt
    }
);

// Index for efficient querying
CommentSchema.index({ request: 1, createdAt: -1 });

export const CommentModel = mongoose.model<IComment>("Comment", CommentSchema);
