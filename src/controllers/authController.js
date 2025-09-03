import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"

// Generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN || "30d",
    })
}

// register a user
export const registerUser = async (req, res, next) => {
    try{
        const {name, email, password}  = req.body;

        // check if user is alredy exists
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"User is alredy exists"})
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt)

        // create user
        const user = await  User.create({
            name,
            email,
            password: hashPassword,
        })

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });

    }catch(err){
        next(err)
    }
}

export const loginUser = async (req, res, next) => {
    try{
        const {email, password} = req.body

        // Find User
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid credentials"})

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"})
           
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });


    }catch(err){
        next(err)
    }
}