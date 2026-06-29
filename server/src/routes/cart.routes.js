import { Router } from "express";

import { getCurrentUser } from "../middlewares/current.user.middleware.js";
import { validateRequest } from "../middlewares/validate.request.middleware.js";
import { validateResponse } from "../middlewares/validate.response.middleware.js";
import { addToCartSchema } from "../validators/cart.validator.js"
import { 
    addToCart,
    removeItem,
    updateQuantity
} from "../controllers/cart.controller.js";

const router = Router();

router.use(getCurrentUser)
router.post("/add", validateRequest(addToCartSchema), addToCart);
router.delete("/item/remove", validateRequest(addToCartSchema), removeItem);
router.patch("/item/update", validateRequest(addToCartSchema), updateQuantity);

export default router;