import jwt from 'jsonwebtoken';

const jwtAuthMiddleware = (req, res, next) =>{

    //Extract the token from the header
    const token = req.header.Authorization.split('')[1];
    if(!token){
        return res.status(401).json({error:"unauthorized access"})
    }
    try {
        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // attach user information to the request object
        req.object = decoded;
        next();

    } catch (error) {
        return res.status(401).json({error:"invalid token"})
    }
}

// function to generate JWT token
const generateToken = (userData) =>{
        // Generate a new JWT token with the user data 
    return jwt.sign(userData, process.env.JWT_SECRET)
}


export default {jwtAuthMiddleware, generateToken };