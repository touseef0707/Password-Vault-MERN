import { useState } from 'react';
import toast from 'react-hot-toast';
import { usePasswordContext } from '../context/PasswordContext';
import { encryptPassword } from '../utils/encryption';

const useUpdatePassword = (id) => {
    const [isLoading, setIsLoading] = useState(false);
    const { setPasswords, passwords } = usePasswordContext(); // Destructure passwords as well

    const updatePassword = async (formData) => {
        setIsLoading(true);

        const encryptionKey = localStorage.getItem('encryption-key');
        const encryptedPassword = encryptPassword(encryptionKey, formData.password);
        const encryptedFormData = {
            ...formData,
            password: encryptedPassword,
        };

        try {
            const response = await fetch(`/api/data/passwords/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(encryptedFormData),
            });

            if (!response.ok) {
                throw new Error('Failed to update password');
            }

            const updatedPassword = await response.json(); // Assume the server returns the updated password
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
