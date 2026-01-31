// Importaciones necesarias desde React y otras librerías:
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider'
import RutaProtegida from './components/RutaProtegida'
import './index.css'
import App from './App'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

// Renderizado de la aplicación React en el elemento con id 'root':
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<div>Home</div>} />
            <Route path="login" element={<Login />} />
            <Route 
              path="dashboard" 
              element={
                <RutaProtegida>
                  <Dashboard />
                </RutaProtegida>
              } 
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)