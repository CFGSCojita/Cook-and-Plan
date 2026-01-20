// Importaciones necesarias.
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate(); // Declaramos un hook para navegación.

    // Estado para manejar datos del formulario, errores y carga.
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [error, setError] = useState(""); // Estado para mensajes de error.
    const [loading, setLoading] = useState(false); // Estado para indicar carga.

    // Manejador de cambios en los campos del formulario.
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target; // Desestructuramos el evento.
        // Actualizamos el estado del formulario.
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Manejador de envío del formulario.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenimos el comportamiento por defecto.
        setError(""); // Reseteamos errores.
        setLoading(true); // Indicamos que estamos en carga.

        // Estructura 'try-catch'.
        // Intentará realizar la petición de login. Si falla, capturará el error.
        try {
            // Realizamos la petición al backend.
            const response = await fetch(
                "http://localhost/student006/cook-and-plan/api/auth/db_login.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                }
            );

            const data = await response.json(); // Parseamos la respuesta JSON.

            // Estructura de control 'if'.
            // Si la respuesta es exitosa, navegamos al dashboard.
            // Si no, mostramos el mensaje de error.
            if (data.success) {
                // Guardamos datos del usuario en localStorage o context
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
            } else {
                setError(data.message || "Error al iniciar sesión");
            }
        } catch (err) {
            setError("Error de conexión. Intenta de nuevo.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-light flex flex-col">
            {/* Header simple */}
            <header className="py-6 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        Cook&Plan
                    </Link>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Mensaje de bienvenida */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-dark mb-2">
                            Bienvenido de nuevo
                        </h1>
                        <p className="text-gray-600">
                            Inicia sesión para acceder a tus recetas, planes de
                            comidas y herramientas personalizadas de Cook&Plan.
                        </p>
                    </div>

                    {/* Formulario */}
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-xl font-semibold text-dark mb-6">
                            Iniciar sesión
                        </h2>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Campo email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-dark mb-1"
                                >
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            {/* Campo contraseña */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-dark mb-1"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Restablecer contraseña */}
                            <div className="flex items-center justify-between">
                                <Link
                                    to="/recuperar-password"
                                    className="text-sm text-primary hover:underline"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            {/* Botón submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading
                                    ? "Iniciando sesión..."
                                    : "Iniciar sesión"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    o
                                </span>
                            </div>
                        </div>

                        {/* Enlace a registro */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            ¿No tienes cuenta?{" "}
                            <Link
                                to="/registro"
                                className="text-primary font-medium hover:underline"
                            >
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-cream py-8 px-4 mt-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
                        {/* Inicio */}
                        <div>
                            <h3 className="font-semibold text-dark mb-2">
                                Inicio
                            </h3>
                            <ul className="space-y-1 text-gray-600">
                                <li>
                                    <Link to="/recetas">Sobre nosotros</Link>
                                </li>
                                <li>
                                    <Link to="/contacto">Contacto</Link>
                                </li>
                                <li>
                                    <Link to="/privacidad">Privacidad</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="font-semibold text-dark mb-2">
                                Legal
                            </h3>
                            <ul className="space-y-1 text-gray-600">
                                <li>
                                    <Link to="/terminos">Términos</Link>
                                </li>
                                <li>
                                    <Link to="/licencia">Licencia</Link>
                                </li>
                                <li>
                                    <Link to="/cookies">Cookies</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h3 className="font-semibold text-dark mb-2">
                                Social
                            </h3>
                            <ul className="space-y-1 text-gray-600">
                                <li>
                                    <a href="#">Twitter</a>
                                </li>
                                <li>
                                    <a href="#">Instagram</a>
                                </li>
                                <li>
                                    <a href="#">Facebook</a>
                                </li>
                            </ul>
                        </div>

                        {/* Cook&Plan */}
                        <div>
                            <h3 className="font-semibold text-dark mb-2">
                                Cook&Plan
                            </h3>
                            <p className="text-gray-600 text-xs">
                                2025 Cook&Plan - Todos los derechos reservados
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
