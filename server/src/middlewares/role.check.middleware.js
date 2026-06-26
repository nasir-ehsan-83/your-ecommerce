import { asyncHandler } from "../utils/async.handler.js";

export const checkRole = (allowedRoles) => {
    // function to check user.role
    return asyncHandler(async (req, res, next) => {
        
        // is user.role in allowdRoles?
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                status: "error",
                message: "Forbidden: You do not have permission to access this resource"
            });
        }
        
        next();
    });
};