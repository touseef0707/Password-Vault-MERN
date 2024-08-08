import React from 'react';

const HowToUse = () => {
  return (
    <div className="p-4 bg-cyan-aqua-900 rounded-lg">
      <ul className="list-disc pl-5 text-left space-y-2">
        <li>Sign up by creating a new account. During sign-up, you will receive an encryption key. Make sure to save this key securely.</li>
        <li>Log in using your credentials. You will need to upload the encryption key you saved during sign-up.</li>
        <li>Once logged in, you can add new passwords, view your saved passwords, and delete them as needed.</li>
      </ul>
        <p className='list-none w-fit px-2 bg-gray-700 mt-2'><strong>**WARNING**</strong> Keep your encryption key safe. If you lose it, you will lose access to your account and all your saved passwords forever.</p>
    </div>
  );
};

export default HowToUse;
