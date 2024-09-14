import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'; // Import the close icon
import useAddPassword from '../../hooks/useAddPassword'; 

const AddPasswordModal = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    website: '',
    username: '',
    password: ''
  });

  const { addPassword, isLoading } = useAddPassword();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPassword(formData);
    setFormData({
      website: '',
      username: '',
      password: ''
    });
    onClose(); // Close the modal after successful addition
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="relative w-full max-w-md mx-4 bg-gray-800 p-6 rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl text-cyan-aqua-400 font-bold mb-4">Add Password</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              id="website"
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-transparent border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-transparent border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none"
            />
          </div>

          <div className="relative flex flex-col gap-1">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-transparent border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-aqua-500"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-cyan-aqua-700 hover:bg-cyan-aqua-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPasswordModal;
