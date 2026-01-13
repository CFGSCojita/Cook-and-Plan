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

    try {
        // Buscamos el usuario por email a través de una consulta preparada.
        $query = "SELECT id_usuario, nombre, email, password_hash 
                FROM usuarios 
                WHERE email = :email 
                LIMIT 1";
        $stmt = $db->prepare($query); // Preparamos la consulta.
        $stmt->bindParam(':email', $email); // Vinculamos el parámetro.
        $stmt->execute(); // Ejecutamos la consulta.
        
        // Estructura de control 'if'.
        // Verificamos si se encontró el usuario.
        if ($stmt->rowCount() === 0) {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Credenciales incorrectas."
            ]);
            exit();
        }
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC); // Obtenemos los datos del usuario.
        
        // Verificamos la contraseña
        if (!password_verify($password, $user['password_hash'])) {
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
        
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Inicio de sesión exitoso.",
            "data" => [
                "id_usuario" => $user['id_usuario'],
                "nombre" => $user['nombre'],
                "email" => $user['email']
            ]
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error en el servidor.",
            "error" => $e->getMessage()
        ]);
    }
?>