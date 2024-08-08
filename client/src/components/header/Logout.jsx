import React, { useState } from 'react';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import useLogout from '../../hooks/useLogout';
import GeneralModal from '../modal/GeneralModal'; // Import the generalized modal

const Logout = () => {
  const { Logout } = useLogout();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleLogout = async () => {
    localStorage.clear();
    await Logout();
  }

  return (
    <div>
      <button
        type='button'
        className='flex items-center'
        onClick={openModal}
      >
        <ArrowLeftStartOnRectangleIcon className='h-5 w-5 mr-1' />
        <span>Logout</span>
      </button>

      <GeneralModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Logout;
