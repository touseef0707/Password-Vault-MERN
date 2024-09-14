import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const GeneralModal = ({ isOpen, onRequestClose, title, message, onConfirm, zIndex }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="flex justify-center items-center inset-0 fixed bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
    >
      <div className={`bg-black text-white p-5 rounded-lg shadow-lg text-center`}>
        <h2 className="text-xl  font-semibold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              onConfirm();
              onRequestClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
          >
            Yes
          </button>
          <button
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GeneralModal;
