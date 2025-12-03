# MediReserva

Aplicación web desarrollada en **Angular** para la gestión de reservas médicas.  
Permite que pacientes reserven y gestionen sus horas, y que el/la profesional/administrador revise agenda y mantenga un listado de pacientes.

Este proyecto fue construido como evaluación de Front-End con Angular, utilizando:

- **Angular** con routing, guards y formularios reactivos
- **Tailwind CSS** para el diseño y responsividad
- **Servicios** para manejar autenticación, reservas y pacientes
- **Karma + Jasmine** para pruebas unitarias
- **Compodoc** para generar documentación del código

---

## Funcionalidades principales

### Autenticación y usuarios

- **Inicio de sesión**
    - Formulario reactivo con validaciones
    - Redirección según rol (admin / paciente)
- **Registro**
    - Registro de nuevos usuarios como pacientes
    - Validación de contraseña segura:
        - Mayúscula
        - Minúscula
        - Número
        - Símbolo especial
- **Recuperar contraseña**
    - Formulario para solicitar recuperación por email
    - Flujo simulado (sin backend real, muestra mensaje informativo)
- **Perfil de usuario**
    - Edición de nombre, apellido y correo
    - Cambio de contraseña con validaciones

---

### Roles y navegación

La aplicación maneja dos roles:

- `admin` / `doctor`
- `patient`

Cada rol tiene acceso a distintas vistas:

#### Rol **patient**

- **Dashboard de paciente**
    - Resumen de próximas reservas
    - Tarjetas con información dinámica según configuración
- **Reservar hora**
    - Seleccionar fecha futura
    - Seleccionar especialidad
    - Seleccionar médico según especialidad
    - Motivo opcional
- **Mis reservas**
    - Listado de reservas del paciente
    - Separación entre reservas futuras e históricas
    - Posibilidad de **cancelar** reservas futuras

#### Rol **admin / doctor**

- **Dashboard de admin/doctor**
    - Resumen de atenciones del día, pacientes, confirmaciones, etc.
- **Agenda**
    - Listado de todas las reservas del sistema
    - Vista de futuras e históricas
- **Mantenedor de pacientes**
    - Crear, editar y eliminar pacientes
    - Formularios con validaciones (RUT, email, etc.)

---

### Seguridad y guards

Se utilizan **guards de Angular** para controlar el acceso:

- `authGuard`: protege rutas solo para usuarios autenticados
- `loginGuard`: bloquea acceso a login/registro si el usuario ya está autenticado
- `roleGuard`: restringe rutas según el rol (`admin` o `patient`)

El estado de autenticación se maneja con:

- `Auth` service
- `BehaviorSubject` para el usuario actual
- Persistencia mínima en `localStorage`

---

### Reservas y pacientes

#### Servicio de reservas (`Reservations`)

- Maneja un listado de reservas en memoria
- Permite:
    - Crear reservas nuevas
    - Cancelar reservas
    - Actualizar estado
    - Listar reservas por paciente
    - Listar reservas por doctor o admin

#### Servicio de pacientes

- Mantiene una colección de pacientes en memoria
- Permite:
    - Crear paciente
    - Editar paciente
    - Eliminar paciente
    - Listarlos en tabla

---

## Tecnologías y librerías

- **Angular**
- **TypeScript**
- **Tailwind CSS**
- **Karma + Jasmine** (pruebas unitarias)
- **Compodoc** (documentación)

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash

git clone https://github.com/demodogo/medires-angular.git
cd medireserva-angular
```
### 2. Instalar dependencias

```bash
 
npm install
```
### 3. Ejecutar la aplicación

```bash
 
ng serve --open
```
---

## Usuarios de prueba

En el servicio de autenticación se definen dos usuarios de prueba.
- Admin/Doctor:
    - admin@email.cl
    - admin123
 
    
- Paciente:
    - projas@gmail.com
    - projas123

---
## Pruebas unitarias

Las pruebas se realizaron con Karma + Jasmine.

Para ejecutar las pruebas, correr el comando:
``
ng test  
``

Las pruebas implementadas son:
- Validación de contraseña segura
- Formato de correo electrónico
- Login con credenciales válidas
- Cambio de estado al cancelar reserva

---
## Documentación
La documentación se genera con Compodoc
 
Para generar la documentación, ejecutar: ``npm run compodoc``

Esto creará una carpeta ``documentation/`` con archivos estáticos.

Para servir localmente la documentación, ejecutar: ``npx compodoc -p tsconfig.app.json -s
``

Para ver la documentación, visitar la URL indicada en la terminal (por defecto ``http://localhost:8080``)

---