import Data from '../models/data.model.js'; // Import the Data model

// Create a new password entry
export const addPassword = async (req, res) => {
    try {
        const { website, username, password } = req.body;
        console.log("user", req.user);
        console.log("body", req.body);
        // Create new password entry linked to the logged-in user
        const newPassword = new Data({
            user: req.user._id, // Assuming req.user contains the authenticated user's info
            website: website,
            username: username,
            password: password,
        });

        
        await newPassword.save();
        console.log("new", newPassword);

        res.status(201).json({ message: 'Password saved successfully', password: newPassword });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all passwords for the logged-in user
export const getPasswords = async (req, res) => {
    try {
        const passwords = await Data.find({ user: req.user._id });
        res.status(200).json(passwords);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve passwords', error });
    }
};

// Get a single password by ID
export const getPasswordById = async (req, res) => {
    try {
        const password = await Data.findById(req.params.id);

        if (!password || password.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Password not found' });
        }

        res.status(200).json(password);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve password', error });
    }
};

// Update a password entry
export const updatePassword = async (req, res) => {
    try {
        const { website, username, password } = req.body;

        // Validate that the ID is provided
        if (!req.params.id) {
            return res.status(400).json({ message: 'ID parameter is missing' });
        }

        // Validate the request body (optional but recommended)
        if (!website && !username && !password) {
            return res.status(400).json({ message: 'No data provided to update' });
        }

        // Fetch the existing password entry by ID
        const existingPassword = await Data.findById(req.params.id);

        // Check if the password entry exists
        if (!existingPassword) {
            return res.status(404).json({ message: 'Password entry not found' });
        }

        // Check if the password entry belongs to the authenticated user
        if (existingPassword.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Update fields only if new values are provided
        if (website) existingPassword.website = website;
        if (username) existingPassword.username = username;
        if (password) existingPassword.password = password;

        // Save the updated document
        await existingPassword.save();

        res.status(200).json({ message: 'Password updated successfully', password: existingPassword });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Update password error:', error);

        res.status(500).json({ message: 'Failed to update password', error: error.message });
    }
};

// Delete a password entry
export const deletePassword = async (req, res) => {
    try {
        console.log("Request to delete password received:", req.params.id);

        const password = await Data.findById(req.params.id);

        if (!password) {
            // console.log("Password not found");
            return res.status(404).json({ message: 'Password not found' });
        }

        if (password.user.toString() !== req.user._id.toString()) {
            // console.log("User is not authorized to delete this password");
            return res.status(403).json({ message: 'User not authorized' });
        }

        // Use deleteOne() instead of remove()
        await Data.deleteOne({ _id: req.params.id });

        // console.log("Password deleted successfully");
        res.status(200).json({ message: 'Password deleted successfully' });
    } catch (error) {
        // console.error("Error deleting password:", error);
        res.status(500).json({ message: 'Failed to delete password', error: error.message });
    }
};
