import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { usePasswordContext } from '../context/PasswordContext';
import { encryptPassword } from '../utils/encrypt';

const useUpdatePassword = (id) => {
    const [isLoading, setIsLoading] = useState(false);
    const { setPasswords } = usePasswordContext();
    const {encryptionKey} = useAuthContext();

    const updatePassword = async (formData) => {
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
            const response = await fetch(`/api/data/passwords/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(encryptedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update password');
            }

            const updatedPassword = await response.json(); 
            toast.success(updatedPassword.message);

            // Update the context's password list
            setPasswords((prevPasswords) => {
                return prevPasswords.map(password =>
                    password._id === id ? updatedPassword.password : password
                );
            });

        } catch (err) {
            toast.error(err.message);

        } finally {
            setIsLoading(false);
        }
    };

    return { updatePassword, isLoading };
};

export default useUpdatePassword;
