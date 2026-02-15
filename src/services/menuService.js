
const API_URL = 'http://localhost/student006/cook-and-plan/api'; // Declaramos una variable con la ruta hasta la carpeta API.

/*

Fichero bastante similar al 'recipeServices.js'. La única diferencia es que guardarSlot y eliminarSlot reciben los parámetros directamente en lugar de un objeto.

*/

async function getMenu() {
    try {
        const response = await fetch(`${API_URL}/menus/obtener.php`, {
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
        console.log("Error obteniendo el menú: " + e.message);
    }
}

async function guardarSlot(id_receta, dia, comida) {
    try {
        const response = await fetch(`${API_URL}/menus/guardar.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id_receta, dia, comida })
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (e) {
        console.log("Error guardando slot: " + e.message);
    }
}

async function eliminarSlot(dia, comida) {
    try {
        const response = await fetch(`${API_URL}/menus/eliminar_slot.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ dia, comida })
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (e) {
        console.log("Error eliminando slot: " + e.message);
    }
}

export { getMenu, guardarSlot, eliminarSlot }; // Exportamos las funciones para que puedan ser utilizadas en otros módulos