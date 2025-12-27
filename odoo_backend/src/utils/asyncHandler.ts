import type { Request, Response, NextFunction } from "express"

type Asynfn = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export function asyncHandler(fn: Asynfn) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}