// Importing necessary dependencies from React and other libraries
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';
import delay from '../utils/delay.js';

// Custom hook for handling login functionality
const useLogin = () => {

    // State to manage loading status
    const [loading, setLoading] = useState(false);

    // Using context to set authenticated user details
    const { setAuthUser } = useAuthContext();

    // Function to handle login logic
    const login = async (data) => {

        // Validate input before proceeding with login
        const success = handleInputErrors(data);
        if (!success) return;

        try {
            setLoading(true);

            // Making a POST request to login endpoint
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })

            // Parsing the JSON response
            const result = await res.json();

            if (res.ok) {
                // Display success message and update local storage and context with user data
                toast.success(result.message);
                await delay(2000);
                localStorage.setItem('auth-user', JSON.stringify(result));
                localStorage.setItem('encryption-key', data.encryptionKey);
                setAuthUser(result);
            }

            else {
                // Display error message in case of failure
                toast.error(result.error);
                console.log(result.error);
            }

        } catch (error) {
            toast.error(error.message);

        } finally {
            setLoading(false);

        }
    }
    return { login, loading };
}

// Function to validate user input
function handleInputErrors(data) {

    // Destructure the data
    const { email, password, encryptionKey } = data;
    const errors = {};

    // Validate email
    if (!email) {
        errors.email = 'Email is required';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errors.email = 'Invalid email format';
    }

    // Validate password
    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }

    // Validate Encryption Key

    if (!encryptionKey || encryptionKey === '') {
        errors.encryptionKey = 'Encryption Key is required';
    }
    

    return errors;
}

// Exporting the custom hook for use in other components
export default useLogin;