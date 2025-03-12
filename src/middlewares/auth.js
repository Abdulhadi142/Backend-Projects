import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    // Ensure the Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Extract the token
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Invalid token format" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); 
    req.user = decoded;
    // Attach decoded token data (user info) to request object

    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

  

  export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") { // Fix: Check if `req.user` exists
      return res.status(403).json({ error: "Admin access required!" });
    }
    next();
  };
  



// import jwt from "jsonwebtoken";

// const authenticate = (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         // Check if Authorization header exists and starts with 'Bearer '
//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({ error: "Unauthorized: No token provided" });
//         }

//         // Extract token (removes 'Bearer ' prefix)
//         const token = authHeader.split(" ")[1].trim();

//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Attach user ID to request object
//         req.userId = decoded.userId;

//         next(); // Proceed to next middleware
//     } catch (error) {
//         res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
//     }
// };

// export default authenticate;
// middlewares/auth.js