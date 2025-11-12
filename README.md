Prueba Técnica Full Stack – To-Do List (.NET 9 + Angular 17)
1. Objetivo

Desarrollar una aplicación To-Do List que permita la gestión de tareas con autenticación, utilizando .NET 9 para el backend y Angular 17 para el frontend.
El propósito del ejercicio es evaluar la organización del código, buenas prácticas, modularización, manejo de estado, comunicación entre cliente y servidor, y cobertura de pruebas unitarias.

2. Arquitectura general

El sistema está compuesto por dos aplicaciones separadas:

Backend: API RESTful desarrollada en ASP.NET Core 9, con Entity Framework Core (InMemory), autenticación JWT, validación de datos mediante Data Annotations, y pruebas unitarias con xUnit.

Frontend: Aplicación en Angular 17 estructurada con Standalone Components, Angular Material y Lazy Loading.
Utiliza servicios observables para el manejo del estado, guards para protección de rutas, y interceptores para el manejo de tokens y errores.

Diagrama general (lógico)
[Angular App]
    │
    ▼
[Interceptor JWT]──► [API .NET 9]
                         │
                         ▼
                 [EF Core InMemory]

3. Tecnologías principales

Backend

.NET 9 – ASP.NET Core Web API

Entity Framework Core (InMemory)

JWT (Json Web Token)

xUnit (pruebas unitarias)

Frontend

Angular 17 (Standalone Components)

Angular Material

RxJS / Observables

Karma + Jasmine (pruebas unitarias)

Lazy Loading y Guards

4. Estructura del proyecto
todo-app/
├── backend/
│   ├── backend.sln
│   ├── TodoApp.Api/
│   └── TodoApp.Tests/
└── frontend/
    └── todo-front/

5. Instalación y ejecución
5.1 Backend (.NET 9)

Acceder al proyecto:

cd backend/TodoApp.Api


Restaurar dependencias:

dotnet restore


Ejecutar el servidor:

dotnet run --urls=http://localhost:5000


La API quedará disponible en:

http://localhost:5000/api


El backend utiliza una base de datos en memoria (InMemory), sin necesidad de configuración adicional.

5.2 Frontend (Angular)

Acceder al proyecto:

cd frontend/todo-front


Instalar dependencias:

npm install


Verificar la configuración del entorno (src/environments/environment.ts):

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api'
};


Ejecutar la aplicación:

ng serve -o


URL local: http://localhost:4200

6. Credenciales de prueba
email: test@todo.com
password: 123456

7. Funcionalidades implementadas
7.1 Autenticación

Login mediante correo y contraseña.

Generación de token JWT.

Guard de rutas protegidas.

Interceptor que agrega el token en cada petición HTTP.

7.2 Módulo de tareas

Crear, listar, actualizar y eliminar tareas.

Filtrado por estado: todas, completadas, pendientes.

Optimización de listas mediante trackBy.

Persistencia temporal con EF Core InMemory.

7.3 Dashboard

Muestra resumen de tareas:

Total creadas.

Completadas.

Pendientes.

8. Pruebas unitarias
Backend

Proyecto: TodoApp.Tests

Framework: xUnit

Base de datos simulada con UseInMemoryDatabase.

Pruebas implementadas para:

TasksController

TokenService

Ejecutar:

cd backend
dotnet test

Frontend

Framework: Karma + Jasmine

Pruebas implementadas para:

TaskService

TasksPageComponent

AppComponent

Ejecutar:

cd frontend/todo-front
ng test

9. Decisiones técnicas

Arquitectura Angular Standalone: se optó por componentes standalone (Angular 17) en lugar de NgModules tradicionales, manteniendo modularización por features (auth, tasks, dashboard) y carga perezosa (loadComponent).

Manejo de estado: los servicios usan BehaviorSubject y Observables, evitando dependencias adicionales como NgRx.

Validación del backend: se implementaron Data Annotations ([Required], [EmailAddress]) y [ApiController] para validación automática.

Autenticación: el login devuelve un JWT que se utiliza en el resto de endpoints protegidos.

Optimización: uso de trackBy, servicios centralizados y componentes reactivos.

Interceptors: se agregaron para JWT y manejo global de errores (snackbars de notificación).

10. Requisitos del enunciado
Requisito	Implementación
Angular CLI	Sí
Principios de modularización	Sí (Standalone por features)
NgRx o servicios observables	Sí (servicios observables)
Angular Material / responsive	Sí
Lazy Loading	Sí
trackBy en listas	Sí
Pruebas unitarias (front)	Sí (1 servicio y 1 componente)
API RESTful (.NET 9)	Sí
JWT Authentication	Sí
Entity Framework Core	Sí (InMemory)
Validaciones en endpoints	Sí
Pruebas unitarias (backend)	Sí
Interceptor de tokens	Sí
Manejo de errores en cliente	Sí
Swagger / Logging	No (opcional)
11. Posibles mejoras

Persistencia con base de datos real (SQL Server o PostgreSQL).

Manejo de estado global con NgRx.

Documentación automática con Swagger UI.

Logging centralizado (Serilog / NLog).

Docker Compose (backend + frontend).

Pruebas end-to-end (Cypress).

12. Autor

Steven Rodríguez
Desarrollador .NET & Angular
Colombia