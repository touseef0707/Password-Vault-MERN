// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, InformationCircleIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import Logout from './Logout'; // Adjust the path as necessary
import { useAuthContext } from '../../context/AuthContext';

const Navbar = () => {

  const { authUser } = useAuthContext();


  return (
    <nav className='bg-cyan-aqua-700 p-3 rounded-lg shadow-md shadow-black mb-4'>
      <div className='flex flex-row justify-between items-center text-white'>
        <div className="nav-title flex flex-row">
          {/* <img src="" alt="logo.jpg" /> */}
          <h3 className='text-xl font-bold'>Password Vault</h3>
        </div>
        <ul className='flex flex-row gap-5 text-md'>

          <li>
            <Link className='flex items-center' to='home'>
              <HomeIcon className='h-5 w-5 mr-1'/>
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link className='flex items-center' to="/about">
              <InformationCircleIcon className='h-5 w-5 mr-1'/>
              <span>About</span>
            </Link>
          </li>

          <li>
            <Link className='flex items-center' to="/contact">
              <PhoneIcon className='h-5 w-5 mr-1'/>
              <span>Contact</span>
            </Link>
          </li>

          <li>
            {authUser ? (
              <Logout />
            ) : (
              <Link className='flex items-center' to="/auth">
                <UserIcon className='h-5 w-5 mr-1' />
                <span>SignUp</span>
              </Link>
            )}
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
