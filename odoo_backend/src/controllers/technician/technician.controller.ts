import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { TechnicianModel } from "../../models/technician.models.js";
import { returnResponse } from "../../utils/returnResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { MaintenanceRequestModel } from "../../models/request.models.js";
import { CommentModel } from "../../models/comment.models.js";





const seeAllRequests = asyncHandler(async (req, res) => {

    if (!req.user || typeof req.user === 'string') {
        throw new ApiError(401, "Unauthorized - Invalid user data");
    }

    const all_reports = await MaintenanceRequestModel.find({ assignedTechnician: req.user._id })
        .populate("equipment")
        .populate("maintenanceTeam")
        .populate("requestedBy", "name email")
        .sort({ createdAt: -1 });

    // Get comment counts for each request
    const requestsWithComments = await Promise.all(
        all_reports.map(async (request) => {
            const commentCount = await CommentModel.countDocuments({ request: request._id });
            return {
                ...request.toObject(),
                commentCount,
            };
        })
    );

    return returnResponse(res, 200, "All requests", requestsWithComments)
})


const editRequest = asyncHandler(async (req, res) => {

    const { id } = req.params
    const { status } = req.body

    const request = await MaintenanceRequestModel.findById(id)

    if (!request) {
        throw new ApiError(404, "Request not found")
    }

    request.status = status
    await request.save()

    return returnResponse(res, 200, "Request edited successfully", request)
})

export { seeAllRequests, editRequest }
