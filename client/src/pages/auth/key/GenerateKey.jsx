import React, { useState } from 'react';
import { ClipboardIcon, ArrowPathIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const GenerateKey = ({ onGenerateKey, encryptionKey, onCopy, onSave, onRegenerate }) => {
  return (
    <div className="mt-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2 w-full justify-center overflow-auto">
      <div>
        <p className='text-lg overflow-x-auto hide-scrollbar w-52'>{encryptionKey}</p>
      </div>
      <button type='button' onClick={onCopy} className="text-cyan-400">
        <ClipboardIcon className="h-6 w-6" />
      </button>
      <button type='button' onClick={onRegenerate} className="text-cyan-400">
        <ArrowPathIcon className="h-6 w-6" />
      </button>
      <button type='button' onClick={onSave} className="text-cyan-400">
        <ArrowDownIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default GenerateKey;
