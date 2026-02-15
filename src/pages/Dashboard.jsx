// Importacción de dependencias y contextos necesarios:
import logo from "../assets/img/logo-cook_plan.webp";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// Componente principal del Dashboard:
export default function Dashboard() {
    const { user, logout } = useContext(AuthContext); // Obtenemos los datos del usuario y función de logout desde el contexto de autenticación.

    return (
        <div className="min-h-screen bg-light">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        <img
                            src={logo}
                            alt="Cook&Plan"
                            className="h-24 w-auto"
                        />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/consideraciones"
                            className="text-sm italic text-primary underline transition-colors"
                        >
                            Consideraciones de la demo
                        </Link>
                        <Link
                            to="/novedades"
                            className="text-sm italic text-primary underline transition-colors"
                        >
                            Novedades
                        </Link>
                        <span className="text-primary border border-accent rounded-md px-3 py-1 text-sm">
                            ¡Bienvenido, {user?.nombre || "Usuario"}!
                        </span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-sm bg-gray-100 text-dark rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Sección de Bienvenida */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-3xl font-bold text-dark mb-2">
                        ¡Bienvenido a la demo de Cook&Plan!
                    </h1>
                    <p className="text-gray-600">
                        Gestiona tus recetas, planifica tus menús y genera
                        listas de compra automáticamente.
                    </p>
                </div>

                {/* Acciones */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Recetas */}
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

                    {/* Menús */}
                    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📅</span>
                            </div>
                            <h2 className="ml-4 text-xl font-semibold text-dark">
                                Mis Menús
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Planifica tus comidas semanales.
                        </p>
                        <Link
                            to="/menus"
                            className="inline-block px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
                        >
                            Ver menús
                        </Link>
                    </div>

                    {/* Lista de la Compra */}
                    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🛒</span>
                            </div>
                            <h2 className="ml-4 text-xl font-semibold text-dark">
                                Lista de Compra
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Genera tu lista de compras automáticamente.
                        </p>
                        <Link
                            to="/lista-compra"
                            className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            Próximamente...
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
