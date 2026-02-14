// Importación de dependencias y componentes necesarios para el funcionamiento de la página de recetas:
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getRecetas,
    crearRecetas,
    actualizarRecetas,
    eliminarRecetas,
} from "../../services/recipeService";
import RecetaCard from "./RecetaCard";
import RecetaModal from "./RecetaModal";

export default function Recetas() {

    const navigate = useNavigate(); // Declaramos un hook de navegación para poder redirigir al usuario a otras páginas dentro de la aplicación.

    // Declaración de variables de estado:
    const [lista, setLista] = useState([]);
    const [modal, setModal] = useState(null);
    const [confirmarEliminar, setConfirmarEliminar] = useState(null);

    // useEffect para cargar las recetas al montar el componente. 
    // Dentro del useEffect, definimos una función asíncrona llamada load que llama a getRecetas para obtener la lista de recetas desde el backend. 
    // Luego, actualizamos el estado lista con los datos obtenidos. El useEffect se ejecuta solo una vez al montar el componente, ya que no tiene dependencias:
    useEffect(() => {
        async function load() {
            const resultado = await getRecetas();
            setLista(resultado?.recetas ?? []);
        }
        load();
    }, []);

    // Creamos una función asíncrona para manejar la eliminación de recetas:
    async function handleEliminar(id) {
        await eliminarRecetas(id)
        setConfirmarEliminar(null);
        const resultado = await getRecetas(); // Volvemos a cargar la lista de recetas para reflejar los cambios después de la eliminación.
        setLista(resultado?.recetas ?? []); // Actualizamos el estado lista con los datos obtenidos, asegurándonos de manejar el caso en que resultado.recetas sea undefined.
    }

    // Creamos una función asíncrona para manejar el envío del formulario de creación o edición de recetas:
    async function handleEnviar(formData) {
        // Estructura de control 'if'.
        // Si el modo del modal es "edit", llamamos a la función actualizarRecetas, pasando un objeto que contiene los datos del formulario junto con el ID de la receta que estamos editando (obtenido de modal.data.id_receta).
        // Si el modo no es "edit" (es decir, es "create"), llamamos a la función crearRecetas, pasando solo los datos del formulario.
        if (modal.mode === "edit") {
            await actualizarRecetas({
                ...formData,
                id_receta: modal.data.id_receta,
            });
        } else {
            await crearRecetas(formData);
        }
        setModal(null);
        const resultado = await getRecetas();
        setLista(resultado?.recetas ?? []); // Actualizamos el estado lista con los datos obtenidos, asegurándonos de manejar el caso en que resultado.recetas sea undefined.
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-dark">Mis Recetas</h1>
                <button
                    onClick={() => setModal({ mode: "create" })}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90"
                >
                    + Nueva Receta
                </button>
            </header>

            {/* Si la lista de recetas está vacía, mostramos un mensaje indicando que no hay recetas disponibles. De lo contrario, mostramos las tarjetas de las recetas: */}
            {lista.length === 0 ? (
                <p className="text-gray-500 italic text-center py-10">
                    No hay recetas disponibles.
                </p>
            ) : (
                <div className="grid gap-4">
                    {lista.map((r) => (
                        <RecetaCard
                            key={r.id_receta}
                            recipe={r}
                            onView={() => setModal({ mode: "view", data: r })}
                            onEdit={() => setModal({ mode: "edit", data: r })}
                            onDelete={() => setConfirmarEliminar(r.id_receta)}
                        />
                    ))}
                </div>
            )}

            {/* Botón volver al final */}
            <div className="flex justify-start mt-8">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                >
                    <span>&larr;</span>
                    <span>Volver</span>
                </button>
            </div>

            {/* Modales */}
            {modal && (
                <RecetaModal
                    mode={modal.mode}
                    data={modal.data}
                    onClose={() => setModal(null)}
                    onSubmit={handleEnviar}
                />
            )}

            {/* Confirmación de eliminación */}
            {confirmarEliminar && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
                        <p className="text-dark font-semibold mb-6">
                            &iquest;Est&aacute;s seguro de que quieres eliminar
                            esta receta?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleEliminar(confirmarEliminar)}
                                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={() => setConfirmarEliminar(null)}
                                className="flex-1 border py-2 rounded hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
