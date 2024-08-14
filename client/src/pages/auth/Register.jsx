import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useSignup from '../../hooks/useSignup';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { signup, loading } = useSignup();
  const navigate = useNavigate();

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

    // Create the name variable by combining first and last name
    const name = `${formData.firstName} ${formData.lastName}`;
    const data = {
      name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      // Send formData and name to the server
      const response = await signup(data);

      if (response.success) {
        navigate('/verify-otp', { state: { email: formData.email } });
      } else {
        console.error('Signup failed:', response.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Signup request failed:', error);
    }
  };

  // Check if all fields are filled to enable the signup button
  useEffect(() => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    if (firstName && lastName && email && password && confirmPassword) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formData]);

  return (
    <div className='h-full w-full px-6 flex-col justify-center items-center'>
      <h2 className=' mb-3 text-2xl text-cyan-aqua-400 font-bold'>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3 flex flex-row gap-3'>
          <input
            type='text'
            id='firstName'
            name='firstName'
            placeholder='First Name'
            className='w-full px-4 py-2 text-lg bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-aqua-400'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            id='lastName'
            name='lastName'
            placeholder='Last Name'
            className='w-full px-4 py-2 text-lg bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-aqua-400'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mb-3'>
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
            placeholder='Password'
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

        <div className='mb-3 relative'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id='confirmPassword'
            name='confirmPassword'
            placeholder='Confirm Password'
            className='w-full px-4 py-2 text-lg bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-aqua-400'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type='button'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className='absolute inset-y-0 right-3 flex items-center text-cyan-aqua-700'
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className='h-5 w-5' />
            ) : (
              <EyeIcon className='h-5 w-5' />
            )}
          </button>
        </div>

        <button
          type='submit'
          className={`w-full bg-cyan-aqua-700 hover:bg-cyan-aqua-600 text-white py-2 rounded-lg ${loading || isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading || isButtonDisabled}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
};

export default Register;
