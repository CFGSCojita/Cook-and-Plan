<?php
    class Database {

        // Declaración de variables de conexión.
        private $host = "localhost";
        private $db_name = "cook_and_plan";
        private $username = "root";
        private $password = "";
        private $conn;

        // Método para obtener la conexión a la base de datos.
        public function getConnection() {
            $this->conn = null; // Inicializamos la variable de conexión.

            // Estructura 'try-catch'.
            // Intentará establecer la conexión y capturará cualquier error.
            try {
                // Creamos una instancia de PDO con los parámetros de conexión.
                $this->conn = new PDO(
                    "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                    $this->username,
                    $this->password
                );
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Configuramos el modo de error de PDO a excepción.
                $this->conn->exec("set names utf8"); // Establecemos el conjunto de caracteres a UTF-8.
            } catch(PDOException $e) {
                echo "Error de conexión: " . $e->getMessage();
            }
            return $this->conn; // Devolvemos la conexión establecida.
        }
    }