import { Link } from "react-router-dom";

export default function ConsideracionesDemo() {
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
                <h1 className="text-3xl font-bold text-dark mb-6">Consideraciones de la demo</h1>
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-4 text-gray-700">
                    <p>
                        Esta versión es una <strong>demostración académica</strong> de Cook&Plan y
                        no representa el producto final. Está diseñada para mostrar las funcionalidades
                        base del proyecto de fin de grado.
                    </p>
                    <p>Aspectos a tener en cuenta:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Los datos introducidos pueden eliminarse sin previo aviso.</li>
                        <li>No se garantiza disponibilidad continua del servicio.</li>
                        <li>Puede contener errores o comportamientos inesperados.</li>
                    </ul>
                    <p>Funcionalidades previstas para el producto final:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Lista de la compra automática a partir del menú semanal.</li>
                        <li>Filtros y búsqueda avanzada de recetas.</li>
                        <li>Gestión de macronutrientes y valores nutricionales.</li>
                        <li>Etiquetas y categorías para las recetas.</li>
                        <li>Sistema de roles de usuario.</li>
                        <li>Versión móvil optimizada.</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}