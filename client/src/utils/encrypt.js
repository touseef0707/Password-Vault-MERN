import CryptoJS from 'crypto-js';

/**
 * Encrypts the password using AES encryption.
 * 
 * @param {string} encryptionKey - The key to use for encryption.
 * @param {string} password - The password to encrypt.
 * @returns {string} - The encrypted password.
 */
export const encryptPassword = (encryptionKey, password) => {
  return CryptoJS.AES.encrypt(password, encryptionKey).toString();
};
