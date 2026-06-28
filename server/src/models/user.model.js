import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true 
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        lowercase: true 
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refresh_token: {
        type: String,
        default: null 
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"] , 
        default: "USER"
    }
}, {
    timestamps: true
});


export const UserModel = mongoose.model("User", userSchema);