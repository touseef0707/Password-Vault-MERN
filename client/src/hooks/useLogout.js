import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

// Custom hook for handling user logout
const useLogout = () => {
    // State to manage loading status
    const [loading, setLoading] = useState(false);

    // Accessing the setAuthUser function from the AuthContext
    const { setAuthUser } = useAuthContext();

    // Function to handle the logout process
    const Logout = async () => {
        try {
            // Making a POST request to the logout endpoint
            const result = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            // Parsing the JSON response
            const data = await result.json()
            // If there is an error in the response, show it as a toast notification
            if (data.error) {
                toast.error(data.error)
            }

            // If the request was successful
            if (result.ok) {
                // Show success message
                toast.success("User logged out successfully")
                // Remove the user from local storage
                localStorage.removeItem("auth-user")
                // Update the auth user context to null
                setAuthUser(null)
            } else {
                // If the request was not successful, show the error
                toast.error(result.error)
            }

        } catch (error) {
            // If there is an error in the logout process, show it as a toast notification
            toast.error(error.message)
        }
    }

    // Returning the Logout function and the loading state
    return { Logout, loading };
}

export default useLogout