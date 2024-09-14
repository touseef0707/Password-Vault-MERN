import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useVerifyOTP from '../../../hooks/useVerifyOTP';
import { useAuthContext } from '../../../context/AuthContext';

const VerifyOtp = () => {
  const { authUser } = useAuthContext();

  if (authUser.isVerified) {
    window.location.pathname = '/home';
  }

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const { verifyOTP, loading } = useVerifyOTP();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus the next input
      if (index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();

      let newOtp = [...otp];

      if (otp[index]) {
        // Clear the current input field
        newOtp[index] = '';
      } else if (index > 0) {
        // Move focus to the previous input field if current is empty
        document.getElementById(`otp-input-${index - 1}`).focus();
      }

      setOtp(newOtp);
    }
  };

  const handleSubmit = async () => {

    const enteredOtp = otp.join('');
    const response = await verifyOTP({ otp: enteredOtp });

    if (response.success === true) {
      setIsOtpVerified(true);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className='h-[352px] w-full flex flex-col justify-center items-center gap-4 p-6 shadow-black shadow-md'>
      <h2 className='text-3xl font-bold text-cyan-aqua-400 mb-4'>OTP Verification</h2>
      <p className='text-xs'>Enter the One Time Password sent to the provided email</p>

      <div className='flex justify-center gap-2'>
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type='text'
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength='1'
            className='w-12 h-12 text-center text-lg font-bold bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-aqua-700'
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className='w-fit mt-4 p-2 rounded-lg bg-cyan-aqua-700 hover:bg-cyan-aqua-600 text-white'
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify Your Email'}
      </button>

      {isOtpVerified && <p className='text-green-500 mt-2'>OTP is correct!</p>}
    </div>
  );
};

export default VerifyOtp;
