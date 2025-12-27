import { Document, Types } from "mongoose";


export interface ITechnician extends Document {
<<<<<<< HEAD
    name: string;
    password: string;
    email: string;
    team: Types.ObjectId;
    comparePassword(password: string): Promise<boolean>;
    generateToken(): string;
=======
    name:string,
    password:string,
    email:string,
    team:Types.ObjectId   
>>>>>>> 70b56b98879f24b41ee33c0254d168d0226a0792
}