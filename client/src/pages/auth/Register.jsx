import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useSignup from '../../hooks/useSignup';
import GenerateKey from './key/GenerateKey';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [encryptionKey, setEncryptionKey] = useState('');
  const [isKeyGenerated, setIsKeyGenerated] = useState(false);
  const [isKeyDownloaded, setIsKeyDownloaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const { signup, loading } = useSignup();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Generate random key
  const generateRandomKey = () => {
    const array = new Uint8Array(75); // 75 random bytes
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(36)).join('').substring(0, 100);
  };

  // Handle key generation
  const handleGenerateKey = () => {
    setEncryptionKey(generateRandomKey());
    setIsKeyGenerated(true);
    setIsKeyDownloaded(false); // Reset the download status when a new key is generated
  };

  // Copy key to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(encryptionKey).then(() => {
      alert('Key copied to clipboard!');
    });
  };

  // Save key as a text file
  const saveKeyAsFile = () => {
    const blob = new Blob([encryptionKey], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'encryption-key.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsKeyDownloaded(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ ...formData, encryptionKey });  // Send formData and encryptionKey to the server
  };

  const isFormCompleted = formData.email && formData.password && formData.confirmPassword;

  return (
    <div className='h-full w-full p-6 flex-col justify-center items-center'>
      <h2 className='text-2xl text-cyan-aqua-500 font-bold mb-4'>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
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

        <div className='mb-4 relative'>
          <input 
            type={showConfirmPassword ? 'text' : 'password'}
            id='cpassword' 
            name='confirmPassword' 
            placeholder='confirm password' 
            className='w-full px-4 py-2 border rounded-lg' 
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

        {!isKeyGenerated ? (
          <button 
            type='button' 
            className={`w-full bg-cyan-aqua-700 text-white py-2 rounded-lg ${isFormCompleted ? '' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!isFormCompleted} 
            onClick={handleGenerateKey}
          >
            Generate Key
          </button>
        ) : (
          <GenerateKey 
            encryptionKey={encryptionKey}
            onCopy={copyToClipboard}
            onSave={saveKeyAsFile}
            onRegenerate={() => {
              setEncryptionKey(generateRandomKey());
              setIsKeyDownloaded(false); // Reset the download status when a new key is generated
            }}
          />
        )}

        <button 
          type='submit' 
          className={`w-full mt-4 bg-cyan-aqua-700 text-white py-2 rounded-lg ${!isKeyDownloaded || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isKeyDownloaded || loading} 
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>

      </form>
    </div>
  );
};

export default Register;
