import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useLogin();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);

  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className='h-full w-full p-6 flex-col justify-center items-center'>
      <h2 className='text-2xl text-cyan-aqua-400 font-bold mb-4'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3 relative'>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='example@gmail.com'
            className='w-full px-4 py-2 text-lg bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-aqua-400'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mb-3 relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            placeholder='password'
            className='w-full px-4 py-2 text-lg bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-aqua-400'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute inset-y-0 right-3 flex items-center text-cyan-aqua-700'
          >
            {showPassword ? (
              <EyeSlashIcon className='h-5 w-5' />
            ) : (
              <EyeIcon className='h-5 w-5' />
            )}
          </button>
        </div>

        <button
          type='submit'
          className={`w-full py-2 bg-cyan-aqua-700 hover:bg-cyan-aqua-600 text-white rounded-lg ${loading || !isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading || !isFormValid}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
