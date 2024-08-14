import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useGetPasswords = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { encryptionKey } = useAuthContext();
    const [passwords, setPasswords] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (encryptionKey) { // Only fetch passwords if encryptionKey is available
            const fetchPasswords = async () => {
                setIsLoading(true);

                try {
                    const response = await fetch('/api/data/passwords');
                    if (!response.ok) {
                        throw new Error('Failed to fetch passwords');
                    }

                    const data = await response.json();
                    setPasswords(data);
                    toast.success('Passwords fetched successfully');
                    setSuccess(true);

                } catch (error) {
                    toast.error(error.message);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchPasswords();
        }
    }, [encryptionKey]);

    return { passwords, isLoading, success };
};

export default useGetPasswords;
