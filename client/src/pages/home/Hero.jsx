import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-[352px] w-full p-6 flex flex-col justify-center items-center text-center text-white bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow-black shadow-md">
      <h1 className="text-5xl font-bold mb-4">
        Welcome to PasswordVault
      </h1>
      <p className="text-xl md:text-2xl mb-6">
        Securely store and manage all your passwords in one place. Your privacy is our top priority.
      </p>
      <Link to="/auth">
        <button className="bg-cyan-aqua-700 hover:bg-cyan-aqua-600 text-white px-6 py-3 rounded-lg text-lg transition-colors">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Hero;
