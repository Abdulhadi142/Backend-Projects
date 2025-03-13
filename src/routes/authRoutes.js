import { Router } from "express";

import {authenticate,isAdmin} from "../middlewares/auth.js";
import { login, signup } from "../controllers/authController.js";
const router = Router();

router.post("/login", login);           
router.post("/signup",  signup);    // isme middleware nhi lagegea kyu ki yha sirf data store hoga agar isme token nhi denge 
                                    //to login m bhi middleware nhi lagega kyu ki jb token mila hi nhi to middleware token kese check krega
export default router;
