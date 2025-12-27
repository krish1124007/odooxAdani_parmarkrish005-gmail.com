import type { Document } from "mongoose";


export interface IUser extends Document {
    name?: string,
    email: string,
    password: string,
    phone_number?: number,

    // Instance methods
    comparePassword(password: string): Promise<boolean>;
    generateToken(): string;
}