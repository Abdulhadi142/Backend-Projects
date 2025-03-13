import {Router} from 'express';
import { createUser, deleteUser, getUser, getUserById, updateUser } from '../Controllers/userController.js';

const router = Router();

router.post("/createUser",createUser);
router.get("/getAllUsers",getUser);
router.get("/:id",getUserById);
router.post("/:id",updateUser);
router.delete("/:id",deleteUser);

export default router;