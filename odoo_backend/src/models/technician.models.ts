import type { ITechnician } from "../interfaces/technician.interface.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

type TechnicianDocument = ITechnician & mongoose.Document


const TechnicianSchema = new mongoose.Schema<TechnicianDocument>({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MaintenanceTeam",
        required: true,
    },
    
})

TechnicianSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});


TechnicianSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

TechnicianSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "10d" }
    )
}

export const TechnicianModel = mongoose.model<TechnicianDocument>("Technician", TechnicianSchema);