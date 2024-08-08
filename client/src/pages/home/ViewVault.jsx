import React, { useState } from 'react';
import Password from './Password';
import { usePasswordContext } from '../../context/PasswordContext';
import formatDate from '../../utils/formatTime';
import { decryptPassword } from '../../utils/decryption';
import GeneralModal from '../../components/modal/GeneralModal';
import useDeletePassword from '../../hooks/useDeletePassword';
import { encryptPassword } from '../../utils/encryption';

const ViewVault = () => {
    const { passwords, isLoading } = usePasswordContext();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [passwordToDelete, setPasswordToDelete] = useState(null);

    const { deletePassword } = useDeletePassword();

    const handleUpdate = (id) => {
        console.log(`Update password with ID: ${id}`);
        // Implement password update logic here
    };

    const openModal = (id) => {
        setPasswordToDelete(id);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setPasswordToDelete(null);
    };

    const confirmDelete = () => {
        if (passwordToDelete) {
            deletePassword(passwordToDelete);
            closeModal(); // Close the modal after confirming deletion
        }
    };

    const handleDelete = (id) => {
        openModal(id);
    };

    const decrypt = (encryptedPassword) => {
        const encryptionKey = localStorage.getItem('encryption-key');
        return decryptPassword(encryptionKey, encryptedPassword);
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <h2 className="text-xl text-gray-400">Loading...</h2>
            </div>
        );
    }

    if (passwords.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <h2 className="text-xl text-gray-400">Add passwords to view here</h2>
            </div>
        );
    }

    return (
        <div className="pl-6">
            <div className="max-h-72 overflow-auto scrollbar-custom pb-10">
                {passwords.map((pwd) => (
                    <Password
                        key={pwd._id}
                        id={pwd._id}
                        website={pwd.website}
                        username={pwd.username}
                        password={decrypt(pwd.password)}
                        dateAdded={formatDate(pwd.updatedAt)}
                        onUpdate={() => handleUpdate(pwd._id)}
                        onDelete={() => handleDelete(pwd._id)}
                    />
                ))}
            </div>

            {/* Modal for confirming deletion */}
            <GeneralModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                title="Confirm Deletion"
                message="Are you sure you want to delete this password?"
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default ViewVault;
