import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "name is required"],
            trim:true,
        },
        email:{
            type: String,
            required: [true, "email is required"],
            unique:true,
            lowercase: true,
            match: [
                /^\S+@\S+\.\S+$/,
        "Please enter a valid email",
            ],

        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6,"Password is must at least 6 characters long"]
        },
        role: {
            type: String,
            enum: ["user","admin"],
            default: "user",
        }
    },
    {timestamps: true}
)

// create model

