import express from 'express';
import "dotenv/config"
import Routes from './Routes/UserRoutes.js';
// import bcrypt from "bcryptjs";
// import { createUser } from './Controllers/userController.js';

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(Routes);

app.get("/",(req,res)=>{
    res.send("hello world");
})


// connect to the database


// const { PrismaClient } = require('@prisma/client');
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function checkDB() {
//   try {
//     await prisma.$connect();
//     console.log("✅ Connected to PostgreSQL via Prisma");
//   } catch (error) {
//     console.error("❌ Prisma Connection Error:", error);
//   }
// }
// checkDB();




const PORT = process.env.PORT || 5005;

app.listen(PORT,()=>console.log(`server is running on ${PORT}`))