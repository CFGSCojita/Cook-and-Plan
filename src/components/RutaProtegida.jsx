// Importaciones necesarias desde React y React Router:
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// Creamos un componente de ruta protegida que verifica la autenticación del usuario.
export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext); // Obtenemos el estado de autenticación y carga desde el contexto.

    // Estructura de control 'if'.
    // Si la aplicación está en estado de carga, mostramos un indicador de carga.
    // Si no hay un usuario autenticado, redirigimos al usuario a la página de inicio de sesión.
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-dark">Cargando...</div>
            </div>
        );
    }

    return user ? children : <Navigate to="/login" replace />; // Renderizamos los hijos si el usuario está autenticado, de lo contrario redirigimos.
}