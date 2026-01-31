// Importaciones necesarias desde React y React Router:
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

// Creamos el proveedor de autenticación que manejará el estado del usuario y las funciones de login/logout.
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Estado para almacenar la información del usuario autenticado.
    const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial de la autenticación.
    const navigate = useNavigate(); // Hook para la navegación programática.

    // Verificamos la sesión del usuario al montar el componente:
    useEffect(() => {
        checkSession();
    }, []);

    // Creamos una función asíncrona para verificar la sesión del usuario:
    const checkSession = async () => {
        // Estructura 'try-catch'.
        // Intentará realizar una solicitud para verificar la sesión del usuario.
        // Si ocurre un error, se capturará y se mostrará en la consola.
        try {
            // Realizamos una solicitud fetch al endpoint de verificación de sesión:
            const response = await fetch(
                'http://localhost/student006/cook-and-plan/api/auth/check_session.php',
                { credentials: 'include' }
            );
            const data = await response.json(); // Parseamos la respuesta JSON.

            // Estructura de control 'if'.
            // Si la respuesta indica éxito, actualizamos el estado del usuario con los datos recibidos.
            if (data.success) {
                setUser(data.user);
            }
        } catch (error) {
            console.error('Error checking session:', error);
        } finally {
            setLoading(false);
        }
    };

    // Creamos otra función asíncrona para manejar el login del usuario:
    const login = async (email, password) => {
        // Realizamos una solicitud fetch al endpoint de login:
        const response = await fetch(
            'http://localhost/student006/cook-and-plan/api/auth/db_login.php',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            }
        );

        const data = await response.json(); // Parseamos la respuesta JSON.

        // Estructura de control 'if'.
        // Si la respuesta indica éxito, actualizamos el estado del usuario y navegamos al dashboard.
        if (data.success) {
            setUser(data.user);
            navigate('/dashboard');
        }

        return data; // Devolvemos los datos de la respuesta para su manejo posterior.
    };

    // Creamos una última función asíncrona para manejar el logout del usuario:
    const logout = async () => {
        // Estructura 'try-catch'.
        // Intentará realizar una solicitud para cerrar la sesión del usuario.
        // Si ocurre un error, se capturará y se mostrará en la consola.
        try {
            await fetch(
                'http://localhost/student006/cook-and-plan/api/auth/logout.php',
                {
                    method: 'POST',
                    credentials: 'include'
                }
            );
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null); // Limpiamos el estado del usuario.
            navigate('/login'); // Navegamos a la página de login.
        }
    };

    // Definimos el valor que se proporcionará a través del contexto:
    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    };

    // Renderizamos el proveedor del contexto con los valores definidos:
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}