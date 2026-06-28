import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

export const ProductModel = mongoose.model("Product", productSchema);