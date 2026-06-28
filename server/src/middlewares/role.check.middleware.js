import { asyncHandler } from "../utils/async.handler.js";

export const checkRole = (allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: No user or role found on request object."
            });
        }

        const userRoleStr = String(req.user.role).toUpperCase().trim();
        const cleanAllowedRoles = allowedRoles.map(role => String(role).toUpperCase().trim());

        if (!cleanAllowedRoles.includes(userRoleStr)) {
            return res.status(403).json({
                status: "error",
                message: `Forbidden: Your role (${userRoleStr}) is not allowed.`
            });
        }
        
        next();
    });
};
