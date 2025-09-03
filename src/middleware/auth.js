import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization

    // check is token is provided
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: "No token , authorization denied"})
    }

    // extract token
    const token = authHeader.split(" ")[1]
    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // attach user to request
        req.user = decoded
        next()

    }catch(err){
        res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default auth;