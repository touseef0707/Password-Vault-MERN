import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ClipboardIcon, ArrowPathIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { useAuthContext } from '../../../context/AuthContext';
import useSaveEncryptionKey from '../../../hooks/useSaveEncryptionKey';

const GenerateKey = () => {
  const [newEncryptionKey, setNewEncryptionKey] = useState(generateRandomKey());
  const [isKeyDownloaded, setIsKeyDownloaded] = useState(false);
  const { saveEncryptionKey } = useSaveEncryptionKey();
  const { setEncryptionKey } = useAuthContext();


  function generateRandomKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/~';
    let key = '';

    for (let i = 0; i < 100; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      key += chars[randomIndex];
    }

    return key;
  }



  // Copy key to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(newEncryptionKey).then(() => {
      alert('Key copied to clipboard!');
    });
  };

  // Save key as a text file
  const saveKeyAsFile = () => {
    const blob = new Blob([newEncryptionKey], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'encryption-key.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setIsKeyDownloaded(true);
  };

  // Generate a new random key
  const generateNewKey = () => {
    setNewEncryptionKey(generateRandomKey());
    setIsKeyDownloaded(false); // Reset the download state
  };

  const handleDoneClick = async () => {
    const response = await saveEncryptionKey(newEncryptionKey);
    if (response.success) {
      localStorage.setItem('auth-user', JSON.stringify(response.user));
      localStorage.setItem('encryption-key', newEncryptionKey);
      setEncryptionKey(newEncryptionKey);

      toast.success('Encryption key saved successfully!');
    } else {
      toast.error(response.message || 'Failed to save encryption key.');
    }
  };

  return (
    <div className='h-[352px] w-full flex flex-col justify-center items-center gap-4 p-6 bg-blackbg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow-black shadow-md'>
      
      <h2 className='text-2xl text-cyan-aqua-500 font-bold mb-4'> Save Your Encryption Key Safely!!</h2>

      <div className='relative w-full'>
        <div className='p-3 w-full bg-gray-800 text-white rounded-lg break-words'>
          {newEncryptionKey}
        </div>

        <div className='absolute top-1/2 right-3 transform -translate-y-1/2 flex gap-2'>
          <button
            onClick={copyToClipboard}
            className='text-cyan-aqua-700 hover:text-cyan-aqua-500'
            title='Copy to Clipboard'
          >
            <ClipboardIcon className='h-6 w-6' />
          </button>

          <button
            onClick={saveKeyAsFile}
            className='text-cyan-aqua-700 hover:text-cyan-aqua-500'
            title={isKeyDownloaded ? 'Downloaded' : 'Download'}
          >
            <ArrowDownIcon className='h-6 w-6' />
          </button>

          <button
            onClick={generateNewKey}
            className='text-cyan-aqua-700 hover:text-cyan-aqua-500'
            title='Regenerate Key'
          >
            <ArrowPathIcon className='h-6 w-6' />
          </button>
        </div>
      </div>

      <button
        onClick={handleDoneClick}
        className="text-white py-2 px-4 rounded-lg bg-cyan-aqua-700 hover:bg-cyan-aqua-500">
        Done
      </button>
    </div>
  );
};

export default GenerateKey;
