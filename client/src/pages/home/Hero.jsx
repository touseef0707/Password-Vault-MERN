import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-cyan-aqua-400 text-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow-black shadow-md h-96 w-full flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-5xl font-bold mb-4">
        Welcome to PasswordVault
      </h1>
      <p className="text-xl md:text-2xl mb-6">
        Securely store and manage all your passwords in one place. Your privacy is our top priority.
      </p>
      <Link to="/auth">
        <button className="bg-cyan-aqua-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-cyan-aqua-800 transition-colors">
          Get Started
        </button>
      </Link>
      {/* <div className="absolute bottom-0 right-0 p-6">
        <img
          src="/path-to-your-image.jpg"
          alt="Hero Visual"
          className="w-32 h-32 object-cover rounded-full shadow-lg"
        />
      </div> */}

    </div>
  );
};

export default Hero;
