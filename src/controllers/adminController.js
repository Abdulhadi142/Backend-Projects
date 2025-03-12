// controllers/adminController.js
import prisma from "../config/db.js"
import bcrypt from 'bcrypt';

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: "User deleted" , data : null });
  } catch (error) {
    res.status(500).json({ error: "User not found" });
  }
};

async function createAdmin() {
  try {
    // chech admin exsist krta h ya nhi 
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@example.com" },
    });

    if (existingAdmin) {
      console.log(" Admin already exists:", existingAdmin);
      return; // agar exist karta h to create nhi krna
    }

    // 🔹 अगर admin exist नहीं करता, तो नया create करो
    const admin = await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
      },
    });

    console.log("🎉 Admin created:", admin);
  } catch (error) {
    console.error("Error in creating admin:", error);
  }
}

createAdmin();





// import jwt from "jsonwebtoken";

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDE3NTgxMzMsImV4cCI6MTc0MTc2MTczM30.PzL63lEdPIG-WJH05xwQFN4uDoSAhmbbfUNL6rgOl9A"; // Admin ka token yahan daalo

// const decoded = jwt.verify(token, process.env.JWT_SECRET);
// console.log(decoded);
