import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

export const signup = async (req, res) => {
  try {
    // console.log("Signup Request Received:", req.body);
    const { name, email, password } = req.body;

    //password hash krrhe h 
    const hashedpassword = await bcrypt.hash(password, 10);

    //check user exist or not
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exist" });
    }

    //create user
    const user = await prisma.user.create({
      data: {
        name,
        email:email,
        password: hashedpassword,
        role: "user",
      },
    });
    return res
      .status(200)
      .json({ message: "User signup Succesfully", data: user });
  } catch (error) {
    console.log("error :", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export const login = async (req, res) => {
  const { email, password } = req.body;

  //check user exist or not means user data m store to h na tabhi to login kr paega yani yaha pr email chech ho rhi h
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(400).json({ message: "Invlid email/password" });
  }

  //compare password and user password
  const ispasswordvalid = await bcrypt.compare(password, user.password);
  if (!ispasswordvalid) {
    return res.status(400).json({ message: "Invlid eamil/password" });  //yeha error invalid password ka hota pr secqurity ke liye dono ka error diya
  }

  //token provide
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET,{ expiresIn: "1h" });  // Include role
  

  console.log("error :");
  return res.json({message:"Successfully login User", token });
};


// const user = await prisma.user.findUnique({
//   where: { email: "admin@example.com" },
// });
// console.log("User Data:", user);
