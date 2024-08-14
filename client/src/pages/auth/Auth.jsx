import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import Login from './Login';
import Register from './Register';
import Switch from './Switch';
import VerifyOtp from './key/VerifyOTP';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { authUser } = useAuthContext();

  if (authUser) {
    if (!authUser.isVerified) {
      return <VerifyOtp />;
    }
    else {
      window.location.href = '/home';
    }
  }

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='h-[352px] w-full flex flex-row justify-center items-center gap-2 pt-3 pb-6 px-6 bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow-black shadow-md'>
      <div className={`h-full w-full transition-transform duration-1000 ${isLogin ? 'order-3' : 'order-1'}`}>
        {isLogin ? <Login /> : <Register />}
      </div>
      <div className={`h-full w-full transition-transform duration-1000 ${isLogin ? 'order-1' : 'order-3'}`}>
        <Switch onSwitch={handleSwitch} isLogin={isLogin} />
      </div>
      <div className='h-full w-[2px] order-2 bg-cyan-aqua-400 rounded-lg' />
    </div>
  );
};

export default Auth;
