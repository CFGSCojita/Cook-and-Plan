<?php
    // Incluimos el cors, la conexión a la base de datos y el middleware de autenticación:
    include_once '../config/cors.php';
    include_once '../config/db_connect.php';
    include_once '../middleware/auth.php';

    requireAuth();

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["success" => false, "message" => "Método no permitido"]); 
        exit(); 
    }

    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->id_receta) || empty($data->dia) || empty($data->comida)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Faltan campos obligatorios"]);
        exit();
    }

    $database = new Database();
    $db = $database->getConnection();

    // Preparamos una consulta para verificar si el usuario ya tiene un menú semanal creado. Si no lo tiene, lo creamos automáticamente:
    $stmt = $db->prepare("SELECT id_menu FROM menus WHERE id_usuario = ? LIMIT 1");

    $stmt->bind_param('i', $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result(); // Obtenemos el resultado de la consulta SQL.

    // Estructura de control 'if'.
    // Si el número de filas del resultado es igual a 0, significa que el usuario no tiene un menú semanal creado, por lo que procedemos a crear uno nuevo. 
    // En caso contrario, obtenemos el ID del menú existente:
    if ($result->num_rows === 0) {
        // Preparamos una segunda consulta para insertar un nuevo menú semanal para el usuario:
        $stmt2 = $db->prepare("INSERT INTO menus (id_usuario, nombre) VALUES (?, 'Menú semanal')");

        $stmt2->bind_param('i', $_SESSION['user_id']); 
        $stmt2->execute(); 
        $id_menu = $db->insert_id; // Obtenemos el ID del menú recién creado utilizando la propiedad 'insert_id' de la conexión a la base de datos.
    } else {
        $id_menu = $result->fetch_assoc()['id_menu'];
    }

    // Preparamos una tercera consulta para eliminar cualquier receta que ya esté asignada al mismo día y comida en el menú del usuario, evitando así duplicados:
    $stmt3 = $db->prepare("DELETE FROM menu_receta WHERE id_menu = ? AND dia = ? AND comida = ?");

    $stmt3->bind_param('iss', $id_menu, $data->dia, $data->comida); // Vinculamos el ID del menú, el día y la comida a la consulta SQL.
    $stmt3->execute(); // Ejecutamos la consulta SQL para eliminar cualquier receta que ya esté asignada al mismo día y comida en el menú del usuario.


    // Preparamos una última consulta para insertar la nueva receta en el menú del usuario:
    $stmt4 = $db->prepare("INSERT INTO menu_receta (id_menu, id_receta, dia, comida) VALUES (?, ?, ?, ?)");
    $stmt4->bind_param('iiss', $id_menu, $data->id_receta, $data->dia, $data->comida); // Vinculamos el ID del menú, el ID de la receta, el día y la comida a la consulta SQL.
    $stmt4->execute(); // Ejecutamos la consulta SQL para insertar la nueva receta en el menú del usuario.

    echo json_encode(["success" => true, "message" => "Slot guardado"]); // Devolvemos una respuesta en formato JSON indicando que el slot se ha guardado correctamente.

    $db->close(); // Cerramos la conexión a la base de datos para liberar recursos.
?>