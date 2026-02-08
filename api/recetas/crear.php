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
    // Si el nombre o los ingredientes están vacíos, devolvemos un código de estado 400 (Solicitud incorrecta) y un mensaje de error en formato JSON.
    // En caso contrario, continuamos con la ejecución del script:
    if (empty($data->nombre) || empty($data->ingredientes)) {
        http_response_code(400); // Respuesta: Solicitud incorrecta.
        echo json_encode(["success" => false, "message" => "El nombre y los ingredientes son obligatorios"]); // Convertimos el mensaje de error en formato JSON.
        exit(); // Salimos del script.
    }

    // Asignamos los datos recibidos a variables.
    // Los '??' son operadores de fusión de null que asignan un valor predeterminado si la variable es null o no está definida:
    $id_usuario = $_SESSION['user_id'];
    $nombre = $data->nombre;
    $descripcion = $data->descripcion ?? '';
    $ingredientes = $data->ingredientes;
    $pasos = $data->pasos ?? '';
    $tiempo_preparacion = $data->tiempo_preparacion ?? null;
    $porciones = $data->porciones ?? 4;

    $database = new Database(); // Creamos una nueva instancia de la clase 'Database'.
    $db = $database->getConnection(); // Obtenemos la conexión a la base de datos.

    // Realizamos la consulta SQL para insertar una nueva receta en la base de datos:
    $query = "INSERT INTO recetas (id_usuario, nombre, descripcion, ingredientes, pasos, tiempo_preparacion, porciones) 
              VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $db->prepare($query); // Preparamos la consulta SQL.

    // Vinculamos los parámetros a la consulta SQL.
    // Usamos el método 'bind_param' para vincular los valores a los marcadores de posición en la consulta:
    $stmt->bind_param(
        'issssii',
        $id_usuario,
        $nombre,
        $descripcion,
        $ingredientes,
        $pasos,
        $tiempo_preparacion,
        $porciones
    );

    // Estructura de control 'if'.
    // Si la ejecución de la consulta SQL es exitosa, devolvemos un mensaje de éxito en formato JSON junto con el ID de la receta creada.
    // En caso contrario, devolvemos un código de estado 500 (Error interno del servidor) y un mensaje de error en formato JSON:
    if ($stmt->execute()) {
        // Respuesta: Receta creada exitosamente.
        echo json_encode([
            "success" => true,
            "message" => "Receta creada",
            "id_receta" => $db->insert_id
        ]);
    } else {
        http_response_code(500); // Respuesta: Error interno del servidor.
        echo json_encode(["success" => false, "message" => "Error al crear receta"]); // Convertimos el mensaje de error en formato JSON.
    }

    $stmt->close(); // Cerramos la declaración preparada.
    $db->close(); // Cerramos la conexión a la base de datos.
?>