import { createContext, useContext, useState } from "react";

const AuthContext = createContext();    // Create Context

// Custom Hook
export const useAuthContext = () => {
  return useContext(AuthContext);
}

// Auth Provider that will wrap the entire application in main.jsx including socket provider
export const AuthProvider = ({ children }) => {

  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('auth-user')) || null);
  const [encryptionKey, setEncryptionKey] = useState(localStorage.getItem('encryption-key') || null);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, encryptionKey, setEncryptionKey }}>
      {children}
    </AuthContext.Provider>
  );
}