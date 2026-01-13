<?php
    // Incluimos configuración CORS
    include_once '../config/cors.php';

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

    // Verificamos si hay sesión activa
    if (!isset($_SESSION['user_id'])) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "No hay sesión activa."
        ]);
        exit();
    }

    // Destruimos la sesión
    $_SESSION = array();

    // Si existe cookie de sesión, la eliminamos
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params["path"],
            $params["domain"],
            $params["secure"],
            $params["httponly"]
        );
    }

    // Destruimos la sesión
    session_destroy();

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Sesión cerrada exitosamente."
    ]);
?>