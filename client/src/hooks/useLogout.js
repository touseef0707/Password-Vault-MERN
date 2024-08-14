import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const Logout = async () => {
        try {
            const result = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await result.json()

            if (data.error) {
                toast.error(data.error)
            }

            if (result.ok) {
                toast.success(data.message)
                localStorage.removeItem("auth-user")
                setAuthUser(null)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return { Logout, loading };
}

export default useLogout