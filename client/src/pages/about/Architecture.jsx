import React from 'react';

const Architecture = () => {
  return (
    <div className="p-4 text-white">
      <p className="mb-4">
        Zero-knowledge architecture is a security model where the service provider has no access to the user's data. In this architecture, all encryption and decryption processes occur on the client side, meaning only the user has access to the encryption keys.
      </p>
      <p className="mb-4">
        This ensures that even if the service provider's servers are compromised, your data remains secure and inaccessible to unauthorized parties. Your privacy and data security are guaranteed because the provider can never access or share your information.
      </p>
      <p className="mb-4">
        With zero-knowledge architecture, the service provider's role is limited to storing and managing encrypted data without ever having the ability to decrypt it. This is the foundation of our commitment to keeping your data safe.
      </p>
    </div>
  );
};

export default Architecture;
