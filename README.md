# Ejemplo de API REST con nest.js


---

## Tecnologías

- **Backend:** NestJS  
- **Base de datos:** PostgreSQL  
- **ORM:** TypeORM  
- **Documentación y pruebas:** Swagger  
- **Lenguaje:** TypeScript  

---

## Estructura del proyecto

- **src/**
  - **database/** → Configuración de la conexión a PostgreSQL
  - **modules/**
    - **student/** → Módulo de estudiantes
  - **app.module.ts** → Módulo raíz
  - **app.ts** → Arranque de la aplicación + Swagger


## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/SerVeloper/expo-micro-nest.git
cd expo-micro-nest
```
1.1 Para ejemplo REST
```bash
cd rest
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar las variables de entorno (.env)

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=tu_password
DB_NAME=rest_db
```

4. Crear la base de datos

```bash
CREATE DATABASE rest_db;
```

---

# Ejecución

- **Modo desarrollo:**

```bash
npm run dev
```

- **Modo producción**

```bash
npm run start
```

- **API disponible en:**

```bash
http://localhost:3000/api/v1
```

# Documentacion de la API (Swagger)

```bash
http://localhost:3000/api/v1/docs