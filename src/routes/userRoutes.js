import { Router } from "express";
import {   deleteUser,  getallUser, getsingleUser, updateUser } from "../controllers/UserController.js";
import { authenticate, isAdmin } from "../middlewares/auth.js";

const router = Router()

// router.post("/",CreateUser) 
router.get("/",authenticate,getallUser) 
router.get("/:id",authenticate,getsingleUser) 
router.delete("/:id",authenticate,isAdmin,deleteUser) 
router.put("/:id",authenticate,isAdmin,updateUser) 


export default router;
