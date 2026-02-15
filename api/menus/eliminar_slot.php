<?php
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

    if (empty($data->dia) || empty($data->comida)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Faltan campos obligatorios"]);
        exit();
    }

    $database = new Database();
    $db = $database->getConnection();

    // Preparamos una consulta SQL para eliminar el slot del menú del usuario autenticado, especificando el día y la comida (desayuno, almuerzo, cena):
    $stmt = $db->prepare(
        "DELETE mr FROM menu_receta mr
        JOIN menus m ON mr.id_menu = m.id_menu
        WHERE m.id_usuario = ? AND mr.dia = ? AND mr.comida = ?"
    );
    $stmt->bind_param('iss', $_SESSION['user_id'], $data->dia, $data->comida); // Vinculamos los parámetros a la consulta SQL: el ID del usuario autenticado, el día y la comida.
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Slot eliminado"]); // Devolvemos un mensaje de éxito en formato JSON.

    $db->close();
?>