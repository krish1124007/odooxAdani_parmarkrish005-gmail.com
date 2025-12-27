import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { TechnicianModel } from "../../models/technician.models.js";
import { returnResponse } from "../../utils/returnResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { MaintenanceRequestModel } from "../../models/request.models.js";





const seeAllRequests = asyncHandler(async(req,res)=>{
    
    const all_reports = await MaintenanceRequestModel.find({})
})