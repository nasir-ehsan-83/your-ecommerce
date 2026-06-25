import { Router } from "express";

import { validateRequest } from "../middlewares/validate.request.middleware";
import { validateResponse } from "../middlewares/validate.response.middleware";
import { checkRole } from "../middlewares/role.check.middleware";
import { getCurrentUser } from "../middlewares/current.user.middleware.js";
import { 
    createProductSchema,
    productResponseSchema
} from "../validators/product.validator.js";
import { createProduct } from "../controllers/product.controller";

const router = Router();

router.use(getCurrentUser, checkRole(["ADMIN"]));

router.post("/", validateRequest(createProductSchema), validateResponse(productResponseSchema), createProduct)

export default router;