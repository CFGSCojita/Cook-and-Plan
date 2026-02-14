
const API_URL = 'http://localhost/student006/cook-and-plan/api'; // Declaramos una variable con la ruta hasta la carpeta API.

/* 

Creamos una función asíncrona por cada operación que necesitaremos: 'getRecetas()' para obtener las recetas, 'crearRecetas()' para crearlas,'actualizarRecetas()' para 
actualizarlas, 'eliminarRecetas()' para eliminarlas y 'getRecetaPorId()' para ver su detalle. El parámetro 'recipeData' se usa para representar los datos de la receta. 
El parámetro 'id' para pasarle el ID y poder identificar cuál es la receta la cuál queremos ver el detalle.

Dentro de cada función aparte de si es POST añadir el cuerpo con los datos de la receta, comprobamos si la respuesta del servidor indica éxito (data.success), y si no,
lanzaremos un error.

Hago este comentario génerico porqué como realmente la mayoría de funciones son muy similares, los comentarios serían bastante "repetitivos". En esencia todo es muy
similar, solo cambian los parámetros de las funciones y el 'body' del 'response' si es GET o POST. 

*/

async function getRecetas() {
    try {
        const response = await fetch(`${API_URL}/recetas/listar.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (e) {
        console.log("Se ha producido un error obteniendo las recetas: " + e.message);
    }
}

async function crearRecetas(recipeData) {
    try {
        const response = await fetch(`${API_URL}/recetas/crear.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(recipeData)
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (e) {
        console.log("Se ha producido un error creando las recetas: " + e.message);
    }
}

async function actualizarRecetas(recipeData) {
    try {
        const response = await fetch(`${API_URL}/recetas/actualizar.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(recipeData)
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (e) {
        console.log("Se ha producido un error actualizando las recetas: " + e.message);
    }
}

async function eliminarRecetas(id) {
    try {
        const response = await fetch(`${API_URL}/recetas/eliminar.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id_receta: id })
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (e) {
        console.log("Se ha producido un error eliminando las recetas: " + e.message);
    }
}

async function getRecetaPorId(id) {
    try {
        const response = await fetch(`${API_URL}/recetas/detalle.php?id=${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (e) {
        console.log("Se ha producido un error obteniendo el detalle de las recetas: " + e.message);
    }
}

export { getRecetas, crearRecetas, actualizarRecetas, eliminarRecetas, getRecetaPorId }; // Exportamos las funciones para poder usarlas en otros archivos.
