import { useState } from 'react';
import { usePasswordContext } from '../context/PasswordContext';
import toast from 'react-hot-toast';

const useDeletePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { setPasswords } = usePasswordContext(); 

    const deletePassword = async (id) => {
        setIsLoading(true);

        try {
            const response = await fetch(`/api/data/passwords/delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete password');
            }

            const data = await response.json();
            toast.success(data.message);

            // Update the context's password list by removing the deleted password
            setPasswords((prevPasswords) =>
                prevPasswords.filter(password => password._id !== id)
            );

            setSuccess(true);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { deletePassword, isLoading, success };
};

export default useDeletePassword;
