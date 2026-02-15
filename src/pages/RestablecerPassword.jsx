// Importamos el logo y los hooks necesarios:
import logo from "../assets/img/logo-cook_plan.webp";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {

    const navigate = useNavigate(); // Declaramos el hook para redireccionar después del éxito.

    // Declaración de variables de estado.
    const [formData, setFormData] = useState({ email: "", password: "", confirm: "" });
    const [error, setError]     = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Declaramos una función flecha para manejar los cambios en los campos del formulario.
    const handleCambiar = (e) => {
        const { name, value } = e.target; // Extraemos el nombre y valor del campo que se ha modificado.
        setFormData((prev) => ({ ...prev, [name]: value })); // Actualizamos el estado del formulario con el nuevo valor, manteniendo los demás campos sin cambios.
    };

    // Declaramos otra función flecha para manejar el envío del formulario:
    const handleEnviar = async (e) => {
        e.preventDefault();
        setError("");

        // Estructura de control 'if'.
        // Si las contraseñas no coinciden, se lo avisamos al usuario.
        if (formData.password !== formData.confirm) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);

        // Bloque 'try-catch'.
        // Intentará hacer el fetch a la API para restablecer la contraseña. Si hay un error de conexión, se lo avisará al usuario.
        try {
            const res = await fetch(
                "http://localhost/student006/cook-and-plan/api/auth/reset_password.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: formData.email, password: formData.password }),
                }
            );
            const data = await res.json();

            if (data.success) {
                setSuccess("Contraseña actualizada. Redirigiendo...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError(data.message || "Error al restablecer la contraseña.");
            }

        } catch {
            setError("Error de conexión. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="py-6 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        <img src={logo} alt="Cook&Plan" className="h-24 w-auto" />
                    </Link>
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="bg-white rounded-xl shadow-md w-full max-w-sm p-8">
                    <h1 className="text-xl font-semibold text-dark text-center mb-6">
                        Restablecer contraseña
                    </h1>

                    {error   && <p className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
                    {success && <p className="mb-4 text-sm text-green-600 bg-green-50 p-3 rounded-md">{success}</p>}

                    <form onSubmit={handleEnviar} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-dark mb-1">
                                Correo electrónico
                            </label>
                            <input
                                type="email" name="email" value={formData.email}
                                onChange={handleCambiar} required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark mb-1">
                                Nueva contraseña
                            </label>
                            <input
                                type="password" name="password" value={formData.password}
                                onChange={handleCambiar} required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark mb-1">
                                Repetir contraseña
                            </label>
                            <input
                                type="password" name="confirm" value={formData.confirm}
                                onChange={handleCambiar} required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-primary text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
                        >
                            {loading ? "Actualizando..." : "Restablecer contraseña"}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        <Link to="/login" className="text-primary hover:underline">
                            Volver al login
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}