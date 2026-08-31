import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { StatusProvider } from './context/StatusContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <StatusProvider>
        <App />
      </StatusProvider>
    </AuthProvider>
  </StrictMode>,
)
