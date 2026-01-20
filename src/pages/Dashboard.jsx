import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {

    const navigate = useNavigate(); // Declaramos el hook de navegación
    
    // Inicializamos el estado del usuario desde localStorage.
    // Más adelante lo cambiaremos y usaremos AuthContext para manejar la autenticación.
    // Versión de testing rápido:
    const [ user ] = useState(() => {
        const userData = localStorage.getItem("user"); // Obtenemos los datos del usuario desde localStorage.

        // Estructura de control 'if'.
        // Si no hay datos, retornamos null.
        if (!userData) {
            return null;
        }
        
        // Estructura 'try-catch'.
        // Intentará convertir los datos del usuario a un objeto.
        // Si hay un error, limpiará el localStorage y retornará null.
        try {
            return JSON.parse(userData);
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem("user");
            return null;
        }
    });

    // Usar useEffect para redirigir si no hay usuario:
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    // Declaramos una función para cerrar sesión:
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };
    
    // Estructura de control 'if'.
    // Si no hay usuario, no renderizamos nada (el useEffect se encargará de redirigir).
    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-light">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        Cook&Plan
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-dark">
                            ¡Bienvenido, {user.nombre || "Usuario"} ({user.email})!
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm bg-gray-100 text-dark rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-3xl font-bold text-dark mb-2">
                        ¡Bienvenido a Cook&Plan!
                    </h1>
                    <p className="text-gray-600">
                        Gestiona tus recetas, planifica tus menús y genera listas de compra automáticamente.
                    </p>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Recetas Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📖</span>
                            </div>
                            <h2 className="ml-4 text-xl font-semibold text-dark">
                                Mis Recetas
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Crea y gestiona tus recetas favoritas.
                        </p>
                        <Link
                            to="/recetas"
                            className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Ver recetas
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}