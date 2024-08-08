import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [encryptionKey, setEncryptionKey] = useState('');
  const [keyMethod, setKeyMethod] = useState('manual'); // 'manual' or 'file'
  const [fileError, setFileError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showEncryptionKey, setShowEncryptionKey] = useState(false); // State for encryption key visibility
  const { login, loading } = useLogin();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = () => {
        setEncryptionKey(reader.result.trim());
        setFileError(''); // Clear any previous file errors
      };
      reader.onerror = () => {
        setFileError('Failed to read the file');
      };
      reader.readAsText(file);
    } else {
      setFileError('Please upload a valid text file');
    }
  };

  // Handle key method change
  const handleKeyMethodChange = (e) => {
    setKeyMethod(e.target.value);
    setEncryptionKey(''); // Clear encryption key when switching methods
    setFileError(''); // Clear file error when switching to manual input
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (encryptionKey) {
      await login({ ...formData, encryptionKey });
    } else {
      setFileError('Please enter or upload the encryption key');
    }
  };

  // Check if the form is valid
  const isFormValid = formData.email && formData.password && encryptionKey;

  return (
    <div className='h-full w-full p-6 flex-col justify-center items-center'>
      <h2 className='text-2xl text-cyan-aqua-500 font-bold mb-4'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4 relative'>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='example@gmail.com'
            className='w-full px-4 py-2 border rounded-lg'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className='mb-4 relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            placeholder='password'
            className='w-full px-4 py-2 border rounded-lg'
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

        {/* Key Method Selection */}
        <div className='mb-4 text-white'>
          <label className='inline-flex items-center mr-4'>
            <input
              type='radio'
              value='manual'
              checked={keyMethod === 'manual'}
              onChange={handleKeyMethodChange}
              className='form-radio'
            />
            <span className='ml-2'>Enter Key Manually</span>
          </label>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              value='file'
              checked={keyMethod === 'file'}
              onChange={handleKeyMethodChange}
              className='form-radio'
            />
            <span className='ml-2'>Upload File</span>
          </label>
        </div>

        {/* Conditionally Render Input Field */}
        {keyMethod === 'manual' && (
          <div className='mb-4 relative'>
            <input
              type={showEncryptionKey ? 'text' : 'password'}
              placeholder='Enter encryption key'
              className='w-full px-4 py-2 border rounded-lg'
              value={encryptionKey}
              onChange={(e) => setEncryptionKey(e.target.value)}
            />
            <button
              type='button'
              onClick={() => setShowEncryptionKey(!showEncryptionKey)}
              className='absolute inset-y-0 right-3 flex items-center text-cyan-aqua-700'
            >
              {showEncryptionKey ? (
                <EyeSlashIcon className='h-5 w-5' />
              ) : (
                <EyeIcon className='h-5 w-5' />
              )}
            </button>
          </div>
        )}

        {/* Conditionally Render File Upload */}
        {keyMethod === 'file' && (
          <div className='mb-4 p-2 bg-white rounded-lg'>
            <input
              type='file'
              accept='.txt'
              className='w-full'
              onChange={handleFileChange}
            />
            {fileError && <p className='mt-2 text-red-500'>{fileError}</p>}
          </div>
        )}

        <button
          type='submit'
          className={`w-full bg-cyan-aqua-700 text-white py-2 rounded-lg ${loading || !isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading || !isFormValid}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
