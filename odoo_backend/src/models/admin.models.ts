import type { IAdmin } from "../interfaces/admin.interface.js"
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

type AdminDocument = IAdmin & mongoose.Document

const AdminSchema = new mongoose.Schema<AdminDocument>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

AdminSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});


AdminSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

AdminSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "10d" }
    )
}

export const AdminModel = mongoose.model<AdminDocument>("Admin", AdminSchema)
