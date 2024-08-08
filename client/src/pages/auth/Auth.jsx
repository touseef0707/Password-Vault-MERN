import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Switch from './Switch';
import { useAuthContext } from '../../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { authUser } = useAuthContext();
  if (authUser) {
    // Redirect to /home if user is already authenticated
    window.location.href = '/home';
  }

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='h-96 w-full flex flex-row justify-center items-center gap-4 p-6 bg-cyan-aqua-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow-black shadow-md'>
      <div className={`h-full w-full transition-transform duration-1000 ${isLogin ? 'order-3': 'order-1' }`}>
        {isLogin ? <Login /> : <Register />}
      </div>
      <div className={`h-full w-full transition-transform duration-1000 ${isLogin ? 'order-1' : 'order-3'}`}>
        <Switch onSwitch={handleSwitch} isLogin={isLogin} />
      </div>
      
      <div className='h-full w-[2px] order-2 bg-cyan-aqua-700 rounded-lg' />
    </div>
  );
};

export default Auth;
