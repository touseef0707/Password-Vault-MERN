import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const useVerifyOTP = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const verifyOTP = async ({ otp }) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: otp }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem('auth-user', JSON.stringify(data.user));
        setAuthUser(data.user);
        return { success: true, message: data.message, user: data.user };
      } else {
        return { success: false, message: data.message || 'OTP verification failed.' };
      }

    } catch (error) {
      setLoading(false);
      return { success: false, message: 'An error occurred during OTP verification.' };
    }
  };

  return { verifyOTP, loading };
};

export default useVerifyOTP;
