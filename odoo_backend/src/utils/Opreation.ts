import { models } from "../admin/model.registration.js";
import type { ModelType } from "../admin/model.registration.js";
import type { Request, Response, NextFunction } from "express";
import { returnResponse } from "./returnResponse.js";
import { ApiError } from "./ApiError.js";

export function operate(
    modelName: ModelType,
    operation: "read" | "create" | "update" | "delete"
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Model = models[modelName];

            if (!Model) {
                throw new ApiError(404, `Model ${modelName} not found`);
            }

            switch (operation) {
                case "read":
                    const rp = await Model.find();
                    return returnResponse(res,200,"fetch successfully",rp);

                case "create":
                    const cp = await Model.create(req.body);

                    if(!cp)
                    {
                        throw new ApiError(400,"created failed");
                    }

                    return returnResponse(res,201,"created successfully",cp);

                case "update":
                    const up = await Model.findByIdAndUpdate(
                        req.params.id,
                        req.body,
                            { new: true }
                        )

                        if(!up)
                        {
                            throw new ApiError(400,"updated failed");
                        }

                    return returnResponse(res,200,"updated successfully",up);

                case "delete":
                    const dp = await Model.findByIdAndDelete(req.params.id);
                    return res.status(204).send();
            }
        } catch (err) {
            next(err);
        }
    };
}
