import { useState } from 'react';
import toast from 'react-hot-toast';
import { usePasswordContext } from '../context/PasswordContext';

const useDeletePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setPasswords } = usePasswordContext(); // Destructure setPasswords from context

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

        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { deletePassword, isLoading };
};

export default useDeletePassword;
