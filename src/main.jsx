import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider'
import RutaProtegida from './components/RutaProtegida'
import './index.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Redirigimos / → /dashboard (RutaProtegida se encarga de mandar al login si no está autenticado) */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/dashboard"
            element={
              <RutaProtegida>
                <Dashboard />
              </RutaProtegida>
            }
          />

          {/* Cualquier ruta desconocida que vaya al /dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)