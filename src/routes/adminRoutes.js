// routes/adminRoutes.js
import express from 'express';
import { getAllUsers, deleteUser } from '../controllers/adminController.js';
import { authenticate, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Only admins can access these
router.get('/users',authenticate, isAdmin, getAllUsers);
router.delete('/users/:id',authenticate, isAdmin, deleteUser);

export default router;