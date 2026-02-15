# Cook&Plan

Aplicación web para gestionar recetas, planificar menús semanales y generar listas de la compra automáticamente.

> Proyecto de Final de Grado (DAW 25/26) — IES Joan Ramis i Ramis  
> Autor: Stefan Cojita

---

## Descripción

Cook&Plan centraliza la gestión de recetas y la planificación de comidas en una sola herramienta. El objetivo es ofrecer una experiencia sencilla y práctica dirigida a estudiantes, familias y personas que cocinen en casa.

---

## Estado actual

Esta versión corresponde a la **demo del TFG**. Incluye las funcionalidades base del proyecto.

---

## Funcionalidades implementadas

- Registro e inicio de sesión con contraseñas encriptadas (bcrypt)
- Recuperación de contraseña mediante token temporal
- Gestión de sesiones segura con PHP
- Dashboard principal con acceso a los módulos
- CRUD completo de recetas (crear, editar, eliminar, visualizar)
- Planificador semanal de menús: asignar recetas por día y comida
- Persistencia de menús en base de datos por usuario
- Diseño responsive con identidad visual propia

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React + Vite, Tailwind CSS, React Router |
| Backend | PHP con MySQLi |
| Base de datos | MariaDB |
| Entorno local | WAMP Server |

---

## Estructura del proyecto

```
cook-and-plan/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── RutaProtegida.jsx
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── AuthProvider.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── RestablecerPassword.jsx
│   │   ├── Novedades.jsx
│   │   ├── ConsideracionesDemo.jsx
│   │   ├── recetas/
│   │   │   ├── Recetas.jsx
│   │   │   ├── RecetaCard.jsx
│   │   │   └── RecetaModal.jsx
│   │   └── menus/
│   │       └── Menu.jsx
│   ├── services/
│   │   ├── recipeService.js
│   │   └── menuService.js
│   └── main.jsx
│
└── api/
    ├── config/
    │   ├── cors.php
    │   └── db_connect.php
    ├── middleware/
    │   └── auth.php
    ├── auth/
    │   ├── db_login.php
    │   ├── db_register.php
    │   ├── logout.php
    │   ├── check_session.php
    │   └── restablecer_password.php
    ├── recetas/
    │   ├── listar.php
    │   ├── detalle.php
    │   ├── crear.php
    │   ├── actualizar.php
    │   └── eliminar.php
    └── menus/
        ├── obtener.php
        ├── guardar.php
        └── eliminar_slot.php
```

---

## Base de datos

La base de datos `cook_and_plan` contiene cuatro tablas:

- **usuarios** — datos de registro y autenticación
- **recetas** — recetas creadas por cada usuario
- **menus** — menús semanales por usuario
- **menu_receta** — relación entre menús, recetas, día y comida

---

## Instalación local

1. Clonar el repositorio dentro de la carpeta de WAMP:
   ```
   C:/wamp64/www/student006/cook-and-plan/
   ```

2. Importar la base de datos en phpMyAdmin:
   ```
   cook_and_plan.sql
   ```

3. Instalar dependencias del frontend:
   ```bash
   npm install
   ```

4. Arrancar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Asegurarse de que WAMP está activo con Apache y MySQL.

La aplicación estará disponible en `http://localhost:5173` y la API en `http://localhost/student006/cook-and-plan/api`.

---

## Rutas de la aplicación

| Ruta | Descripción | Protegida |
|---|---|---|
| `/login` | Inicio de sesión | No |
| `/register` | Registro de usuario | No |
| `/restablecer-password` | Recuperar contraseña | No |
| `/dashboard` | Panel principal | Sí |
| `/recetas` | Gestión de recetas | Sí |
| `/menus` | Planificador semanal | Sí |
| `/novedades` | Notas de la demo | No |
| `/consideraciones` | Consideraciones de la demo | No |

---

## Próximas funcionalidades (Fase 2)

- Lista de la compra automática a partir del menú semanal
- Filtros y búsqueda avanzada de recetas
- Gestión de macronutrientes y valores nutricionales
- Etiquetas y categorías para las recetas
- Sistema de roles de usuario
- Versión móvil optimizada
- Despliegue en servidor web con dominio propio

---

## Licencia

Proyecto académico — IES Joan Ramis i Ramis, 2025/2026.