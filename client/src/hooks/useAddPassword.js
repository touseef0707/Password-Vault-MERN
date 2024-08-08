import { useState } from 'react';
import toast from 'react-hot-toast';
import { usePasswordContext } from '../context/PasswordContext';
import { encryptPassword } from '../utils/encryption';

const useAddPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setPasswords } = usePasswordContext(); // Destructure setPasswords from context

    const addPassword = async (formData) => {
        setIsLoading(true);

        const encryptionKey = localStorage.getItem('encryption-key');
        console.log('encryptionKey', encryptionKey);
        const encryptedPassword = encryptPassword(encryptionKey, formData.password);
        const encryptedFormData = {
            ...formData,
            password: encryptedPassword,
        };

        try {
            const response = await fetch('/api/data/passwords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include credentials like cookies
                body: JSON.stringify(encryptedFormData),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            toast.success(data.message);

            // Update the context's password list with the new password
            setPasswords((prevPasswords) => [...prevPasswords, data.password]);

        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { addPassword, isLoading };
};

export default useAddPassword;
