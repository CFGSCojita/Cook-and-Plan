<?php
    // Incluimos configuración CORS y BD
    include_once '../config/cors.php';
    include_once '../config/db_connect.php';

    // Estructura de control 'if'.
    // Si el método HTTP no es POST, retornamos error 405 (Método no permitido)
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
    if (empty($data->nombre) || empty($data->email) || empty($data->password)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Faltan campos obligatorios (nombre, email, password)."
        ]);
        exit();
    }

    // Validaciones adicionales
    $nombre = trim($data->nombre);
    $email = trim($data->email);
    $password = $data->password;

    // Validamos el formato de email.
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "El formato del email no es válido."
        ]);
        exit();
    }

    // Validamos longitud de la contraseña (mínimo 6 caracteres)
    if (strlen($password) < 6) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "La contraseña debe tener al menos 6 caracteres."
        ]);
        exit();
    }

    // Conectamos a la BD
    $database = new Database();
    $db = $database->getConnection();

    // Verificamos si el email ya existe con una consulta preparada.
    $query = "SELECT id_usuario FROM usuarios WHERE email = ? LIMIT 1";
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
    $stmt->store_result(); // Almacenamos el resultado.
    
    // Estructura de control 'if'.
    // Si el email ya existe, retornamos error 409 (Conflicto)
    if ($stmt->num_rows > 0) {
        $stmt->close();
        http_response_code(409);
        echo json_encode([
            "success" => false,
            "message" => "El email ya está registrado."
        ]);
        exit();
    }
    
    $stmt->close(); // Cerramos el statement.
    
    // Hasheamos la contraseña
    $password_hash = password_hash($password, PASSWORD_BCRYPT);
    
    // Insertamos el nuevo usuario con una consulta preparada.
    $query = "INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)";
    $stmt = $db->prepare($query); // Preparamos la consulta.
    
    // Estructura de control 'if'.
    // Verificamos que la preparación fue exitosa
    if (!$stmt) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error al preparar la inserción.",
            "error" => $db->error
        ]);
        exit();
    }
    
    // Vinculamos los parámetros (s = string, s = string, s = string).
    $stmt->bind_param('sss', $nombre, $email, $password_hash);
    
    // Estructura de control 'if'.
    // Si la ejecución es exitosa, retornamos éxito 201 (Creado)
    if ($stmt->execute()) {
        http_response_code(201); // Created
        echo json_encode([
            "success" => true,
            "message" => "Usuario registrado exitosamente.",
            "data" => [
                "id_usuario" => $db->insert_id,
                "nombre" => $nombre,
                "email" => $email
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error al registrar el usuario.",
            "error" => $stmt->error
        ]);
    }
    
    $stmt->close(); // Cerramos el statement.
    $db->close(); // Cerramos la conexión.
?>