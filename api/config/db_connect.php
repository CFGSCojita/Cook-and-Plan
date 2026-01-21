<?php
    class Database {

        // Declaración de variables de conexión.
        private $host = "localhost";
        private $db_name = "cook_and_plan";
        private $username = "root";
        private $password = "";
        private $conn;

        // Creamos un método para obtener la conexión a la base de datos.
        public function getConnection() {
            $this->conn = null; // Inicializamos la variable de conexión.

            // Estructura 'try-catch'.
            // Intentará establecer la conexión y capturará cualquier error.
            try {
                // Creamos una instancia de mysqli con los parámetros de conexión.
                $this->conn = new mysqli(
                    $this->host,
                    $this->username,
                    $this->password,
                    $this->db_name
                );
                
                // Verificamos si hay errores de conexión
                if ($this->conn->connect_error) {
                    throw new Exception("Se ha producido un error de conexión: " . $this->conn->connect_error);
                }
                
                // Establecemos el conjunto de caracteres a UTF-8.
                $this->conn->set_charset("utf8");
                
            } catch(Exception $e) {
                echo "Se ha producido un eerror de conexión: " . $e->getMessage();
            }
            return $this->conn; // Devolvemos la conexión establecida.
        }
    }