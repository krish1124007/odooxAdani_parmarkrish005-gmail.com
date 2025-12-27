import { UserModel } from "../../models/user.models.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import type { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError.js";
import { MaintenanceRequestModel } from "../../models/request.models.js";
import { returnResponse } from "../../utils/returnResponse.js";
import { EquipmentModel } from "../../models/equipment.models.js";
import { inngest } from "../../inngest/client.js";


const suggestion = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const equipment = await EquipmentModel.find({ name: { $regex: name, $options: "i" } });

    if (!equipment) {
        throw new ApiError(404, "Equipment not found");
    }

    return returnResponse(res, 200, "Equipment found", equipment);
})

const createRequest = asyncHandler(async (req, res) => {

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

    if (!subject || !type || !equipment || !maintenanceTeam || !requestedBy || !company) {
        throw new ApiError(400, "All fields are required");
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

    // Trigger Inngest event to send email notification to technician
    if (assignedTechnician) {
        await inngest.send({
            name: "maintenance/request.created",
            data: {
                requestId: request._id.toString(),
                technicianId: assignedTechnician,
                requestedById: requestedBy,
                subject,
                type,
                equipmentId: equipment,
            },
        });
    }

    return returnResponse(res, 201, "Request created successfully", request);
})

const readRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Invalid request id");
    }
    const request = await MaintenanceRequestModel.findById(id);
    if (!request) {
        throw new ApiError(404, "Request not found");
    }
    return returnResponse(res, 200, "Request found", request);
})


export {
    suggestion,
    createRequest,
    readRequest
}
