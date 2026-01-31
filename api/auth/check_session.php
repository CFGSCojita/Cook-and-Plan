<?php
    include_once '../config/cors.php'; // Incluimos la configuración de CORS.
    
    session_start(); // Iniciamos la sesión para acceder a las variables de sesión.

    // Estructura de control 'if'.
    // Si el método de la solicitud no es GET, devolvemos un error 405 (Método no permitido).
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        http_response_code(405); // Indicamos que el método no está permitido.
        // Devolvemos un mensaje de error en formato JSON:
        echo json_encode([
            "success" => false,
            "message" => "Método no permitido."
        ]);
        exit();
    }

    // Estructura de control 'if'.
    // Si la variable de sesión 'user_id' está definida y no está vacía, significa que hay una sesión activa.
    // En caso contrario, no hay sesión activa.
    if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
        http_response_code(200); // Indicamos que la solicitud fue exitosa.
        // Devolvemos un mensaje de éxito junto con los datos del usuario en formato JSON:
        echo json_encode([
            "success" => true,
            "user" => [
                "id_usuario" => $_SESSION['user_id'],
                "nombre" => $_SESSION['user_name'] ?? '',
                "email" => $_SESSION['user_email'] ?? ''
            ]
        ]);
    } else {
        http_response_code(401); // Indicamos que no está autorizado.
        // Devolvemos un mensaje de error en formato JSON:
        echo json_encode([
            "success" => false,
            "message" => "No hay sesión activa."
        ]);
    }
?>