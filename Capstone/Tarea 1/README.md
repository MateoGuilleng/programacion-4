# Backend de Juego con Node.js y Express

Un backend simple para gestionar juegos con operaciones CRUD completas, usando Node.js, Express, Sequelize y SQLite.

## Características

- **Operaciones CRUD completas**: POST, GET, PUT, PATCH, DELETE
- **Base de datos SQLite** con Sequelize ORM
- **Middleware de errores** para manejo robusto de errores
- **Validaciones** de datos de entrada
- **Estructura modular** con separación de responsabilidades

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor:
   ```bash
   npm start
   ```
   o para desarrollo con recarga automática:
   ```bash
   npm run dev
   ```

## API Endpoints

### POST /game - Crear un nuevo juego
**Status Code esperado**: 201 – Created

**JSON de Entrada**:
```json
{
  "name": "My Game",
  "description": "An exciting game",
  "genre": "Adventure",
  "platform": "PC"
}
```

**JSON de Salida** (Ejemplo):
```json
{
  "id": 1,
  "name": "My Game",
  "description": "An exciting game",
  "genre": "Adventure",
  "platform": "PC"
}
```

### GET /game/:id - Obtener detalles de un juego por ID
**Status Code esperado**: 200 - OK

**JSON de Salida** (Ejemplo):
```json
{
  "id": 1,
  "name": "My Game",
  "description": "An exciting game",
  "genre": "Adventure",
  "platform": "PC"
}
```

### PUT /game/:id - Actualizar completamente un juego
**Status Code esperado**: 200 – OK

**JSON de Entrada**:
```json
{
  "name": "Updated Game",
  "description": "An updated and exciting game",
  "genre": "Racing",
  "platform": "Mobile"
}
```

**JSON de Salida** (Ejemplo):
```json
{
  "name": "Updated Game",
  "description": "An updated and exciting game",
  "genre": "Racing",
  "platform": "Mobile"
}
```

### DELETE /game/:id - Eliminar un juego
**Status Code esperado**: 204 - No Content

**No se espera JSON de salida**.

### PATCH /game/:id - Actualizar parcialmente un juego
**Status Code esperado**: 200 - OK

**JSON de Entrada**:
```json
{
  "description": "An updated game"
}
```

**JSON de lectura después de patch**:
```json
{
  "id": 1,
  "name": "Updated Game",
  "description": "An updated game",
  "genre": "Adventure",
  "platform": "PC"
}
```

### GET /health - Verificar estado del servidor

**Response (200 OK):**
```json
{
  "status": "OK",
  "message": "Game backend is running"
}
```

## Estructura del Proyecto

```
├── controllers/
│   └── gameController.js
├── middleware/
│   └── errorMiddleware.js
├── models/
│   ├── index.js
│   └── game.js
├── routes/
│   └── gameRoutes.js
├── index.js
├── package.json
├── .gitignore
├── postman_collection.json
├── test_api.js
├── instructions.txt
└── README.md
```

## Pruebas con Postman

Para probar la API:

1. Importar la colección de Postman desde `postman_collection.json`
2. Configurar la variable de entorno `{{baseUrl}}` como `http://localhost:3000`
3. Ejecutar las solicitudes en el orden:
   - POST /game (crear un juego)
   - GET /game/:id (obtener el juego creado)
   - PUT /game/:id (actualizar completamente)
   - PATCH /game/:id (actualizar parcialmente)
   - DELETE /game/:id (eliminar)

## Validaciones

- **Campos requeridos**: name, description, genre, platform
- **PUT**: Todos los campos requeridos
- **PATCH**: Al menos un campo para actualizar
- **Tipos de datos**: correctos según el modelo

## Middleware de Errores

El middleware maneja:
- Errores de validación de Sequelize
- Errores 400 (bad request) para datos inválidos
- Errores 404 (recurso no encontrado)
- Errores 500 (error interno del servidor)

## Base de Datos

- **SQLite** para simplicidad de desarrollo
- **Sequelize** como ORM
- **Migraciones automáticas** al iniciar el servidor
- **Base de datos persistente** en `database.sqlite`

## Tecnologías Utilizadas

- Node.js
- Express.js
- Sequelize ORM
- SQLite
- Nodemon (desarrollo)
- Jest (pruebas - por implementar)

## Prueba Automática

Puedes ejecutar el script de prueba:
```bash
# Asegúrate de que el servidor esté ejecutándose primero
node test_api.js
```

El script probará todas las operaciones CRUD en secuencia con los datos exactos de los ejemplos.