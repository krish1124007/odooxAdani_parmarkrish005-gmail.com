import {operate} from "../../utils/Opreation.js";
import { UserModel } from "../../models/user.models.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import type { Request , Response } from "express";
import { ApiError } from "../../utils/ApiError.js";
import { MaintenanceRequestModel } from "../../models/request.models.js";
import { returnResponse } from "../../utils/returnResponse.js";

const createRequest = asyncHandler(async(req,res)=>{

    const {
        subject,
        type,
        equipment,
        maintenanceTeam,
        assignedTechnician,
        requestedBy,
        scheduledDate,
        startedAt,
        completedAt,
        durationInHours,
        worksheet,
        company,
    } = req.body;
    
    if(!subject || !type || !equipment || !maintenanceTeam || !requestedBy || !company)
    {
        throw new ApiError(400,"All fields are required");
    }

    const request = await MaintenanceRequestModel.create({
        subject,
        type,
        equipment,
        maintenanceTeam,
        assignedTechnician,
        requestedBy,
        scheduledDate,
        startedAt,
        completedAt,
        durationInHours,
        worksheet,
        company,
    })

    return returnResponse(res,201,"Request created successfully",request);
})

