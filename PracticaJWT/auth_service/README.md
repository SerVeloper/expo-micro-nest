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

5.  **Crear un Superusuario (Opcional pero recomendado para administración)**:
    ```bash
    python manage.py createsuperuser
    ```
    Sigue las instrucciones en pantalla para crear tu superusuario.

## Ejecutar el Servidor de Desarrollo

Una vez completada la configuración, puedes iniciar el servidor de desarrollo:

```bash
python manage.py runserver
```

El servicio estará disponible en `http://127.0.0.1:8000`.

## Cómo Usar la API

Puedes usar herramientas como `curl` o Postman para interactuar con los endpoints de la API.

### 1. Registrar un Nuevo Usuario

Realiza una petición `POST` a `/api/auth/register/` con los datos del nuevo usuario. Por defecto, los usuarios registrados se asignarán automáticamente al grupo `usuario`.

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

### 4. Verificar un Token y Obtener Datos del Usuario

Este es el endpoint principal que otros microservicios deben usar para proteger sus rutas. Valida el token y, si es correcto, devuelve la información del usuario.

-   **Endpoint:** `GET /api/auth/token/verify/`
-   **Cabecera Requerida:** `Authorization: Bearer <access_token>`

```bash
curl -X GET http://127.0.0.1:8000/api/auth/token/verify/ \
-H "Authorization: Bearer tu_token_de_acceso_aqui"
```

**Respuesta Exitosa (200 OK):**

Si el token es válido, el servidor responderá con los datos del usuario.

```json
{
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "roles": [
        "administrador"
    ]
}
```

**Respuesta de Error (401 Unauthorized):**

Si el token no se provee, es inválido o ha expirado, el servidor responderá con un error `401`.

### 5. Acceder a Rutas Protegidas

Para acceder a rutas protegidas en otros microservicios, incluye el token de acceso en el encabezado `Authorization`.

```bash
curl -X GET http://<URL_DEL_OTRO_SERVICIO>/api/ruta_protegida/ \
-H "Authorization: Bearer tu_token_de_acceso_aqui"
```

## Estructura del Token JWT

El token JWT emitido por este servicio incluye la siguiente información en su payload:

*   `user_id`: El ID único del usuario.
*   `exp`: Tiempo de expiración del token (por defecto 5 minutos para el token de acceso, 1 día para el de refresco).
*   `iat`: Tiempo en que el token fue emitido.
*   `jti`: ID único del token.
*   `roles`: Una lista de los nombres de los grupos de Django a los que pertenece el usuario. Por ejemplo, `["usuario"]` o `["admin", "usuario"]`.

## Gestión de Roles

El sistema utiliza los grupos de Django para gestionar los roles de los usuarios.

*   **Grupo `usuario`:** Se asigna automáticamente a cualquier usuario nuevo que se registra en el sistema.
*   **Grupo `admin`:** Este grupo se crea automáticamente al iniciar la aplicación (gracias a la configuración en `user_auth/apps.py`).

Para asignar el rol de `admin` a un usuario:

1.  Asegúrate de que el servidor de desarrollo esté corriendo.
2.  Accede al panel de administración de Django en `http://127.0.0.1:8000/admin/`.
3.  Inicia sesión con un superusuario.
4.  Navega a "Authentication and Authorization" -> "Users".
5.  Selecciona el usuario al que deseas otorgar el rol de administrador.
6.  En la sección "Groups", añade el grupo `admin` a la lista de grupos del usuario.
7.  Guarda los cambios.

Al obtener un nuevo token para este usuario, el campo `roles` en el JWT reflejará su pertenencia al grupo `admin`.

## Consideraciones para el Desarrollo en Equipo

*   **Base de Datos Local:** Se recomienda que cada miembro del equipo utilice su propia base de datos local. No incluyas el archivo `db.sqlite3` en el control de versiones para evitar conflictos.
*   **Creación de Superusuarios:** Cada desarrollador deberá crear su propio superusuario (`python manage.py createsuperuser`) para acceder al panel de administración y gestionar usuarios/roles en su entorno local.
*   **Grupos Automáticos:** Los grupos `usuario` y `admin` se crearán automáticamente en la base de datos de cada desarrollador al registrar usuarios o al iniciar la aplicación, respectivamente.

## Tecnologías Utilizadas

*   **Backend:** Python 3.x
*   **Framework Web:** Django 5.x
*   **API REST:** Django REST Framework
*   **Autenticación:** djangorestframework-simplejwt
*   **Base de Datos:** SQLite (por defecto en desarrollo)
