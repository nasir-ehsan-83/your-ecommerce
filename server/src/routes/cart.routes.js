import { Router } from "express";

import { getCurrentUser } from "../middlewares/current.user.middleware.js";
import { validateRequest } from "../middlewares/validate.request.middleware.js";
import { validateResponse } from "../middlewares/validate.response.middleware.js";
import { addToCartSchema } from "../validators/cart.validator.js"
import { addToCart } from "../controllers/cart.controller.js";

const router = Router();

router.post("/", getCurrentUser, validateRequest(addToCartSchema), addToCart);

export default router;