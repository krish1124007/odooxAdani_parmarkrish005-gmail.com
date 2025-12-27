import { Document } from "mongoose";

export interface IAdmin extends Document {
    email: string,
    password: string,
    comparePassword(password: string): Promise<boolean>,
    generateToken(): string
}
