// Importaciones de React y servicios para obtener recetas y manejar el menú:
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRecetas } from "../../services/recipeService";
import { getMenu, guardarSlot, eliminarSlot } from "../../services/menuService";

// Declaración de variables.
const DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const COMIDAS = ["desayuno", "comida", "cena"];

export default function Menu() {

    const navigate = useNavigate(); // Declaramos un hook de navegación para poder redirigir al usuario a otras páginas dentro de la aplicación.

    // Declaración de variables de estado.
    const [menu, setMenu] = useState({});
    const [recetas, setRecetas] = useState([]);

    // useEffect para cargar el menú y las recetas al montar el componente.
    useEffect(() => {
        getMenu().then(data => data && setMenu(data.menu));
        getRecetas().then(data => data && setRecetas(data.recetas));
    }, []);

    // Creamos una función asincrónica para manejar la selección de recetas en el menú.
    async function handleSeleccionar(dia, comida, id_receta) {
        // Si no hay una receta seleccionada, eliminamos el slot del menú y actualizamos el estado.
        // En caso de que sí haya una receta seleccionada, guardamos el slot en el menú y actualizamos el estado con la nueva receta.
        if (!id_receta) {
            await eliminarSlot(dia, comida);
            
            // Actualizamos el estado del menú eliminando el slot correspondiente:
            setMenu(prev => {
                const updated = { ...prev };
                if (updated[dia]) delete updated[dia][comida];
                return updated;
            });
        } else {
            await guardarSlot(id_receta, dia, comida);
            const receta = recetas.find(r => r.id_receta == id_receta); // Buscamos la receta seleccionada en la lista de recetas para obtener su nombre.

            // Actualizamos el estado del menú agregando o actualizando el slot correspondiente con la nueva receta:
            setMenu(prev => ({
                ...prev,
                [dia]: { ...prev[dia], [comida]: { id_receta, nombre: receta.nombre } }
            }));
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-[#5D4037] mb-6">Menú semanal</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-3 bg-[#5D4037] text-[#F5E6D3] rounded-tl-lg"></th>
                            {/* Mapeamos los días de la semana para crear las columnas del menú: */}
                            {DIAS.map(dia => (
                                <th key={dia} className="p-3 bg-[#5D4037] text-[#F5E6D3] capitalize">
                                    {dia}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapea las comidas para crear las filas del menú: */}
                        {COMIDAS.map(comida => (
                            <tr key={comida}>
                                <td className="p-3 bg-[#F5E6D3] font-semibold text-[#5D4037] capitalize">
                                    {comida}
                                </td>
                                {/* Volvemos a mapear los días para crear las celdas de cada comida: */}
                                {DIAS.map(dia => {
                                    const slot = menu[dia]?.[comida];
                                    return (
                                        <td key={dia} className="p-2 border border-[#F5E6D3] bg-white">
                                            <select
                                                className="w-full text-sm p-1 rounded border border-gray-200 text-[#424242]"
                                                value={slot?.id_receta || ""}
                                                onChange={e => handleSeleccionar(dia, comida, e.target.value)}
                                            >
                                                <option value="">— Sin receta —</option>
                                                {/* Mapeamos las recetas disponibles para mostrarlas en el select: */}
                                                {recetas.map(r => (
                                                    <option key={r.id_receta} value={r.id_receta}>
                                                        {r.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Botón volver */}
            <div className="flex justify-start mt-8">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                >
                    <span>&larr;</span>
                    <span>Volver</span>
                </button>
            </div>

        </div>
    );
}