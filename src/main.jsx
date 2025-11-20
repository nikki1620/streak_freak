import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HabitProvider } from './contexts/HabitContext'
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HabitProvider>
        <App />
      </HabitProvider>
    </AuthProvider>
  </React.StrictMode>,
)
