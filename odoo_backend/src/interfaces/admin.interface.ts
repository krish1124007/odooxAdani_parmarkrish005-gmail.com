import { Document } from "mongoose";

<<<<<<< HEAD
export interface IAdmin extends Document {
    email: string,
    password: string,
    comparePassword(password: string): Promise<boolean>,
    generateToken(): string
=======


export interface IAdmin extends Document{
    email:string,
    password:string
>>>>>>> 19aa003f32d52a841ca0d273417bf9a9c9fcb1b1
}
