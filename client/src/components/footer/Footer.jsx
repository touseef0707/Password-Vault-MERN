import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-cyan-aqua-700 p-3 rounded-lg shadow-md shadow-black mt-4 text-xs'>

      <div className='flex flex-col gap-2 justify-between items-center text-white'>

        <div className="footer-left flex flex-col items-center">
          <p className='text-md'>&copy; 2024 Password Vault. All rights reserved.</p>
        </div>

        <div className='footer-right flex flex-row gap-4 text-md mt-2 md:mt-0'>
          <Link to="/about">Privacy Policy</Link>
          <Link to="/about">Terms of Service</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

      </div>

    </div>
  )
}

export default Footer
