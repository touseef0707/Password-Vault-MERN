import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import OptionsMenu from './OptionsMenu';
import UpdatePassword from './UpdatePassword';

const Password = ({ id, website, username, password, dateAdded, onDelete }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    });
  };

  const handleUpdate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="py-3 w-full flex items-center gap-4 text-white overflow-visible relative">
      {/* Website Name */}
      <p className="w-52 text-sm text-cyan-aqua-500 overflow-x-auto hide-scrollbar whitespace-nowrap">{website}</p>

      {/* Username */}
      <p className="w-44 text-sm overflow-x-auto hide-scrollbar whitespace-nowrap">{username}</p>

      {/* Password with Toggle View Option */}
      <div className="w-44 flex items-center gap-2">
        <p className="w-full text-sm overflow-x-auto hide-scrollbar whitespace-nowrap text-white bg-transparent border-none text-center placeholder-slate-300">
          {isPasswordVisible ? password : '########'}
        </p>
        <button onClick={togglePasswordVisibility} className="text-cyan-400">
          {isPasswordVisible ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
        </button>
      </div>
      <p className="w-20 text-sm text-gray-400">{dateAdded}</p>

      {/* Options menu to copy, update or delete a saved password */}
      <div className="relative">
        <OptionsMenu
          copyToClipboard={copyToClipboard}
          onUpdate={handleUpdate}
          onDelete={onDelete}
        />
      </div>

      {/* UpdatePassword modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center rounded-lg z-10 bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <UpdatePassword
              id={id}
              currentPassword={password}
              website={website}
              username={username}
              onClose={handleCloseModal} // Pass handleCloseModal to UpdatePassword
            />
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
            >
              <XMarkIcon className="h-6 w-6 text-cyan-aqua-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Password;
