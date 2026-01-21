<?php
    // Incluimos configuración CORS y BD
    include_once '../config/cors.php';
    include_once '../config/db_connect.php';

    // Iniciamos sesión
    session_start();

    // Solo permitimos método POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode([
            "success" => false,
            "message" => "Método no permitido. Usa POST."
        ]);
        exit();
    }

    // Obtenemos datos del body JSON
    $data = json_decode(file_get_contents("php://input"));

    // Validamos que existan los campos requeridos
    if (empty($data->email) || empty($data->password)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Email y contraseña son obligatorios."
        ]);
        exit();
    }

    $email = trim($data->email);
    $password = $data->password;

    // Conectamos a la BD
    $database = new Database();
    $db = $database->getConnection();

    // Buscamos el usuario por email a través de una consulta preparada.
    $query = "SELECT id_usuario, nombre, email, password_hash FROM usuarios WHERE email = ? LIMIT 1";
    $stmt = $db->prepare($query); // Preparamos la consulta.
    
    // Estructura de control 'if'.
    // Verificamos que la preparación fue exitosa
    if (!$stmt) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error al preparar la consulta.",
            "error" => $db->error
        ]);
        exit();
    }
    
    $stmt->bind_param('s', $email); // Vinculamos el parámetro (s = string).
    $stmt->execute(); // Ejecutamos la consulta.
    $result = $stmt->get_result(); // Obtenemos el resultado.
    
    // Estructura de control 'if'.
    // Verificamos si se encontró el usuario.
    if ($result->num_rows === 0) {
        $stmt->close();
        $db->close();
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Credenciales incorrectas."
        ]);
        exit();
    }
    
    $user = $result->fetch_assoc(); // Obtenemos los datos del usuario.
    $stmt->close(); // Cerramos el statement.
    
    // Verificamos la contraseña
    if (!password_verify($password, $user['password_hash'])) {
        $db->close();
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Credenciales incorrectas."
        ]);
        exit();
    }
    
    // Iniciamos sesión del usuario
    $_SESSION['user_id'] = $user['id_usuario'];
    $_SESSION['user_name'] = $user['nombre'];
    $_SESSION['user_email'] = $user['email'];
    
    $db->close(); // Cerramos la conexión.
    
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Inicio de sesión exitoso.",
        "user" => [
            "id_usuario" => $user['id_usuario'],
            "nombre" => $user['nombre'],
            "email" => $user['email']
        ]
    ]);
?>