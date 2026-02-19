# Sistema de Gestión de Conferencias - Backend

Backend del Sistema de Gestión de Conferencias desarrollado con Node.js, Express y MongoDB.

## Requisitos Previos

- Node.js (versión 14 o superior)
- MongoDB (versión 4 o superior)

## Instalación

1. Clonar el repositorio y navegar a la carpeta del proyecto

2. Instalar las dependencias:
```bash
npm install
```

3. Configurar las variables de entorno:
   - Copiar el archivo `.env.example` y renombrarlo a `.env`
   - Configurar las variables según tu entorno:
     - `PORT`: Puerto del servidor (por defecto 3000)
     - `MONGODB_URI`: URI de conexión a MongoDB
     - `JWT_SECRET`: Clave secreta para JWT (cambiar en producción)
     - `JWT_EXPIRE`: Tiempo de expiración del token (por defecto 24h)

4. Asegurarse de que MongoDB esté ejecutándose

## Iniciar el Servidor

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Estructura del Proyecto

```
src/
├── config/           # Configuración (base de datos)
├── models/           # Modelos de MongoDB
├── controllers/      # Controladores de la lógica de negocio
├── routes/           # Definición de rutas
├── validators/       # Validadores con express-validator
├── middlewares/      # Middlewares personalizados
├── app.js           # Configuración de Express
└── server.js        # Punto de entrada del servidor
```

## Endpoints de la API

### Autenticación (Públicas)

- `POST /api/auth/registro` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/perfil` - Obtener perfil del usuario (requiere token)

### Conferencistas (Privadas - requieren token)

- `GET /api/conferencistas` - Obtener todos los conferencistas
- `GET /api/conferencistas/:id` - Obtener un conferencista por ID
- `POST /api/conferencistas` - Crear un nuevo conferencista
- `PUT /api/conferencistas/:id` - Actualizar un conferencista
- `DELETE /api/conferencistas/:id` - Eliminar un conferencista

### Auditorios (Privadas - requieren token)

- `GET /api/auditorios` - Obtener todos los auditorios
- `GET /api/auditorios/:id` - Obtener un auditorio por ID
- `POST /api/auditorios` - Crear un nuevo auditorio
- `PUT /api/auditorios/:id` - Actualizar un auditorio
- `DELETE /api/auditorios/:id` - Eliminar un auditorio

### Reservas (Privadas - requieren token)

- `GET /api/reservas` - Obtener todas las reservas
- `GET /api/reservas/:id` - Obtener una reserva por ID
- `POST /api/reservas` - Crear una nueva reserva
- `PUT /api/reservas/:id` - Actualizar una reserva
- `DELETE /api/reservas/:id` - Eliminar una reserva

## Autenticación

Para acceder a las rutas privadas, se debe incluir el token JWT en el header de la petición:

```
Authorization: Bearer <token>
```

El token se obtiene al registrarse o iniciar sesión.

## Modelos de Datos

### Usuario
- nombre
- apellido
- email
- password (encriptada con bcrypt)

### Conferencista
- nombre
- apellido
- cedula
- genero
- ciudad
- direccion
- fecha_nacimiento
- telefono
- email
- empresa

### Auditorio
- codigo
- nombre
- ubicacion
- capacidad
- descripcion

### Reserva
- codigo
- descripcion
- auditorio (referencia)
- conferencista (referencia)

## Características

- Autenticación con JWT
- Contraseñas encriptadas con bcrypt
- Validación de datos con express-validator
- Arquitectura MVC
- Manejo de errores en cada controlador
- Relaciones entre colecciones con populate
- CORS habilitado para el frontend
