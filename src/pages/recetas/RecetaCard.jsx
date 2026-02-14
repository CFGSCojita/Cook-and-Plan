
export default function RecetaCard({ recipe, onView, onEdit, onDelete }) {
    return (
        // Dibujamos la tarjeta de receta con Tailwind CSS, mostrando el nombre, descripción, tiempo de preparación y porciones:
        <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-dark mb-1 truncate">{recipe.nombre}</h3>
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">{recipe.descripcion || 'Sin descripción'}</p>
            <div className="flex gap-2 text-xs text-gray-400 mb-3">
                {recipe.tiempo_preparacion && <span>⏱ {recipe.tiempo_preparacion} min</span>}
                {recipe.porciones && <span>🍽 {recipe.porciones} porciones</span>}
            </div>
            <div className="flex gap-2">
                <button onClick={onView}   className="flex-1 text-sm border border-primary text-primary py-1 rounded-md hover:bg-primary/10">Ver</button>
                <button onClick={onEdit}   className="flex-1 text-sm border border-gray-300 py-1 rounded-md hover:bg-gray-50">Editar</button>
                <button onClick={onDelete} className="flex-1 text-sm border border-red-300 text-red-500 py-1 rounded-md hover:bg-red-50">Eliminar</button>
            </div>
        </div>
    );
}