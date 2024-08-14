import React, { useState } from 'react';
import useVerifyKey from '../../../hooks/useVerifyKey';

const VerifyKey = () => {
  const [inputKey, setInputKey] = useState('');
  const [isKeyVerified, setIsKeyVerified] = useState(false);
  const [fileError, setFileError] = useState('');
  const { verifyKey, loading, success, error } = useVerifyKey();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setInputKey(event.target.result.trim());
    };

    if (file) {
      reader.readAsText(file);
    } else {
      setFileError('Please upload a valid text file');
    }
  };

  const handleVerifyKey = async () => {
    await verifyKey(inputKey);
    setIsKeyVerified(true);
  };

  return (
    <div className='h-[352px] w-full flex flex-col justify-center items-center gap-4 p-6 bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow-black shadow-md'>
      <h2 className='text-2xl font-bold text-white mb-4'>Verify Encryption Key</h2>

      <input
        type='file'
        accept='.txt'
        onChange={handleFileUpload}
        className='p-2 w-fit bg-gray-800 text-white border-none rounded-lg text-center placeholder-slate-300 focus:outline-none'
      />

      <button
        onClick={handleVerifyKey}
        className={`w-fit bg-cyan-aqua-700 hover:bg-cyan-aqua-600 text-white p-2 rounded-lg mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify Key'}
      </button>

      {isKeyVerified && <p className='text-green-500 mt-2'>Key is correct!</p>}
      {error && <p className='text-red-950 mt-2'>{error}</p>}
      {fileError && <p className='text-red-950 mt-2'>{fileError}</p>}
    </div>
  );
};

export default VerifyKey;
