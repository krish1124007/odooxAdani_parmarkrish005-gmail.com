import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AdminModel } from "../../models/admin.models.js";
import { returnResponse } from "../../utils/returnResponse.js";
import { ApiError } from "../../utils/ApiError.js";





const createAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    const admin = await AdminModel.create({ email, password });
    return returnResponse(res, 201, "Admin created successfully", admin);
})

const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }
    const token = await admin.generateToken();
    return returnResponse(res, 200, "Admin logged in successfully", { admin, token });
})

export {
    createAdmin,
    loginAdmin
}


