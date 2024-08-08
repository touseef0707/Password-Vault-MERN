import React, { createContext, useContext, useState, useEffect } from 'react';
import useGetPasswords from '../hooks/useGetPasswords'; // Import the custom hook

export const PasswordContext = createContext();

export const usePasswordContext = () => {
    return useContext(PasswordContext);
};

export const PasswordProvider = ({ children }) => {
    const { passwords, isLoading } = useGetPasswords(); // Destructure passwords and isLoading
    const [passwordList, setPasswordList] = useState(passwords);

    useEffect(() => {
        setPasswordList(passwords); // Update state when passwords change
    }, [passwords]);

    return (
        <PasswordContext.Provider value={{ passwords: passwordList, isLoading, setPasswords: setPasswordList }}>
            {children}
        </PasswordContext.Provider>
    );
};
