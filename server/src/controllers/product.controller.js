import ProductModel from "../models/product.model.js";
import { asyncHandler } from "../utils/async.handler.js";

export const createProduct = asyncHandler(async (req, res) => {
    // create new product
    const product = await ProductModel.create(req.body);

    return res.status(200).json({
        status: "successful",
        product: product
    });
});