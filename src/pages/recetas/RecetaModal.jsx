import { useState } from 'react';

export default function RecetaModal({ mode, data, onClose, onSubmit }) {

    // Declaración de variables de estado. Usamos el operador de coalescencia nula (??) para asignar valores por defecto en caso de que los datos de las recetas sean undefined.
    const [nombre, setNombre] = useState(data?.nombre ?? '');
    const [descripcion, setDescripcion] = useState(data?.descripcion ?? '');
    const [ingredientes, setIngredientes] = useState(data?.ingredientes ?? '');
    const [pasos, setPasos] = useState(data?.pasos ?? '');
    const [tiempo_preparacion, setTiempo_preparacion] = useState(data?.tiempo_preparacion ?? '');
    const [porciones, setPorciones] = useState(data?.porciones ?? '');

    // Creamos una función flecha para manejar el envío del formulario. 
    // Esta función previene el comportamiento por defecto del formulario (que es recargar la página) y luego llama a la función onSubmit, pasando un objeto con los datos de la receta:
    const manejarEnvio = (e) => {
        e.preventDefault();
        onSubmit({ nombre, descripcion, ingredientes, pasos, tiempo_preparacion, porciones });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                    {/* Si el modo es 'view', mostramos 'Detalles de Receta'. Si es 'edit', mostramos 'Editar Receta'. En caso contrario, mostramos 'Añade una Receta': */}
                    {mode === 'view' ? 'Detalles de Receta' : mode === 'edit' ? 'Editar Receta' : 'Añade una Receta'} 
                </h2>

                {/* Si el modo es 'view', mostramos los detalles de la receta. De lo contrario, mostramos el formulario para crear o editar una receta: */}
                {mode === 'view' ? (
                    <div className="space-y-2 text-sm">
                        <p><strong>Nombre:</strong> {data.nombre}</p>
                        <p><strong>Descripción:</strong> {data.descripcion || '—'}</p>
                        <p><strong>Ingredientes:</strong></p>
                        <p className="whitespace-pre-line">{data.ingredientes}</p>
                        <p><strong>Pasos:</strong></p>
                        <p className="whitespace-pre-line">{data.pasos || '—'}</p>
                        <p><strong>Tiempo de preparación:</strong> {data.tiempo_preparacion ? `${data.tiempo_preparacion} min` : '—'}</p>
                        <p><strong>Porciones:</strong> {data.porciones || '—'}</p>
                        <button onClick={onClose} className="w-full bg-gray-200 py-2 rounded mt-4">Cerrar</button>
                    </div>
                ) : (
                    <form onSubmit={manejarEnvio} className="flex flex-col gap-3">
                        <input placeholder="Nombre *" value={nombre} onChange={(e) => setNombre(e.target.value)} className="border p-2 rounded" required />
                        <input placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="border p-2 rounded" />
                        <textarea placeholder="Ingredientes *" value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} className="border p-2 rounded" rows="3" required />
                        <textarea placeholder="Pasos" value={pasos} onChange={(e) => setPasos(e.target.value)} className="border p-2 rounded" rows="3" />
                        <input placeholder="Tiempo de preparación (min)" type="number" value={tiempo_preparacion} onChange={(e) => setTiempo_preparacion(e.target.value)} className="border p-2 rounded" />
                        <input placeholder="Porciones" type="number" value={porciones} onChange={(e) => setPorciones(e.target.value)} className="border p-2 rounded" />
                        <div className="flex gap-2 mt-2">
                            <button type="submit" className="flex-1 bg-primary text-white py-2 rounded">Guardar</button>
                            <button type="button" onClick={onClose} className="flex-1 border py-2 rounded">Cancelar</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}