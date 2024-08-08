import React, { useState } from 'react';
import { TrashIcon, PencilIcon, EyeIcon, EyeSlashIcon, ClipboardIcon } from '@heroicons/react/24/outline';

const Password = ({ website, username, password, dateAdded, onUpdate, onDelete }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    });
  };

  return (
    <div className="p-3 pl-0 w-full flex items-center gap-4 text-white mb-2 overflow-hidden">

      <p className="w-52 text-sm text-cyan-aqua-500 overflow-x-auto hide-scrollbar whitespace-nowrap">{website}</p>

      <p className="w-44 text-sm overflow-x-auto hide-scrollbar whitespace-nowrap">{username}</p>

      <div className="w-44 flex items-center gap-2">
        <p
          className={`w-full text-sm overflow-x-auto hide-scrollbar whitespace-nowrap text-white bg-transparent border-none text-center placeholder-slate-300`}
        >
          {isPasswordVisible ? password : '########'}
        </p>
      </div>


      {/* <p className="w-20 text-sm text-gray-400">{dateAdded}</p> */}

      <div className="flex items-center gap-4">
        <button onClick={togglePasswordVisibility} className="text-cyan-400">
          {isPasswordVisible ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
        </button>
        <button onClick={copyToClipboard} className="text-gray-300">
          <ClipboardIcon className="h-6 w-6" />
        </button>
        <button onClick={onUpdate} className="text-cyan-400">
          <PencilIcon className="h-6 w-6" />
        </button>
        
        <button onClick={onDelete} className="text-red-500">
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>

    </div>
    );
};
