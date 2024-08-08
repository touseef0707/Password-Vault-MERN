import CryptoJS from 'crypto-js';

/**
 * Decrypts the encrypted password using AES decryption.
 * 
 * @param {string} encryptionKey - The key used for decryption (must be the same as used for encryption).
 * @param {string} encryptedPassword - The encrypted password to decrypt.
 * @returns {string} - The decrypted password.
 */
export const decryptPassword = (encryptionKey, encryptedPassword) => {
    try {
        
        // Decrypt the password
        const bytes = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        // Check if decryption was successful
        if (!decryptedPassword) {
            throw new Error('Decryption failed');
        }

        return decryptedPassword;
    } catch (error) {
        console.error('Decryption failed:', error);
        throw new Error('Decryption failed');
    }
};

