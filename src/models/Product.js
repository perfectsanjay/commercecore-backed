import mongoose from "mongoose";

// Define the product schema

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        description:{
            type: String,
            required: [true, "Product description is required"]
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "price must be positive number"]
        },
        category: {
            type: String,
            required: [true,"category is required"]
        },
        stock: {
            type:Number,
            default:0,
            min: [0, "stock cannot be negative"],
        },
        image: {
            type:String
        },
    },
    { timestamps: true}
)

const Product  = mongoose.model("Product",productSchema)

export default Product;