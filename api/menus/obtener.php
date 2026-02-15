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

    $database = new Database();
    $db = $database->getConnection();

    // Preparamos una consulta SQL para obtener el menú del usuario autenticado, incluyendo el día, la comida (desayuno, almuerzo, cena), el ID de la receta y el nombre de la receta:
    $stmt = $db->prepare(
        "SELECT mr.dia, mr.comida, r.id_receta, r.nombre
        FROM menus m
        JOIN menu_receta mr ON m.id_menu = mr.id_menu
        JOIN recetas r ON mr.id_receta = r.id_receta
        WHERE m.id_usuario = ?"
    );
    $stmt->bind_param('i', $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();

    $menu = []; // Inicializamos un array vacío para almacenar el menú.

    // Bucle 'while'.
    // Mientras haya filas en el resultado de la consulta, las procesamos y las organizamos en un array donde la clave es el día y la comida, 
    // y el valor es un array con el ID de la receta y su nombre:
    while ($row = $result->fetch_assoc()) {
        $menu[$row['dia']][$row['comida']] = [
            'id_receta' => $row['id_receta'],
            'nombre'    => $row['nombre']
        ];
    }

    echo json_encode(["success" => true, "menu" => $menu]); // Devolvemos el menú en formato JSON con un mensaje de éxito.

    $db->close(); // Cerramos la conexión a la base de datos.
?>