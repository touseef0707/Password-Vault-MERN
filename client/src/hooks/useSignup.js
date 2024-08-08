import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';
import delay from '../utils/delay.js';

const useSignup = () => {

    const [loading, setLoading] = useState(false);      // Loading state
    const { setAuthUser } = useAuthContext();       // get setAuthUser state method from useAuthContext
    const HOST = 'http://localhost:8000'      // Get API URL from .env file
    const signup = async (data) => {

        // Step 1: Handle Input Errors
        const errors = handleInputErrors(data);
        if (Object.keys(errors).length > 0) {
            // Display each error using toast
            Object.values(errors).forEach((error) => {
                toast.error(error);
            });
            return;  // Stop the function from continuing if there are errors
        }

        // Hitting API with try catch block
        try {
            setLoading(true);

            // Hit API post
            const res = await fetch(`${HOST}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            // Get result
            const result = await res.json();

            // if result is OK
            if (res.ok) {

                toast.success(result.message);
                await delay(2000);

                // Save user data in local storage
                localStorage.setItem('auth-user', JSON.stringify(result));

                // Set user data in context
                setAuthUser(result);

            }
            else {
                toast.error(result.message);
                console.log(result.error);
            }


        } catch (error) {
            toast.error(error.message);

        } finally {
            setLoading(false);

        }
    }
    return { signup, loading };
}

// Helper function to handle input errors if any
function handleInputErrors(data) {

    // Destructure the data
    const { email, password, confirmPassword } = data;
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

    // Validate confirmPassword
    if (!confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
}

export default useSignup;