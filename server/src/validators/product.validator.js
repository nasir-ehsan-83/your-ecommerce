import z from "zod";

export const createProductSchema = z.object({
    body: z.strictObject({
        name: z.string(),
        description: z.string().partial(),
        price: z.number(),
        category: z.string(),
        imageURL: z.string(),
        stock: z.number().partial()
    })
});