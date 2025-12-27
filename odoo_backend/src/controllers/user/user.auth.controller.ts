import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UserModel } from "../../models/user.models.js";
import { returnResponse } from "../../utils/returnResponse.js";
import { ApiError } from "../../utils/ApiError.js";


const createAccount = asyncHandler(async (req: Request, res: Response) => {

    const { name, email, password, phone_number } = req.body;
    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await UserModel.findOne({ email });
    if (user) {
        throw new ApiError(400, "User already exists")
    }

    const newUser = await UserModel.create({ name, email, password, phone_number })

    if(!newUser){
        throw new ApiError(400,"User not created")
    }

    const response = await UserModel.findById(newUser._id).select("-password")

    if(!response){
        throw new ApiError(400,"User not found")
    }

    return returnResponse(res, 201,
        "User created successfully",
        {
            ...response
        })
})

const login = asyncHandler(async(req:Request,res:Response)=>{
 
    const {email, password} = req.body;

    if(!email || !password)
    {
        throw new ApiError(400,"All fields are required")
    }

    const user = await UserModel.findOne({email})

    if(!user)
    {
        throw new ApiError(400,"User not found")
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched)
    {
        throw new ApiError(400,"Invalid credentials")
    }

    const accessToken = user.generateToken()

    if(!accessToken)
    {
        throw new ApiError(400,"Access token not generated")
    }
    
    return returnResponse(res,200,"User logged in successfully",{
        ...user,
        accessToken
    })
})



export {createAccount,login}