import { CartModel } from "../models/cart.model.js";
import { asyncHandler } from "../utils/async.handler.js";

export const addToCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;

    // check that does user have a Cart
    let cart = await CartModel.findOne({ 
        userId 
    });

    // if user does not have any Cart
    if (!cart) {
        cart = await CartModel.create({
            userId,
            item: [
                {
                    productId,
                    quantity: 1
                }
            ]
        });
    }
    // if user has a Cart 
    else {
        const item = cart.item.find(
            (i) => i.productId.toString() === productId
        );
    }

    // if there is an item in Cart
    if (item) {
        item.quantity += 1;
    }
    // otherwise add item
    else {
        cart.item.push({
            productId,
            quantity: 1
        });
    }

    // save changes
    await cart.save();

    res.status(200).json({
        message: "Item added to Cart",
        cart
    });
});