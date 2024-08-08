import React from 'react'
import AddPassword from './AddPassword'
import ViewVault from './ViewVault'
import { useAuthContext } from '../../context/AuthContext'
import Hero from './Hero'


const Home = () => {

  const { authUser } = useAuthContext();

  return (
    <div className='w-full'>
      {!authUser ? (
        <Hero />
      ) : (
        <div className='h-96 w-full flex flex-col justify-center items-center gap-4 p-6 bg-cyan-aqua-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow-black shadow-md'>
          <div className="header">
            <h2 className='text-2xl text-white font-bold'>Welcome to PasswordVault</h2>
            <h2 className=' text-white '>Save and view all your passwords at one place with ease!</h2>
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
      )}
    </div>
  )
}

export default Home
