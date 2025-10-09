Events Service - Microservicio de Gestión de Eventos
Descripción
Este es el microservicio de Gestión de Eventos para el sistema de venta de entradas a eventos basado en microservicios. Desarrollado en TypeScript con Node.js, Express.js y TypeORM para persistencia en PostgreSQL.
El servicio permite a administradores (autenticados con JWT) crear, actualizar y eliminar eventos, mientras que los usuarios pueden consultar eventos disponibles de forma pública. Se integra con el servicio de Usuarios (Auth en Python/Django) para autenticación vía JWT.
Características clave:

API REST protegida con JWT (solo admins para escritura).
Base de datos independiente (patrón Database per Service).
Validaciones básicas para datos (ej: fecha ISO, capacidad > 0).
Logs para debug y manejo de errores.

Requisitos

Node.js: v18+ (recomendado v20).
PostgreSQL: v13+ (local o cloud como Supabase/Neon).
npm: v9+ (incluido con Node.js).
Servicio de Auth corriendo en puerto 8000 (para obtener JWT).

## Configuración del Entorno

1.  **Actualizar el repositorio y navegar al directorio `events-service`**:
    ```bash
    cd events-service
    ```

2.  **Instalar las dependencias**:
    ```bash
    npm install
    ```

3.  **Crear la base de datos**:
    Crear una base de datos en postgresql.
    ```bash
    CREATE DATABASE eventos_db;
    ```

4.  **Configurar los credenciales en la URL del .env**:
    ```bash
    DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_basedatos
    ```

## Ejecutar el Servidor de Desarrollo

Una vez completada la configuración, puedes iniciar el servidor de desarrollo:

```bash
npm run dev
```

El servicio estará disponible en `http://127.0.0.1:3001`.

## Adjunto json para pruebas en postman