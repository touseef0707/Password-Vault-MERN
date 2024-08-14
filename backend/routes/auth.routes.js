import express from 'express'
import {
	login,
	logout,
	signup,
	verifyEmail,
	verifyEncryptionKey,
	setEncryptionKey,
	forgotPassword,
	resetPassword,
	checkAuth,
} from "../controllers/auth.controller.js";
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router()

router.get("/check-auth", protectRoute, checkAuth);

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)

router.post("/verify-email", verifyEmail);

router.post("/set-encryption-key", protectRoute, setEncryptionKey);
router.post("/verify-encryption-key", protectRoute, verifyEncryptionKey);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
