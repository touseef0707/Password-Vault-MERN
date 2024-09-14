import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import GenerateKey from './key/GenerateKey';
import VerifyKey from './key/VerifyKey';
import Unauthorized from './invalidStatus/Unauthorized';
import Hero from './Hero';
import AddPasswordModal from '../../components/modal/AddPasswordModal';
import ViewVault from './ViewVault';
import { PlusIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const { authUser, encryptionKey } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const openModal = () => setIsModalOpen(true); // Function to open the modal
  const closeModal = () => setIsModalOpen(false); // Function to close the modal

  if (!authUser) {
    return <Hero />;
  } else if (authUser) {
    if (authUser.isVerified === false) {
      return <Unauthorized />;
    } else if (authUser.isFirstLogin && !encryptionKey) {
      return <GenerateKey />;
    } else if (authUser.isVerified && !authUser.isFirstLogin && !encryptionKey) {
      return <VerifyKey />;
    }
  }

  return (
    <div className='h-[352px] w-full p-6 flex flex-col justify-center items-center gap-4 shadow-black shadow-md relative'>
      {/* Button wrapper with relative positioning */}
      <div className="absolute top-6 right-6">
        <button
          className="bg-slate-800 text-gray-300 flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-900 transition"
          onClick={openModal} // Open modal on click
        >
          <PlusIcon className="text-gray-300 w-5 h-5" /> {/* Add the plus icon */}
          New Password
        </button>
      </div>

      <div className='flex'>
        {/* Conditionally render the modal */}
        {isModalOpen && <AddPasswordModal onClose={closeModal} />}

        <div className="order-3 w-72">
          <ViewVault />
        </div>
      </div>
    </div>
  );
};

export default Home;
