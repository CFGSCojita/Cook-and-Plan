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

    $id_receta = $_GET['id'] ?? null; // Obtenemos el ID de la receta desde los parámetros de la URL. Si no se proporciona, asignamos null.

    // Estructura de control 'if'.
    // Si el ID de la receta no se proporciona, devolvemos un código de estado.
    if (!$id_receta) {
        http_response_code(400); // Respuesta: Solicitud incorrecta.
        echo json_encode(["success" => false, "message" => "ID de receta requerido"]);
        exit(); // Salimos del script.
    }

    $database = new Database(); // Creamos una nueva instancia de la clase 'Database'.
    $db = $database->getConnection(); // Obtenemos la conexión a la base de datos.

    // Realizamos la consulta SQL para obtener los detalles de la receta específica del usuario autenticado:
    $sql = "SELECT * FROM recetas WHERE id_receta = ? AND id_usuario = ?";

    $stmt = $db->prepare($sql); // Preparamos la consulta SQL.
    $stmt->bind_param('ii', $id_receta, $_SESSION['user_id']); // Vinculamos el ID de la receta y el ID del usuario autenticado a la consulta SQL.
    $stmt->execute(); // Ejecutamos la consulta SQL.
    $result = $stmt->get_result(); // Obtenemos el resultado de la consulta SQL.

    // Estructura de control 'if'.
    // Si no se encuentra la receta, devolvemos un código de estado 404 (No encontrado) y un mensaje de error en formato JSON.
    // En caso contrario, devolvemos los detalles de la receta en formato JSON:
    if ($result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Receta no encontrada"]);
    } else {
        echo json_encode(["success" => true, "receta" => $result->fetch_assoc()]);
    }

    $stmt->close(); // Cerramos la declaración preparada.
    $db->close(); // Cerramos la conexión a la base de datos.
?>