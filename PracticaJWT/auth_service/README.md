# Microservicio de Autenticación y Autorización

Este microservicio gestiona el registro y la autenticación de usuarios para el sistema de venta de entradas. Utiliza Django, Django REST Framework y Simple JWT para proporcionar endpoints seguros basados en JSON Web Tokens (JWT).

## Configuración del Entorno

1.  **Clonar el repositorio y navegar al directorio `auth_service`**:
    ```bash
    cd auth_service
    ```

2.  **Crear y activar un entorno virtual**:
    ```bash
    # En Windows
    python -m venv venv
    .\venv\Scripts\activate

    # En macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Instalar las dependencias**:
Asegúrate de que el entorno virtual esté activado y luego instala los paquetes requeridos.
    ```bash
    pip install -r requirements.txt
    ```

4.  **Aplicar las migraciones de la base de datos**:
    Esto creará la base de datos SQLite y las tablas necesarias.
    ```bash
    python manage.py migrate
    ```

## Ejecutar el Servidor de Desarrollo

Una vez completada la configuración, puedes iniciar el servidor de desarrollo:

```bash
python manage.py runserver
```

El servicio estará disponible en `http://127.0.0.1:8000`.

## Cómo Usar la API

Puedes usar herramientas como `curl` o Postman para interactuar con los endpoints de la API.

### 1. Registrar un Nuevo Usuario

Realiza una petición `POST` a `/api/auth/register/` con los datos del nuevo usuario.

```bash
curl -X POST http://127.0.0.1:8000/api/auth/register/ \
-H "Content-Type: application/json" \
    -d '''{
        "username": "nuevo_usuario",
        "email": "usuario@example.com",
        "password": "password_segura_123"
    }'''
```

### 2. Obtener un Token JWT (Iniciar Sesión)

Realiza una petición `POST` a `/api/auth/token/` para autenticarte y recibir tus tokens de acceso y refresco.

```bash
curl -X POST http://127.0.0.1:8000/api/auth/token/ \
-H "Content-Type: application/json" \
-d '''{
    "username": "nuevo_usuario",
    "password": "password_segura_123"
}'''
```

**Respuesta esperada:**
```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Refrescar un Token de Acceso

Usa el token de refresco para obtener un nuevo token de acceso cuando el actual expire.

```bash
curl -X POST http://127.0.0.1:8000/api/auth/token/refresh/ \
-H "Content-Type: application/json" \
-d '''{
    "refresh": "tu_token_de_refresco_aqui"
}'''
```

**Respuesta esperada:**
```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. Acceder a Rutas Protegidas

Para acceder a rutas protegidas en otros microservicios, incluye el token de acceso en el encabezado `Authorization`.

```bash
curl -X GET http://<URL_DEL_OTRO_SERVICIO>/api/ruta_protegida/ \
-H "Authorization: Bearer tu_token_de_acceso_aqui"
```

