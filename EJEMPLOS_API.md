# Ejemplos de Peticiones a la API

## Registro de Usuario

```http
POST http://localhost:3000/api/auth/registro
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@example.com",
  "password": "123456"
}
```

## Inicio de Sesión

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "juan.perez@example.com",
  "password": "123456"
}
```

## Obtener Perfil de Usuario (requiere token)

```http
GET http://localhost:3000/api/auth/perfil
Authorization: Bearer <tu_token_aqui>
```

## Crear Conferencista (requiere token)

```http
POST http://localhost:3000/api/conferencistas
Authorization: Bearer <tu_token_aqui>
Content-Type: application/json

{
  "nombre": "María",
  "apellido": "García",
  "cedula": "1234567890",
  "genero": "Femenino",
  "ciudad": "Quito",
  "direccion": "Av. Principal 123",
  "fecha_nacimiento": "1985-05-15",
  "telefono": "0987654321",
  "email": "maria.garcia@example.com",
  "empresa": "Tech Solutions"
}
```

## Obtener Todos los Conferencistas (requiere token)

```http
GET http://localhost:3000/api/conferencistas
Authorization: Bearer <tu_token_aqui>
```

## Obtener Conferencista por ID (requiere token)

```http
GET http://localhost:3000/api/conferencistas/<id_del_conferencista>
Authorization: Bearer <tu_token_aqui>
```

## Actualizar Conferencista (requiere token)

```http
PUT http://localhost:3000/api/conferencistas/<id_del_conferencista>
Authorization: Bearer <tu_token_aqui>
Content-Type: application/json

{
  "telefono": "0998877665",
  "empresa": "New Tech Company"
}
```

## Eliminar Conferencista (requiere token)

```http
DELETE http://localhost:3000/api/conferencistas/<id_del_conferencista>
Authorization: Bearer <tu_token_aqui>
```

## Crear Auditorio (requiere token)

```http
POST http://localhost:3000/api/auditorios
Authorization: Bearer <tu_token_aqui>
Content-Type: application/json

{
  "codigo": "AUD-001",
  "nombre": "Auditorio Principal",
  "ubicacion": "Edificio A, Piso 1",
  "capacidad": 200,
  "descripcion": "Auditorio principal con equipamiento multimedia completo"
}
```

## Obtener Todos los Auditorios (requiere token)

```http
GET http://localhost:3000/api/auditorios
Authorization: Bearer <tu_token_aqui>
```

## Obtener Auditorio por ID (requiere token)

```http
GET http://localhost:3000/api/auditorios/<id_del_auditorio>
Authorization: Bearer <tu_token_aqui>
```

## Actualizar Auditorio (requiere token)

```http
PUT http://localhost:3000/api/auditorios/<id_del_auditorio>
Authorization: Bearer <tu_token_aqui>
Content-Type: application/json

{
  "capacidad": 250,
  "descripcion": "Auditorio principal con equipamiento actualizado"
}
```

## Eliminar Auditorio (requiere token)

```http
DELETE http://localhost:3000/api/auditorios/<id_del_auditorio>
Authorization: Bearer <tu_token_aqui>
```

## Crear Reserva (requiere token)

```http
POST http://localhost:3000/api/reservas
Authorization: Bearer <tu_token_aqui>
Content-Type: application/json

{
  "codigo": "RES-001",
  "descripcion": "Conferencia sobre Inteligencia Artificial",
  "auditorio": "<id_del_auditorio>",
  "conferencista": "<id_del_conferencista>"
}
```

## Obtener Todas las Reservas (requiere token)

```http
GET http://localhost:3000/api/reservas
Authorization: Bearer <tu_token_aqui>
```

## Obtener Reserva por ID (requiere token)

```http
GET http://localhost:3000/api/reservas/<id_de_la_reserva>
Authorization: Bearer <tu_token_aqui>
```

## Actualizar Reserva (requiere token)

```http
PUT http://localhost:3000/api/reservas/<id_de_la_reserva>
Authorization: Bearer <tu_token_aqui>
Content-Type: application/json

{
  "descripcion": "Conferencia sobre Inteligencia Artificial y Machine Learning"
}
```

## Eliminar Reserva (requiere token)

```http
DELETE http://localhost:3000/api/reservas/<id_de_la_reserva>
Authorization: Bearer <tu_token_aqui>
```

## Notas

- Reemplazar `<tu_token_aqui>` con el token JWT obtenido al iniciar sesión
- Reemplazar los IDs (`<id_del_conferencista>`, `<id_del_auditorio>`, etc.) con IDs reales de MongoDB
- Todas las fechas deben estar en formato ISO 8601 (YYYY-MM-DD)
- Los valores de género válidos son: "Masculino", "Femenino", "Otro"
