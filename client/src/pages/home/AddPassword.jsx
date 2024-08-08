import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useAddPassword from '../../hooks/useAddPassword'; // Import the custom hook
import { useAuthContext } from '../../context/AuthContext';
import { encryptPassword } from '../../utils/encryption';

const AddPassword = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    website: '',
    username: '',
    password: ''
  });

  const { addPassword, isLoading } = useAddPassword(); // Destructure the hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addPassword(formData); // Use the hook's function to add the password
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="pr-6">
      <h2 className="text-2xl text-cyan-aqua-500 font-bold mb-4">Add Password</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="text"
          id="website"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="w-fit px-4 py-2 border-b bg-transparent placeholder-slate-300 text-center text-white focus:outline-none"
        />

        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-fit px-4 py-2 border-b bg-transparent placeholder-slate-300 text-center text-white focus:outline-none"
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-fit px-4 py-2 border-b bg-transparent placeholder-slate-300 text-center text-white focus:outline-none"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-cyan-aqua-500"
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
          className="w-full bg-cyan-aqua-700 text-white py-2 rounded-lg"
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? 'Adding...' : 'Add Password'}
        </button>
      </form>
    </div>
  );
};

export default AddPassword;
