import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { TechnicianModel } from "../../models/technician.models.js";
import { returnResponse } from "../../utils/returnResponse.js";
import { ApiError } from "../../utils/ApiError.js";


const createTechnician = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, team } = req.body;

    if (!name || !email || !password || !team) {
        throw new ApiError(400, "All fields are required");
    }

    const existingTechnician = await TechnicianModel.findOne({ email });
    if (existingTechnician) {
        throw new ApiError(400, "Technician already exists");
    }

    const newTechnician = await TechnicianModel.create({
        name,
        email,
        password,
        team
    });

    if (!newTechnician) {
        throw new ApiError(400, "Technician not created");
    }

    const response = await TechnicianModel.findById(newTechnician._id)
        .select("-password")
        .populate("team");

    if (!response) {
        throw new ApiError(400, "Technician not found");
    }

    return returnResponse(res, 201, "Technician created successfully", {
        ...response.toObject()
    });
});

const loginTechnician = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const technician = await TechnicianModel.findOne({ email });

    if (!technician) {
        throw new ApiError(404, "Technician not found");
    }

    const isPasswordMatched = await technician.comparePassword(password);

    if (!isPasswordMatched) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = technician.generateToken();

    if (!accessToken) {
        throw new ApiError(400, "Access token not generated");
    }

    const technicianData = await TechnicianModel.findById(technician._id)
        .select("-password")
        .populate("team");

    return returnResponse(res, 200, "Technician logged in successfully", {
        technician: technicianData,
        accessToken
    });
});

const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    // Using the same refresh token logic as user/admin
    const { technicianId } = req.body;

    if (!technicianId) {
        throw new ApiError(400, "Technician ID is required");
    }

    const technician = await TechnicianModel.findById(technicianId);

    if (!technician) {
        throw new ApiError(404, "Technician not found");
    }

    const newAccessToken = technician.generateToken();

    if (!newAccessToken) {
        throw new ApiError(400, "Access token not generated");
    }

    return returnResponse(res, 200, "Token refreshed successfully", {
        accessToken: newAccessToken
    });
});

export {
    createTechnician,
    loginTechnician,
    refreshToken
};
