import { Document, Types } from "mongoose";

export interface IComment extends Document {
    request: Types.ObjectId; // reference to MaintenanceRequest
    author: Types.ObjectId; // User or Technician who commented
    authorModel: "User" | "Technician"; // discriminator for polymorphic reference
    content: string;
    isEdited: boolean;
    editedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
