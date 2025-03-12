import { Router } from "express";
import {createPost, deletepost, getAllpost, getbyid, Updatepost} from "../controllers/postController.js";
import { authenticate } from "../middlewares/auth.js";


const router = Router();

// router.post("/",createPost)
router.post('/', createPost);
router.get('/', getAllpost);
router.get('/:id', getbyid);
router.delete('/:id', deletepost);
router.put('/:id', Updatepost);

export default router;
