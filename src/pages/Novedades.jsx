import { Link } from "react-router-dom";

export default function Novedades() {
    return (
        <div className="min-h-screen bg-light">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/dashboard" className="text-primary font-semibold hover:underline">
                        ← Volver al Dashboard
                    </Link>
                </div>
            </header>
            <main className="max-w-3xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-dark mb-6">Notas sobre las últimas novedades</h1>
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-4 text-gray-700">
                    <p>Estas son las funcionalidades implementadas en la versión demo de Cook&Plan:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Registro e inicio de sesión con contraseñas encriptadas (bcrypt).</li>
                        <li>Recuperación de contraseña por token temporal.</li>
                        <li>Sistema de sesiones seguro con PHP.</li>
                        <li>Dashboard principal con acceso a los módulos disponibles.</li>
                        <li>Gestión completa de recetas: crear, editar, eliminar y visualizar.</li>
                        <li>Planificador semanal de menús: asignar recetas por día y comida.</li>
                        <li>Persistencia de menús en base de datos por usuario.</li>
                        <li>Diseño responsive con identidad visual propia (Cook&Plan).</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}