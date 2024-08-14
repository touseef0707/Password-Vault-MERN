import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useUpdatePassword from '../../hooks/useUpdatePassword'; 

const UpdatePassword = ({id, currentPassword, website, username, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    website: website || '',
    username: username || '',
    password: currentPassword || ''
  });
  const { updatePassword, isLoading } = useUpdatePassword(id);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updatePassword(formData);
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setFormData({
      website,
      username,
      password: currentPassword
    });

  }, [website, username, currentPassword]);

  

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl text-cyan-aqua-400 font-bold mb-4">Update Password</h2>
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
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
