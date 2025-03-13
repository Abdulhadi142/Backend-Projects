import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query"],
});
async function connectDB() {
    try {
      await prisma.$connect();
      console.log("Connected to PostgreSQL with Prisma");
    } catch (error) {
      console.error(" Prisma Connection Error:", error);
      process.exit(1); // Server ko exit kara do agar DB connect na ho
    }
  }
  // Database connect karao
  connectDB();

export default prisma;
