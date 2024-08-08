import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { PasswordProvider } from './context/PasswordContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PasswordProvider>
        <App />
      </PasswordProvider>
    </AuthProvider>
  </React.StrictMode>
)
