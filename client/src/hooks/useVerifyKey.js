// hooks/useVerifyHook.js
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const useVerifyKey = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { setEncryptionKey } = useAuthContext();


  const verifyKey = async (encryptionKey) => {
    setLoading(true);
    setError(null);

    try {

      const response = await fetch('/api/auth/verify-encryption-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ encryptionKey }),
      });

      const result = await response.json();

      if (response.ok) {

        if (result) {
          setSuccess(true);
          localStorage.setItem('encryption-key', encryptionKey); 
          setEncryptionKey(encryptionKey)
          toast.success('Key verified successfully');
        } else {
          setError('Invalid key');
          throw new Error('Invalid key');
        }

        return result;

      } else {
        setError(result.message || 'Verification failed');
        throw new Error(result.message || 'Verification failed');
      }
    } catch (error) {
      setError(error.message);
      throw new Error(error.message);


    } finally {
      setLoading(false);
    }
  };

  return { verifyKey, loading, success, error };
};

export default useVerifyKey;
