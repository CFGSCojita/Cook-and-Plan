<?php
    // Permitimos peticiones desde el frontend React
    header("Access-Control-Allow-Origin: http://localhost:5173");

    // Métodos HTTP permitidos
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    // Headers permitidos
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

    // Permitimos credenciales (cookies, sesiones)
    header("Access-Control-Allow-Credentials: true");

    // Tipo de contenido JSON
    header("Content-Type: application/json; charset=UTF-8");

    // Manejamos peticiones OPTIONS:
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
?>