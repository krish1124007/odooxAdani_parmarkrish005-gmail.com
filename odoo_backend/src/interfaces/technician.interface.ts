import { Document, Types } from "mongoose";


export interface ITechnician extends Document {
    name:string,
    password:string,
    email:string,
    team:Types.ObjectId   
}