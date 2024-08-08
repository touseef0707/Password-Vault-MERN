import React, { useState } from 'react';

const VerifyKey = () => {
  const [inputKey, setInputKey] = useState('');
  const [isKeyVerified, setIsKeyVerified] = useState(false);
  const correctKey = '282s2de5w2k3c3o5o174r1e125x6u3f6n3p66s6x2i6y5h1b4e0a6c6n1z11594trd1u1w5o1d275d2o1tz6lu1s1b6h2r3q2k2y'; // Replace this with the key you want to verify against

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setInputKey(event.target.result.trim());
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  const verifyKey = () => {
    if (inputKey === correctKey) {
      setIsKeyVerified(true);
      localStorage.setItem('encryptionKey', inputKey);
      alert('Key verified and saved successfully!');
    } else {
      alert('Invalid key. Please try again.');
    }
  };

  return (
    <div className='h-96 w-full flex flex-col justify-center items-center gap-4 p-6 bg-cyan-aqua-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow-black shadow-md'>
      <h2 className='text-2xl font-bold text-white mb-4'>Verify Encryption Key</h2>
      
      <input
        type='file'
        accept='.txt'
        onChange={handleFileUpload}
        className='p-2 w-fit bg-gray-800 text-white border-none rounded-lg text-center placeholder-slate-300 focus:outline-none'
      />
      
      <button
        onClick={verifyKey}
        className='w-fit bg-cyan-aqua-700 text-white p-2 rounded-lg mt-4'
      >
        Verify Key
      </button>
      
      {isKeyVerified && <p className='text-green-500 mt-2'>Key is correct!</p>}
    </div>
  );
};

export default VerifyKey;
