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

    $data = json_decode(file_get_contents("php://input")); // Obtenemos los datos enviados en el cuerpo de la solicitud y los decodificamos desde JSON.

    // Estructura de control 'if'.
    // Si el ID de la receta está vacío, devolvemos un código de estado 400 (Solicitud incorrecta) y un mensaje de error en formato JSON.
    // En caso contrario, continuamos con la ejecución del script:
    if (empty($data->id_receta)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "ID de receta requerido"]);
        exit();
    }

    $database = new Database(); // Creamos una nueva instancia de la clase 'Database'.
    $db = $database->getConnection(); // Obtenemos la conexión a la base de datos.

    // Realizamos la consulta SQL para eliminar la receta de la base de datos:
    $sql = "DELETE FROM recetas WHERE id_receta = ? AND id_usuario = ?";

    $stmt = $db->prepare($sql); // Preparamos la consulta SQL.
    $stmt->bind_param('ii', $data->id_receta, $_SESSION['user_id']); // Vinculamos el ID de la receta y el ID del usuario autenticado a la consulta SQL.

    // Estructura de control 'if'.
    // Si la ejecución de la consulta SQL es exitosa y se afecta al menos una fila, devolvemos un mensaje de éxito en formato JSON.
    // En caso contrario, devolvemos un código de estado 404 (No encontrado) y
    // un mensaje de error en formato JSON indicando que la receta no se encontró:
    if ($stmt->execute() && $stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Receta eliminada"]);
    } else {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Receta no encontrada"]);
    }

    $stmt->close(); // Cerramos la declaración preparada.
    $db->close(); // Cerramos la conexión a la base de datos.
?>