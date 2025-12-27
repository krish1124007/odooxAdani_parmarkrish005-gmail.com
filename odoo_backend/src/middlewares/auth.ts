import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const token:string = authHeader.split(" ")[1] as string;

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not configured");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        ) 

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
