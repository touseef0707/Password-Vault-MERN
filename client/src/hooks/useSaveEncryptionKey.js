import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const useSaveEncryptionKey = () => {
  const [loading, setLoading] = useState(false);

  const saveEncryptionKey = async (encryptionKey) => {
    setLoading(true);

    try {
      const response = await fetch('/api/auth/set-encryption-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ encryptionKey: encryptionKey }),
      });

      const data = await response.json();
      setLoading(false);
      console.log(data.message)
      if (response.ok) {

        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Failed to set encryption key.' };
      }
    } catch (error) {
      setLoading(false);
      console.error('Error setting encryption key:', error);
      return { success: false, message: 'An error occurred while setting the encryption key.' };
    }
  };

  return { saveEncryptionKey, loading };
};

export default useSaveEncryptionKey;
