import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hasher.js";
import generateTokenAndSetCookie from "../utils/gentoken.js";

import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendVerificationEmail,
	sendWelcomeEmail,
} from "../mail/emails.js";

// AUTH Controller: SIGNUP
export const signup = async (req, res) => {
	const { name, email, password, confirmPassword } = req.body;

	try {
		if (!email || !password || !name || !confirmPassword) {
			throw new Error("All fields are required");
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: 'Password does not match' });
		}
		if (password.length < 8) {
			return res.status(400).json({ error: 'Password must be at least 8 characters' });
		}


		// CHECK IF USER ALREADY EXISTS
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ error: 'User already exists' });
		}

		// HASH PASSWORD
		const hashedPassword = await hashPassword(password);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		// CREATE NEW USER
		const newUser = new User({
			name: name,
			email: email,
			password: hashedPassword,
			encryptionKey: '',
			verificationToken: verificationToken,
			verificationTokenExpiresAt: Date.now() + 60 * 60 * 1000,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);

			await newUser.save();

			await sendVerificationEmail(newUser.email, verificationToken);

			res.status(201).json({
				user: {
					...newUser._doc,
					password: undefined,
				},
				message: 'User registered successfully'
			});
		} else {
			res.status(400).json({ error: 'Invalid User Data' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Server: Signup API Error' });
	}
}

export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		await sendWelcomeEmail(user.email, user.name);

		res.status(200).json({
			success: true,
			message: "Email Verification Request Sent",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export const setEncryptionKey = async (req, res) => {
	const { encryptionKey } = req.body;
	const encryptionKeyHash = await hashPassword(encryptionKey);

	try {
		// Find the user by their ID
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (user.isFirstLogin) {
			user.encryptionKey = encryptionKeyHash;
			user.isFirstLogin = false;
		}

		// Save the updated user document
		await user.save();

		// Send success response
		res.status(200).json({ message: 'Encryption key updated successfully', user: user });
	} catch (error) {
		// Handle errors
		console.error('Error updating encryption key:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

export const verifyEncryptionKey = async (req, res) => {
	try {
		// Find the user by their ID
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (!req.body.encryptionKey) {
			return res.status(400).json({ message: 'Encryption key is required', success: false });
		}

		const isEncryptionKeyValid = await comparePassword(req.body.encryptionKey, user.encryptionKey);

		if (!isEncryptionKeyValid) {
			return res.status(400).json({ message: 'Invalid encryption key', success: false });
		}

		res.status(200).json({ message: 'Encryption key verified successfully', user: user, success: true });

	} catch (error) {
		console.error('Error fetching encryption key:', error);
		res.status(500).json({ message: 'Server error', success: false });
	}
}


// AUTH Controller: LOGIN
export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await comparePassword(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(user._id, res);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};


// AUTH Controller: LOGOUT
export const logout = (req, res) => {
	try {
		res.cookie('jwt', '', { maxAge: 0 });
		res.status(200).json({ message: 'User signed out successfully' });
	} catch (error) {
		console.log("Error in Logout controller: ", error.message);
		res.status(500).json({ error: 'Server: Logout API Error' });
	}
}


export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
