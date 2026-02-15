// Importación de dependencias y contextos necesarios:
import logo from "../assets/img/logo-cook_plan.webp";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// Componente principal de Login:
export default function Login() {
    const { login } = useContext(AuthContext); // Obtenemos la función de login desde el contexto de autenticación.

    // Declaramos un useState para manejar los datos del formulario, errores y estado de carga:
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(""); // Estado para manejar mensajes de error.
    const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga.

    // Creamos un manejador de cambios en los campos del formulario:
    const handleChange = (e) => {
        const { name, value } = e.target; // Extraemos el nombre y valor del campo modificado.

        // Actualizamos el estado del formulario con el nuevo valor:
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Creamos otro manejador para el envío del formulario:
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario.
        setError(""); // Reseteamos cualquier error previo.
        setLoading(true); // Indicamos que el proceso de login ha comenzado.

        // Estructura 'try-catch'.
        // Intentará ejecutar el login y capturará cualquier error que ocurra:
        try {
            const data = await login(formData.email, formData.password); // Llamamos a la función de login con los datos del formulario.

            // Estructura de control 'if'.
            // Si el login no fue exitoso, mostramos un mensaje de error:
            if (!data.success) {
                setError(data.message || "Error al iniciar sesión");
            }
        } catch (err) {
            setError("Error de conexión. Intenta de nuevo."); // Mensaje genérico de error en caso de fallo en la conexión.
            console.error("Login error:", err); // Logueamos el error en la consola para depuración.
        } finally {
            setLoading(false); // Indicamos que el proceso de login ha finalizado.
        }
    };

    // El componente renderiza una pantalla de login centrada sin footer,
    // ya que es una pantalla de autenticación que debe ser limpia y enfocada:
    return (
        <div className="min-h-screen bg-light flex flex-col">
            {/* Header simple */}
            <header className="py-6 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        <img src={logo} alt="Cook&Plan" className="h-24 w-auto" />
                    </Link>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-xl font-semibold text-dark mb-6">
                            Iniciar sesión
                        </h2>

                        {/* Mostramos el mensaje de error si existe */}
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
                                />
                            </div>

                            {/* Enlace para recuperar contraseña */}
                            <div className="flex items-center justify-between">
                                <Link
                                    to="/restablecer-password"
                                    className="text-sm text-primary hover:underline"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            {/* Botón de envío, deshabilitado mientras carga */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                            </button>
                        </form>

                        {/* Divider visual entre el formulario y el enlace de registro */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">o</span>
                            </div>
                        </div>

                        {/* Enlace a registro para usuarios sin cuenta */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            ¿No tienes cuenta?{" "}
                            <Link
                                to="/register"
                                className="text-primary font-medium hover:underline"
                            >
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}