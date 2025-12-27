import type { IUser } from "../interfaces/user.interface.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

type UserDocument = IUser & mongoose.Document

const UserSchema = new mongoose.Schema<UserDocument>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: false
    }
})

UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});


UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "10d" }
    )
}

export const UserModel = mongoose.model<UserDocument>("User", UserSchema)