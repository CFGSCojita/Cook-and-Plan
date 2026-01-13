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

    try {

        $query = "SELECT id_usuario FROM usuarios WHERE email = :email LIMIT 1"; // Verificamos si el email ya existe con una consulta preparada.
        $stmt = $db->prepare($query); // Preparamos la consulta.
        $stmt->bindParam(':email', $email); // Vinculamos el parámetro.
        $stmt->execute(); // Ejecutamos la consulta.
        
        // Estructura de control 'if'.
        // Si el email ya existe, retornamos error 409 (Conflicto)
        if ($stmt->rowCount() > 0) {
            http_response_code(409);
            echo json_encode([
                "success" => false,
                "message" => "El email ya está registrado."
            ]);
            exit();
        }
        
        // Hasheamos la contraseña
        $password_hash = password_hash($password, PASSWORD_BCRYPT);
        
        // Insertamos el nuevo usuario con una consulta preparada.
        $query = "INSERT INTO usuarios (nombre, email, password_hash) 
                VALUES (:nombre, :email, :password_hash)";
        $stmt = $db->prepare($query); // Preparamos la consulta.
        
         // Vinculamos los parámetros.
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password_hash', $password_hash);
        
        // Estructura de control 'if'.
        // Si la ejecución es exitosa, retornamos éxito 201 (Creado)
        if ($stmt->execute()) {
            http_response_code(201); // Created
            echo json_encode([
                "success" => true,
                "message" => "Usuario registrado exitosamente.",
                "data" => [
                    "id_usuario" => $db->lastInsertId(),
                    "nombre" => $nombre,
                    "email" => $email
                ]
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Error al registrar el usuario."
            ]);
        }
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error en el servidor.",
            "error" => $e->getMessage()
        ]);
    }
?>