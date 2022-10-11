# RUTAS

- /api/v1/users
- /api/v1/users/me
- /api/v1/users/:id

- /api/v1/auth/login
- /api/v1/auth/register

- /api/v1/rooms
- /api/v1/rooms/:id/make-reservation
- /api/v1/rooms/:id

- /api/v1/reservations
- /api/v1/reservations/my-reservations
- /api/v1/reservations/my-reservations/:id
- /api/v1/reservations/:id

# DETALLE RUTAS 

- /api/v1/users
- - GET(ADMIN)

- /api/v1/users/me
- - GET(GUEST)
- - PUT(GUEST)
- - DELETE(GUEST)

- /api/v1/users/:id
- - GET (ADMIN)
- - PUT (ADMIN)
- - DELETE (ADMIN)

- /api/v1/auth/login
- - POST

- /api/v1/auth/register
- - POST

- /api/v1/rooms
- - GET
- - POST(ADMIN)

- /api/v1/rooms/:id/make-reservation
- - POST(GUEST)

- /api/v1/rooms/:id
- - GET
- - PUT(ADMIN)
- - DELETE(ADMIN)

- /api/v1/reservations
- - GET(ADMIN)

- /api/v1/reservations/my-reservations
- - GET(GUEST)

- /api/v1/reservations/my-reservations/:id
- - GET(GUEST)
- - PUT(GUEST)
- - DELETE(GUEST)

- /api/v1/reservations/:id
- - GET(ADMIN)
- - PUT(ADMIN)
- - DELETE(ADMIN)

# PATH DE USUARIOS

[✔]Registrar mi usuario.
[✔]Logguear mi usuario.
[✔]Crud de reservations con guest
[✔]Crud de reservations con host.
[✔]Crud de rooms con host.

### Sin sesión iniciada
1. Ver rooms.
2. Ver detalle rooms.
3. Crear usuario.

### Guest
1. Ver rooms.
2. Ver detalle rooms.
3. Reservar.
4. Ver sus reservaciones
4. Editar reservacion.
5. Cambiar estatus de sus reservaciones

### Admin
1. Ver rooms.
2. Ver detalle rooms.
3. Crear rooms.
4. Editar rooms.
5. Cambiar estatus rooms.
6. Ver reservaciones
7. Editar reservaciones.
8. Cambiar estatus de sus reservaciones
9. Ver usuarios.
10. Editar usuarios.
11. Cambiar estatus de usuarios. 








