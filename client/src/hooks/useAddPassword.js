import { useState } from 'react';
import { usePasswordContext } from '../context/PasswordContext';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { encryptPassword } from '../utils/encrypt';

const useAddPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { setPasswords } = usePasswordContext();
    const {encryptionKey} = useAuthContext();

    const addPassword = async (formData) => {
        setIsLoading(true);

        if (!encryptionKey) {
            toast.error('Please verify your encryption key');
            setIsLoading(false);
            return;
        }
        const encryptedData = {
            ...formData,
            password: encryptPassword(encryptionKey, formData.password),
        };
        try {
            const response = await fetch('/api/data/passwords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify(encryptedData),
            });

            if (!response.ok) {
                throw new Error('Failed to add password');
            }

            const data = await response.json();
            toast.success(data.message);
            setPasswords((prevPasswords) => [...prevPasswords, data.password]);
            setSuccess(true);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { addPassword, isLoading, success };
};

export default useAddPassword;
