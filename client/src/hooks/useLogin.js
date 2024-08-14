import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';
import delay from '../utils/delay.js';

const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (data) => {
        setLoading(true);
        const success = handleInputErrors(data);
        if (!success) return;

        try {

            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })

            const result = await res.json();

            if (res.ok) {
                toast.success(result.message);
                await delay(2000);
                localStorage.setItem('auth-user', JSON.stringify(result.user));
                setAuthUser(result.user);
            } else {
                toast.error(result.message);
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

    const { email, password } = data;
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

    return errors;
}

export default useLogin;
