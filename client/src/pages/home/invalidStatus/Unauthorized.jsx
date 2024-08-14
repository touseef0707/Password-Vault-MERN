import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  // Handle navigation back to home or login
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-[352px] w-full p-6 flex flex-col justify-center items-center text-center text-white bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow-black shadow-md">
      <h1 className="text-4xl font-bold text-cyan-aqua-400 mb-4">Unauthorized !!</h1>
      <p className=" mb-6 text-lg text-white">
        You do not have permission to view this page.
      </p>
      <button
        onClick={handleGoBack}
        className="px-6 py-2 text-white bg-cyan-aqua-700 hover:bg-cyan-aqua-600 focus:outline-none rounded-lg shadow-md"
      >
        Verify Email
      </button>
    </div>
  );
};

export default Unauthorized;
