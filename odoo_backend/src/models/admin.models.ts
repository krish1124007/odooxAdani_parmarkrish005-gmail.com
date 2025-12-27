import type { IAdmin } from "../interfaces/admin.interface.js"
import mongoose from "mongoose";



const AdminSchema = new mongoose.Schema<IAdmin>({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

export const AdminModel = mongoose.model<IAdmin>("Admin",AdminSchema)
