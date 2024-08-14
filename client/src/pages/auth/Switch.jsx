import React from 'react';

const Switch = ({ onSwitch, isLogin }) => {
  return (
    <div className='h-full w-full p-6 flex flex-col justify-center items-center'>
      <h2 className='mb-4 text-2xl text-cyan-aqua-500 font-bold'>
        {isLogin ? 'New to Password Vault?' : 'Already have an account?'}
      </h2>
      <button onClick={onSwitch} className='w-[200px] bg-cyan-aqua-700 hover:bg-cyan-aqua-600 text-white py-2 rounded-lg'>
        {isLogin ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default Switch;
