import React, { useState } from 'react';
import { usePasswordContext } from '../../context/PasswordContext';
import useDeletePassword from '../../hooks/useDeletePassword';
import PasswordModal from '../../components/modal/PasswordModal';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { capitalizeFirstLetter } from '../../utils/capitalize';

const ViewVault = () => {
  const { passwords, isLoading } = usePasswordContext();
  const [modalData, setModalData] = useState(null);

  const handleOpenModal = (password) => {
    setModalData(password);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  if (isLoading) {
    return (
      <div className="h-64 w-full flex flex-col justify-center items-center">
        <h2 className="text-xl text-gray-400">Loading...</h2>
      </div>
    );
  }

  if (passwords.length === 0) {
    return (
      <div className="h-64 w-full flex flex-col justify-center items-center">
        <h2 className="text-xl text-gray-400">Add passwords to view here</h2>
      </div>
    );
  }

  return (
    <div className="w-full h-64 flex flex-col rounded-lg overflow-hidden border border-gray-700">
      <div className="overflow-auto scrollbar-custom w-full">
        <table className="w-full min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-slate-800 text-gray-300">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Site</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((password, index) => (
              <tr
                key={password._id}
                className={index % 2 === 0 ? "bg-slate-700 text-gray-200" : "bg-slate-600 text-gray-200"}
              >
                <td className="px-4 py-2">
                  <img
                    src={`https://cdn.brandfetch.io/${password.website}.com/icon/`}
                    alt={`${password.website} Logo`}
                    className="w-6 h-6 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/earth-svgrepo-com.svg"; // Fallback image
                    }}
                  />
                </td>
                <td className="px-4 py-2">
                  <span>{capitalizeFirstLetter(password.website)}</span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleOpenModal(password)}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing password details */}
      {modalData && (
        <PasswordModal
          password={modalData}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ViewVault;
