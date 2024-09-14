import React, { useState } from 'react';
import Modal from 'react-modal';
import { EyeIcon, EyeSlashIcon, ClipboardIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuthContext } from '../../context/AuthContext';
import { decryptPassword } from '../../utils/decrypt';
import useUpdatePassword from '../../hooks/useUpdatePassword';
import GeneralModal from '../../components/modal/GeneralModal'; // Import GeneralModal
import useDeletePassword from '../../hooks/useDeletePassword';
import { capitalizeFirstLetter } from '../../utils/capitalize';

Modal.setAppElement('#root');

const PasswordModal = ({ password, onClose }) => {
  const { deletePassword } = useDeletePassword(password._id);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const { encryptionKey } = useAuthContext();
  const { updatePassword, isLoading } = useUpdatePassword(password._id);
  const [formData, setFormData] = useState({
    website: password.website,
    username: password.username,
    password: decryptPassword(encryptionKey, password.password),
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updatePassword(formData);
    setIsEditing(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formData.password).then(() => {
      alert('Password copied to clipboard!');
    });
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (password._id) {
      // Add your delete logic here
      console.log(`Deleting password with ID: ${password._id}`);
      await deletePassword(password._id);
      closeDeleteModal();
      onClose(); // Close the password modal after deleting
    }
  };

  return (
    <>
      <Modal
        isOpen={true}
        onRequestClose={onClose}
        contentLabel="Password Modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          
          <div className="mb-4 flex items-center gap-2">
            {/* Logo and Website Name */}
            <img
              src={`https://cdn.brandfetch.io/${password.website}.com/icon/`} 
              alt={`${password.website} Logo`} 
              className="w-8 h-8 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/earth-svgrepo-com.svg"; // Fallback image
              }}
            />
            <h2 className="text-2xl text-white font-bold">{capitalizeFirstLetter(formData.website)}</h2>
          </div>
          
          {/* Username Field */}
          <div className="flex flex-col gap-1 mt-2">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border ${isEditing ? 'bg-transparent' : 'bg-gray-700'
                } border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none`}
            />
          </div>

          {/* Password Field */}
          <div className="relative flex items-center mt-2">
            {/* Input Field */}
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 pr-14 border ${isEditing ? 'bg-transparent' : 'bg-gray-700'
                } border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none`}
            />
            {/* Eye Icon to toggle visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-10 text-cyan-500"
            >
              {isPasswordVisible ? (
                <EyeSlashIcon className="h-6 w-6" />
              ) : (
                <EyeIcon className="h-6 w-6" />
              )}
            </button>
            {/* Clipboard Icon inside input field */}
            <button
              onClick={copyToClipboard}
              className="absolute right-2 text-cyan-500"
            >
              <ClipboardIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Edit/Save/Delete Buttons */}
          <div className="flex gap-4 mt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-cyan-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-cyan-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={openDeleteModal}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>

      {/* GeneralModal for deletion confirmation */}
      <GeneralModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this password?"
        onConfirm={confirmDelete}
        zIndex={30} // Ensure it's above the PasswordModal
      />
    </>
  );
};

export default PasswordModal;
