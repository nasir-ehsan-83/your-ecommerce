import z from "zod";
import { objectIdSchema } from "./user.validator.js";

export const addToCartSchema = z.object({
    body: z.strictObject({
        productId: objectIdSchema,
        quantity: z.number().optional()
    })
});

export const cartResponse = z.strictObject({
    message: z.string,
    cart: z.object({
        _id: objectIdSchema,
        userId: objectIdSchema,
        items: z.array(
            z.object({
            _id: objectIdSchema,
            prodectId: z.any(),
            quantity: z.number(),
        })
        )
    })
}).strict().transform((data) => ({
    message: data.message,
    cart: {
        id: data.cart._id.toString(),
        userId: data.cart.userId.toString(),
        items: data.cart.items.map((item) => ({
            id: item._id.toString(),
            productId: item.prodectId.toString(),
            quantity: item.quantity
        } ))
    }
}));