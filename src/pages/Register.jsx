// Importamos el hook useState para manejar el estado del formulario, Link para navegación y useNavigate para redireccionar después del registro:
import logo from "../assets/img/logo-cook_plan.webp";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate(); // Declaramos un hook para redireccionar a otra página después del registro exitoso.

    // Declaración de variables de estado.
    const [formData, setFormData] = useState({ nombre: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Creamos una función flecha para manejar los cambios en los campos del formulario.
    const handleCambiar = (e) => {
        const { name, value } = e.target; // Obtenemos el nombre del campo y su valor desde el evento de cambio.

        setFormData((prev) => ({ ...prev, [name]: value })); // Actualizamos el estado del formulario, manteniendo los valores anteriores y actualizando solo el campo que cambió.
    };

    // Creamos una función flecha para manejar el envío del formulario.
    const handleEnviar = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Bloque 'try-catch'.
        // Intentará hacer un fetch a la API para registrar al usuario. 
        // Si hay un error de conexión o la respuesta no es exitosa, se capturará el error y se mostrará un mensaje de error.
        try {
            const response = await fetch(
                "http://localhost/student006/cook-and-plan/api/auth/register.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (data.success) {
                navigate("/login");
            } else {
                setError(data.message || "Error al registrarse.");
            }

        } catch (err) {
            setError("Error de conexión. Intenta de nuevo: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-light flex flex-col">
            <header className="py-6 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        <img src={logo} alt="Cook&Plan" className="h-24 w-auto" />
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-xl font-semibold text-dark mb-6">Crear cuenta</h2>

                        {/* Indicamos si hay un error al registrarse: */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleEnviar} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-dark mb-1">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleCambiar}
                                    required
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark mb-1">Correo electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleCambiar}
                                    required
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark mb-1">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleCambiar}
                                    required
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-primary"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
                            >
                                {loading ? "Registrando..." : "Crear cuenta"}
                            </button>
                        </form>

                        <p className="mt-4 text-center text-sm text-gray-500">
                            ¿Ya tienes cuenta?{" "}
                            <Link to="/login" className="text-accent font-medium hover:underline">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}