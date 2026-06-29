import mongoose from "mongoose";
import z from "zod";

export const addToCartSchema = z.object({
    body: z.strictObject({
        userId: z.string().refine(
            (val) => mongoose.Types.ObjectId(val),
            {
                message: "Invalid User ID Format"
            }
        ),
        productId: z.string().refine(
            (val) => mongoose.Types.ObjectId(val),
            {
                message: "Invalid Product ID Format"
            }
        )
    })
});