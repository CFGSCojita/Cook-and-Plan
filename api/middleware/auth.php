<?php

    // Iniciamos la sesión si no está iniciada
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    /**
     * Creamos una función para comprobar si el usuario está autenticado:
     * @return bool True si está autenticado, false en caso contrario
     */
    function estaLogeado() {
        return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
    }

    /**
     * Creamos una función para verificar autenticación y devuelve error si no está logueado:
     */
    function requireAuth() {
        // Estructura de control 'if'.
        // Si el usuario no está autenticado, devolvemos un error 401.
        if (!estaLogeado()) {
            http_response_code(401); // Código de estado HTTP 401: No autorizado
            // Devolvemos un mensaje de error en formato JSON.
            echo json_encode([ 
                "success" => false,
                "message" => "No autorizado. Debes iniciar sesión."
            ]);
            exit(); // Terminamos la ejecución del script.
        }
    }

    /**
     * Creamos una función para obtener el ID del usuario actual:
     * @return int|null ID del usuario o null si no está autenticado
     */
    function getCurrentUserId() {
        return estaLogeado() ? $_SESSION['user_id'] : null; // Si el usuario está autenticado, devolvemos su ID, si no, null.
    }

    /**
     * Creamos una función para obtener los datos del usuario actual:
     * @return array|null Datos del usuario o null si no está autenticado
     */
    function getCurrentUser() {

        // Estructura de control 'if'.
        // Si el usuario no está autenticado, devolvemos null.
        if (!estaLogeado()) {
            return null;
        }
        
        // Devolvemos un array con los datos del usuario:
        return [
            'id_usuario' => $_SESSION['user_id'],
            'nombre' => $_SESSION['user_name'] ?? '',
            'email' => $_SESSION['user_email'] ?? ''
        ];
    }
?>