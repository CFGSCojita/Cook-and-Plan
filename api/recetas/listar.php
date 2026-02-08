<?php
    // Incluimos el cors, la conexión a la base de datos y el middleware de autenticación:
    include_once '../config/cors.php';
    include_once '../config/db_connect.php';
    include_once '../middleware/auth.php';

    requireAuth(); // Llamamos a la función 'requireAuth()' que hemos creado en 'auth.php' para que el usuario deba autenticarse antes de usar este endpoint.

    // Estructura de control 'if'.
    // Si el método de la solicitud no es 'POST', devolvemos un código de estado 405 (Método no permitido) y un mensaje de error en formato JSON.
    // En caso contrario, continuamos con la ejecución del script:
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405); // Respuesta: Método no permitido.
        echo json_encode(["success" => false, "message" => "Método no permitido"]); // Convertimos el mensaje de error en formato JSON.
        exit(); // Salimos del script.
    }

    $database = new Database(); // Creamos una nueva instancia de la clase 'Database'.
    $db = $database->getConnection(); // Obtenemos la conexión a la base de datos.

    // Realizamos una consulta SQL para seleccionar las recetas del usuario autenticado, ordenadas por fecha de creación de forma descendente:
    $sql = "SELECT id_receta, nombre, descripcion, tiempo_preparacion, porciones, created_at 
            FROM recetas 
            WHERE id_usuario = ? 
            ORDER BY created_at DESC";
    $stmt = $db->prepare($sql); // Preparamos la consulta SQL.
    $stmt->bind_param('i', $_SESSION['user_id']); // Vinculamos el ID del usuario autenticado a la consulta SQL.
    $stmt->execute(); // Ejecutamos la consulta SQL.
    $result = $stmt->get_result(); // Obtenemos el resultado de la consulta SQL.

    $recetas = []; // Creamos un array vacío para almacenar las recetas.

    // Bucle 'while'.
    // Mientras haya filas en el resultado de la consulta SQL, las agregamos al array de recetas:
    while ($fila = $result->fetch_assoc()) {
        $recetas[] = $fila;
    }

    echo json_encode(["success" => true, "recetas" => $recetas]); // Convertimos el array de recetas en formato JSON y lo enviamos como respuesta.

    $stmt->close(); // Cerramos la declaración preparada.
    $db->close(); // Cerramos la conexión a la base de datos.
?>