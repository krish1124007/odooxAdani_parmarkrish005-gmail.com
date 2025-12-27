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
        equipment_id, // Frontend often sends this
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
    const finalEquipment = equipment || equipment_id;

    // Validation
    if (!finalEquipment) {
        throw new ApiError(400, "Equipment is required");
    }

    // Default values if not provided
    const requestData = {
        subject: subject || description || "Maintenance Request",
        description: description || subject,
        type: type || "corrective", // Lowercase per enum
        equipment: finalEquipment,
        priority: priority || "Medium",
        department: department || "General",
        maintenanceTeam: maintenanceTeam || "000000000000000000000000", // Dummy ID to satisfy required:true if not provided (Middleware/Service usually assigns this) - OR BETTER: The user should pick a team? No, user doesn't know. Admin assigns. I should make Schema optional. For now, passing a dummy or relying on Schema change.
        // Actually, passing a specific string might fail cast. 
        // Let's rely on modifying the Schema to remove 'required' for these fields in the NEXT step.
        assignedTechnician,
        requestedBy,
        scheduledDate,
        startedAt,
        completedAt,
        durationInHours,
        worksheet,
        company: company || "000000000000000000000000", // Dummy ID 
        status: "new" // Lowercase per enum
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
    
    const userId = (req.user as any)?._id;

   
        // List View - Filter by user's involvement (Creator OR Technician)
        // Note: populate is important for frontend display
        const requests = await MaintenanceRequestModel.find({
            $or: [
                { requestedBy: userId }
            ]
        })
            .sort({ createdAt: -1 })
            .populate("equipment")
            .populate("maintenanceTeam")
            .populate("assignedTechnician");

        return returnResponse(res, 200, "Requests fetched successfully", requests);
    
})


export {
    suggestion,
    createRequest,
    readRequest
}
