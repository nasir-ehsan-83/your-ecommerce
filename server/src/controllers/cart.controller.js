import { CartModel } from "../models/cart.model.js";
import { asyncHandler } from "../utils/async.handler.js";

export const addToCart = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;
    
    // check that does user have a Cart
    let cart = await CartModel.findOne({ 
        userId 
    });

    // if user does not have any Cart
    if (!cart) {
        cart = await CartModel.create({
            userId,
            items: [
                {
                    productId,
                    quantity: 1
                }
            ]
        });
    }
    
    const item = cart.items.find((i) => i.productId.toString() === productId);
    
    // if there is an item in Cart
    if (item) {
        item.quantity += 1;
    }
    // otherwise add item
    else {
        cart.items.push({
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

export const removeItem = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;
    
    // check that user has Cart or not
    const cart = await CartModel.findOne({
        userId
    });

    // if user does not have a Cart
    if (!cart) {
        return res.status(404).json({
            message: "Cart not found"
        });
    }

    // get item that has provided productId
    cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId
    );

    await cart.save();

    return res.status(200).json({
        message: "Item removed from Cart",
        cart
    });
});

export const updateQuantity = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // check that user has Cart or not
    const cart = await CartModel.findOne({
        userId
    });

    // if user does not have any cart
    if (!cart) {
        return res.status(404).json({
            message: "Cart does not exist"
        });
    }

    // if quantity has not been provided
    if (!quantity) {
        return res.status(400).json({
            message: "Quantity is required"
        });
    }

    // get item from cart
    const item = cart.items.find((i) => i.productId.toString() === productId);

    // if there is not any item by specific productId
    if (!item) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    // update specific item's quantity
    item.quantity = quantity;

    await cart.save();

    return res.status(200).json({
        message: "Item Quantity updated",
        cart
    });
});