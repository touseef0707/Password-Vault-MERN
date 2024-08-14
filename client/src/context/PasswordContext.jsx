import React, { createContext, useContext, useState, useEffect } from 'react';
import useGetPasswords from '../hooks/useGetPasswords';

export const PasswordContext = createContext();

export const usePasswordContext = () => {
    return useContext(PasswordContext);
};

export const PasswordProvider = ({ children }) => {
    const { passwords, isLoading } = useGetPasswords();
    const [passwordList, setPasswordList] = useState(passwords);

    useEffect(() => {
        setPasswordList(passwords);
    }, [passwords]);

    return (
        <PasswordContext.Provider value={{ passwords: passwordList, isLoading, setPasswords: setPasswordList }}>
            {children}
        </PasswordContext.Provider>
    );
};
