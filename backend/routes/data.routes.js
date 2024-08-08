import express from 'express';
import { addPassword, getPasswords, getPasswordById, updatePassword, deletePassword } from '../controllers/data.controller.js';
import protectRoute from '../middlewares/protectRoute.js';
const router = express.Router();

// Add Password
router.post('/passwords', protectRoute, addPassword);

// View Passwords
router.get('/passwords', protectRoute, getPasswords);

// Get Password by ID
router.get('/passwords/:id', protectRoute, getPasswordById);

// Update Password
router.put('/passwords/update/:id', protectRoute, updatePassword);

// Delete Password
router.delete('/passwords/delete/:id', protectRoute, deletePassword);



export default router;

