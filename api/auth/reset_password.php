<?php
    // Incluimos configuración CORS y BD
    include_once '../config/cors.php';
    include_once '../config/db_connect.php';

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["success" => false, "message" => "Método no permitido."]);
        exit();
    }

    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->email) || empty($data->password)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Email y contraseña son obligatorios."]);
        exit();
    }

    $email = trim($data->email);
    $password = $data->password;

    // Estructura de control 'if'.
    // Si la contraseña es menor a 6 caracteres, lo indicamos.
    if (strlen($password) < 6) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "La contraseña debe tener al menos 6 caracteres."]);
        exit();
    }

    $database = new Database();
    $db = $database->getConnection();

    // Preparamos una consulta para verificar si el email existe en la base de datos.
    $check = $db->prepare("SELECT id_usuario FROM usuarios WHERE email = ? LIMIT 1");

    $check->bind_param('s', $email); // Vinculamos el parámetro email a la consulta preparada.
    $check->execute(); 
    $check->store_result();

    // Estructura de control 'if'.
    // Si no se encuentra ningún usuario con ese email, se lo avisamos al usuario.
    if ($check->num_rows === 0) {
        $check->close();
        $db->close();
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "No existe ninguna cuenta con ese email."]);
        exit();
    }

    $check->close(); 

    $hash = password_hash($password, PASSWORD_BCRYPT);

    // Preparamos otra consulta para actualizar la contraseña del usuario con el email proporcionado:
    $stmt = $db->prepare("UPDATE usuarios SET password_hash = ? WHERE email = ?");

    $stmt->bind_param('ss', $hash, $email); // Vinculamos los parámetros hash y email a la consulta preparada.

    // Estructura de control 'if'.
    // Si la consulta se ejecuta correctamente, indicamos que la contraseña se actualizó. Si no, indicamos que hubo un error.
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Contraseña actualizada correctamente."]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error al actualizar la contraseña."]);
    }

    $stmt->close();
    $db->close();
?>