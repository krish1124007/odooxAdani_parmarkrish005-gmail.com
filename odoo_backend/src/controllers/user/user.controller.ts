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
        type, // Preventive, Corrective, etc.
        equipment, // Equipment ID
        priority, // Added priority
        department, // Added department
        description, // Added description (mapped to subject or separate)
        maintenanceTeam,
        assignedTechnician,
        scheduledDate,
        startedAt,
        completedAt,
        durationInHours,
        worksheet,
        company,
    } = req.body;

    const requestedBy = (req.user as any)?._id;

    // Validation: Only Subject (or Description), Equipment, and Type are strictly required for a basic request
    if (!equipment) {
        throw new ApiError(400, "Equipment is required");
    }

    // Default values if not provided
    const requestData = {
        subject: subject || description || "Maintenance Request",
        description: description || subject,
        type: type || "Corrective",
        equipment,
        priority: priority || "Medium",
        department: department || "General",
        maintenanceTeam, // Optional at creation
        assignedTechnician, // Optional at creation
        requestedBy,
        scheduledDate,
        startedAt,
        completedAt,
        durationInHours,
        worksheet,
        company: company || "Default Company", // Placeholder or fetch from user profile if available
        status: "New"
    };

    const request = await MaintenanceRequestModel.create(requestData);

    // Trigger Inngest event to send email notification to technician
    if (assignedTechnician) {
        await inngest.send({
            name: "maintenance/request.created",
            data: {
                requestId: request._id.toString(),
                technicianId: assignedTechnician,
                requestedById: requestedBy,
                subject: requestData.subject,
                type: requestData.type,
                equipmentId: equipment,
            },
        });
    }

    return returnResponse(res, 201, "Request created successfully", request);
})

const readRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = (req.user as any)?._id;

    if (id) {
        // Detail View
        const request = await MaintenanceRequestModel.findById(id).populate("equipment").populate("requestedBy").populate("assignedTechnician");
        if (!request) {
            throw new ApiError(404, "Request not found");
        }
        return returnResponse(res, 200, "Request found", request);
    } else {
        // List View - Filter by user's involvement (Creator OR Technician)
        // Note: populate is important for frontend display
        const requests = await MaintenanceRequestModel.find({
            $or: [
                { requestedBy: userId },
                { assignedTechnician: userId }
            ]
        })
            .sort({ createdAt: -1 })
            .populate("equipment_id") // Ensure this matches the schema field name for ref (usually 'equipment' or 'equipment_id')
            .populate("equipment") // Trying both common naming conventions just in case, or check schema.
            // Checking schema via assumption from createRequest: 'equipment'
            .populate("maintenanceTeam")
            .populate("assignedTechnician");

        return returnResponse(res, 200, "Requests fetched successfully", requests);
    }
})


export {
    suggestion,
    createRequest,
    readRequest
}
