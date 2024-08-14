import React, { useState } from 'react';
import { usePasswordContext } from '../../context/PasswordContext';
import { useAuthContext } from '../../context/AuthContext';
import { decryptPassword } from '../../utils/decrypt';
import formatDate from '../../utils/formatTime';
import GeneralModal from '../../components/modal/GeneralModal';
import useDeletePassword from '../../hooks/useDeletePassword';
import Password from './Password';

const ViewVault = () => {
    const { passwords, isLoading } = usePasswordContext();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [passwordToDelete, setPasswordToDelete] = useState(null);
    const { deletePassword } = useDeletePassword();
    const { encryptionKey } = useAuthContext();

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
            closeModal();
        }
    };

    const handleDelete = (id) => {
        openModal(id);
    };


    if (isLoading) {
        return (
            <div className="h-64 w-full flex flex-col justify-center items-center">
                <h2 className="text-xl text-gray-400">Loading...</h2>
            </div>
        );
    }

    if (passwords.length === 0) {
        return (
            <div className="h-64 w-full flex flex-col justify-center items-center">
                <h2 className="text-xl text-gray-400">Add passwords to view here</h2>
            </div>
        );
    }

    return (
        <div className="pl-6 w-full h-64">
            <div className="h-full overflow-auto scrollbar-custom">
                {passwords.map((pwd) => (
                    <Password
                        key={pwd._id}
                        id={pwd._id}
                        website={pwd.website}
                        username={pwd.username}
                        password={decryptPassword(encryptionKey, pwd.password)}
                        dateAdded={formatDate(pwd.updatedAt)}
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
