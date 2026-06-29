import { CartModel } from "../models/cart.model.js";
import { ProductModel } from "../models/product.model.js";
import { asyncHandler } from "../utils/async.handler.js";

export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id;

    const product = await ProductModel.findById(productId);
    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    if (product.stock < quantity) {
        const error = new Error(`Only ${product.stock} units available`);
        error.statusCode = 400;
        throw error;
    }

    let cart = await CartModel.findOneAndUpdate(
        { userId, "items.productId": productId },
        { $inc: { "items.$.quantity": quantity } },
        { new: true }
    );

    if (!cart) {
        cart = await CartModel.findOneAndUpdate(
            { userId },
            { $push: { items: { productId, quantity } } },
            { upsert: true, new: true }
        );
    }

    res.status(200).json({
        message: "Item added to cart",
        cart
    });
});

export const removeItem = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    const cart = await CartModel.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId } } },
        { new: true }
    );

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found"
        });
    }

    if (cart.items.length === 0) {
        await CartModel.deleteOne({ userId });
        return res.status(200).json({
            message: "Cart is now empty and removed",
            cart: null
        });
    }

    return res.status(200).json({
        message: "Item removed from cart",
        cart
    });
});

export const updateQuantity = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (quantity <= 0) {
        const error = new Error("Quantity must be a positive number");
        error.statusCode = 400;
        throw error;
    }

    const product = await ProductModel.findById(productId);
    if (product && product.stock < quantity) {
        const error = new Error(`Insufficient stock. Only ${product.stock} available`);
        error.statusCode = 400;
        throw error;
    }

    const cart = await CartModel.findOneAndUpdate(
        { userId, "items.productId": productId },
        { $set: { "items.$.quantity": quantity } },
        { new: true }
    );

    if (!cart) {
        return res.status(404).json({
            message: "Cart or Item not found"
        });
    }

    return res.status(200).json({
        message: "Quantity updated",
        cart
    });
});

export const getCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const cart = await CartModel.findOne({ userId })
        .populate("items.productId", "name price imageURL category");

    if (!cart) {
        return res.status(404).json({
            message: "Cart is empty"
        });
    }

    return res.status(200).json({
        message: "Cart retrieved successfully",
        cart
    });
});
