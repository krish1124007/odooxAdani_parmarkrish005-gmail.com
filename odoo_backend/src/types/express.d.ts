import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

interface CustomJwtPayload extends JwtPayload {
    _id: string | Types.ObjectId;
}

declare global {
    namespace Express {
        interface Request {
            user?: string | CustomJwtPayload;
        }
    }
}

export { };
