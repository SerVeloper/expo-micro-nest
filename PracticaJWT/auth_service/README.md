# Microservicio de Autenticación y Autorización

Este microservicio gestiona el registro y la autenticación de usuarios para el sistema de venta de entradas.
Utiliza **Django**, **Django REST Framework** y **Simple JWT** para proporcionar endpoints seguros basados en **JSON Web Tokens (JWT)**.

---

## ⚙️ Configuración del Entorno

1. **Clonar el repositorio y navegar al directorio `auth_service`:**

   ```bash
   cd auth_service
   ```

2. **Crear y activar un entorno virtual:**

   ```bash
   # En Windows
   python -m venv venv
   .\venv\Scripts\activate

   # En macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Instalar las dependencias:**
   Asegúrate de que el entorno virtual esté activado y luego instala los paquetes requeridos.

   ```bash
   pip install -r requirements.txt
   ```

4. **Aplicar las migraciones de la base de datos:**
   Esto creará la base de datos SQLite y las tablas necesarias.

   ```bash
   python manage.py migrate
   ```

5. **Crear un Superusuario (opcional pero recomendado para administración):**

   ```bash
   python manage.py createsuperuser
   ```

   Sigue las instrucciones en pantalla para crear tu superusuario.

---

## ▶️ Ejecutar el Servidor de Desarrollo

Una vez completada la configuración, puedes iniciar el servidor de desarrollo:

```bash
python manage.py runserver
```

El servicio estará disponible en:
👉 `http://127.0.0.1:8000`

---


## 🌐 Rutas principales

| Método          | Endpoint                   | Descripción                            | Permisos            |
| --------------- | -------------------------- | -------------------------------------- | ------------------- |
| `POST`          | `/api/auth/register/`      | Registrar nuevo usuario                | Público             |
| `POST`          | `/api/auth/token/`         | Obtener token JWT (login)              | Público             |
| `POST`          | `/api/auth/token/refresh/` | Renovar token JWT                      | Público             |
| `GET`           | `/api/auth/users/`         | Listar todos los usuarios              | Solo admin          |
| `GET`           | `/api/auth/users/{id}/`    | Ver perfil de usuario                  | Admin o propietario |
| `PUT` / `PATCH` | `/api/auth/users/{id}/`    | Actualizar usuario                     | Admin o propietario |
| `DELETE`        | `/api/auth/users/{id}/`    | Eliminar lógicamente (is_active=False) | Admin o propietario |

---

## 🧪 Pruebas paso a paso en Postman

### Registrar un Nuevo Usuario

Realiza una petición `POST` a:

```
POST /api/auth/register/
```

**Body (JSON):**

```json
{
    "username": "nuevo_usuario",
    "email": "usuario@example.com",
    "password": "password_segura_123"
}
```

**Respuesta esperada:**

```json
{
    "id": 1,
    "username": "nuevo_usuario",
    "email": "usuario@example.com",
    "roles": ["usuario"]
}
```

> 🔹 Por defecto, los usuarios se asignan automáticamente al grupo **usuario**.

---

### Obtener un Token JWT (Iniciar Sesión)

```
POST /api/auth/token/
```

**Body (JSON):**

```json
{
    "username": "nuevo_usuario",
    "password": "password_segura_123"
}
```

**Respuesta esperada:**

```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Refrescar un Token de Acceso

```
POST /api/auth/token/refresh/
```

**Body (JSON):**

```json
{
    "refresh": "tu_token_de_refresco_aqui"
}
```

**Respuesta esperada:**

```json
{
    "access": "nuevo_token_de_acceso_aqui"
}
```
---

### Ver un usuario

**Método:** `GET`
**URL:** `http://127.0.0.1:8000/api/auth/users/2/`

**Headers:**

```
Authorization: Bearer <ACCESS_TOKEN>
```

**Respuesta esperada:**

```json
{
    "id": 2,
    "username": "valeria",
    "email": "valeria@example.com",
    "roles": ["usuario"]
}
```

---

### Actualizar datos de usuario

**Método:** `PUT`
**URL:** `http://127.0.0.1:8000/api/auth/users/2/`

**Headers:**

```
Authorization: Bearer <ACCESS_TOKEN>
```

**Body (JSON):**

```json
{
    "email": "valeria_updated@example.com",
    "password": "NuevaClaveSegura456"
}
```

**Respuesta esperada:**

```json
{
    "id": 2,
    "username": "valeria",
    "email": "valeria_updated@example.com",
    "roles": ["usuario"]
}
```

---

### Eliminar (lógicamente) usuario

**Método:** `DELETE`
**URL:** `http://127.0.0.1:8000/api/auth/users/2/`

**Headers:**

```
Authorization: Bearer <ACCESS_TOKEN>
```

**Respuesta esperada:**

```json
{
    "detail": "El usuario fue desactivado correctamente."
}
```

---

### Listar usuarios (solo admin)

**Método:** `GET`
**URL:** `http://127.0.0.1:8000/api/auth/users/`

**Headers:**

```
Authorization: Bearer <ACCESS_TOKEN_ADMIN>
```

**Respuesta esperada:**

```json
[
    {
        "id": 1,
        "username": "admin",
        "email": "admin@example.com",
        "roles": ["admin"]
    },
    {
        "id": 2,
        "username": "valeria",
        "email": "valeria@example.com",
        "roles": ["usuario"]
    }
]
```


## 🧾 Estructura del Token JWT

El token JWT emitido por este microservicio incluye los siguientes datos en su **payload**:

| Campo     | Descripción                                                            |
| --------- | ---------------------------------------------------------------------- |
| `user_id` | ID único del usuario                                                   |
| `exp`     | Tiempo de expiración del token                                         |
| `iat`     | Tiempo en que el token fue emitido                                     |
| `jti`     | Identificador único del token                                          |
| `roles`   | Lista de roles asignados al usuario (`["usuario"]`, `["admin"]`, etc.) |


---

## 🧩 Gestión de Roles

El sistema utiliza los **grupos de Django** para definir roles:

* **`usuario`** → Asignado automáticamente a todo nuevo registro.
* **`admin`** → Se crea automáticamente cuando se inicia la aplicación.

### 🧠 Para asignar el rol de administrador:

1. Inicia el servidor (`python manage.py runserver`).
2. Accede a `http://127.0.0.1:8000/admin/`.
3. Inicia sesión con tu superusuario.
4. Ve a **Authentication and Authorization → Users**.
5. Selecciona el usuario al que deseas darle permisos de administrador.
6. En la sección **Groups**, añade el grupo `admin`.
7. Guarda los cambios.

> Cuando este usuario inicie sesión nuevamente, su token incluirá `"roles": ["admin"]`.

---

## 👥 Consideraciones para el Desarrollo en Equipo

* Cada desarrollador debe tener su propia base de datos local.
  No incluyas el archivo `db.sqlite3` en el control de versiones.
* Cada uno debe crear su propio superusuario con:

  ```bash
  python manage.py createsuperuser
  ```
* Los grupos `usuario` y `admin` se crean automáticamente al iniciar la app o registrar usuarios.

---

## 🧰 Tecnologías Utilizadas

* **Backend:** Python 3.x
* **Framework Web:** Django 5.x
* **API REST:** Django REST Framework
* **Autenticación:** djangorestframework-simplejwt
* **Base de Datos:** SQLite (por defecto en desarrollo)

---

¿Quieres que te agregue al final un apartado de “🧪 Pruebas en Postman” con ejemplos de request/response listos para importar o copiar en Postman?
Puedo incluir las rutas CRUD (`/api/auth/users/`) y los encabezados `Authorization` ya configurados.

