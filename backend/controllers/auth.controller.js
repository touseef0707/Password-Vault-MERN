import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hasher.js";
import genererateTokenAndSetCookie from "../utils/gentoken.js";

// AUTH Controller: SIGNUP
export const signup = async (req, res) => {
    try {
        const { email, password, confirmPassword, encryptionKey } = req.body;

        // VALIDATE USER INPUT (Passwords match)
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Password does not match' });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        if (!encryptionKey) {
            return res.status(400).json({ error: 'Encryption Key is required' });
        }

        // CHECK IF USER ALREADY EXISTS
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // HASH PASSWORD
        const hashedPassword = await hashPassword(password);
        const hashedEncryptionKey = await hashPassword(encryptionKey);

        // CREATE NEW USER
        const newUser = new User({
            email: email,
            password: hashedPassword,
            encryptionKey: hashedEncryptionKey
        });

        if (newUser) {
            genererateTokenAndSetCookie(newUser._id, res); // Generate token and set cookie
            await newUser.save(); // Save the newUser to the database

            res.status(201).json({ // Send the response
                _id: newUser._id,
                email: newUser.email,
                password: newUser.password,
                encryptionKey: newUser.encryptionKey,
                message: 'User registered successfully'
            });
        } else {
            res.status(400).json({ error: 'Invalid User Data' });
        }
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({ error: 'Server: Signup API Error' });
    }
}

// AUTH Controller: LOGIN
export const login = async (req, res) => {
    try {
        const { email, password, encryptionKey } = req.body; // Get email and password from request body

        const user = await User.findOne({ email }); // Find the user by email

        // Check if user exists and password is correct
        const isPasswordCorrect = await comparePassword(password, user?.password || '');
        const isEncryptionKeyCorrect = await comparePassword(encryptionKey, user?.encryptionKey || '');
        if (!user || !isPasswordCorrect || !isEncryptionKeyCorrect) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate token and set cookie
        genererateTokenAndSetCookie(user._id, res);

        // Send the response
        res.status(200).json({
            _id: user._id,
            email: user.email,
            password: user.password,
            encryptionKey: user.encryptionKey,
            message: 'User logged in successfully'
        });
    } catch (error) {
        console.log("Error in Login controller: ", error.message);
        res.status(500).json({ error: 'Server: Login API Error' });
    }
}

// AUTH Controller: LOGOUT
export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 }); // Clear the cookie
        res.status(200).json({ message: 'User signed out successfully' });
    } catch (error) {
        console.log("Error in Logout controller: ", error.message);
        res.status(500).json({ error: 'Server: Logout API Error' });
    }
}
