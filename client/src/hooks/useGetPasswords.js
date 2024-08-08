import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useGetPasswords = () => {
    const [passwords, setPasswords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
                    
                } catch (err) {
                    toast.error(err.message);
                } finally {
                    setIsLoading(false);
                }
            }

        fetchPasswords();
    }, []);

    return { passwords, isLoading };
};

export default useGetPasswords;
