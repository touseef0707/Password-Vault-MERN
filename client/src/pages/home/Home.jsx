import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import GenerateKey from './key/GenerateKey'
import VerifyKey from './key/VerifyKey'
import Unauthorized from './invalidStatus/Unauthorized'
import Hero from './Hero'
import AddPassword from './AddPassword'
import ViewVault from './ViewVault'


const Home = () => {

  const { authUser, encryptionKey } = useAuthContext();

  if (!authUser) {
    return <Hero />;
  }
  else if (authUser) {
    if (authUser.isVerified === false) {
      return <Unauthorized />;
    }
    else if (authUser.isFirstLogin && !encryptionKey) {
      return <GenerateKey />
    }
    else if (authUser.isVerified && !authUser.isFirstLogin && !encryptionKey) {
      return <VerifyKey />
    }
  }

  return (
    <div className='h-[352px] w-full p-6 flex flex-col justify-center items-center gap-4 bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow-black shadow-md'>
      <div className="header">
        <h2 className='text-3xl text-cyan-aqua-400 font-bold'>Welcome to Your Vault</h2>
      </div>

      <div className='flex'>
        <div className="order-1">
          <AddPassword />
        </div>

        <div className='h-full w-[2px] order-2 bg-cyan-aqua-700 rounded-lg' />

        <div className="order-3">
          <ViewVault />
        </div>
      </div>
    </div>
  )
}

export default Home
