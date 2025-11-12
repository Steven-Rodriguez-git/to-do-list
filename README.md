# To-Do List – Prueba Técnica (.NET 9 + Angular 17)

## 1. Objetivo

Desarrollar una aplicación **To-Do List** que permita la gestión de tareas con autenticación JWT, implementando buenas prácticas tanto en el backend (.NET 9) como en el frontend (Angular 17).

---

## 2. Arquitectura general

El proyecto está compuesto por:

- **Backend:** ASP.NET Core 9 con Entity Framework Core (InMemory), autenticación JWT, validación de modelos y documentación con Swagger.  
- **Frontend:** Angular 17 con componentes Standalone, Angular Material, interceptores JWT, manejo de estado con observables y lazy loading.

todo-app/
├── backend/
│ ├── backend.sln
│ ├── TodoApp.Api/
│ └── TodoApp.Tests/
└── frontend/
└── todo-front/

yaml
Copy code

---

## 3. Tecnologías utilizadas

**Backend**
- .NET 9 – ASP.NET Core Web API
- Entity Framework Core 9 (InMemory)
- JWT Authentication
- Swashbuckle.AspNetCore 6.6.2 (Swagger)
- xUnit (pruebas unitarias)

**Frontend**
- Angular 17 (Standalone Components)
- Angular Material
- RxJS / Observables
- Karma + Jasmine (pruebas unitarias)
- Lazy Loading y Guards

---

## 4. Instalación y ejecución

### Backend (.NET 9)

1. Abrir carpeta del backend:
   ```bash
   cd backend/TodoApp.Api
Restaurar dependencias:

bash
Copy code
dotnet restore
Ejecutar el servidor:

bash
Copy code
dotnet run --urls=http://localhost:5000
Acceder a la API:

bash
Copy code
http://localhost:5000/api
Documentación Swagger:

bash
Copy code
http://localhost:5000/swagger
El backend utiliza una base de datos en memoria (UseInMemoryDatabase("TodoDb")).

Frontend (Angular)
Entrar al proyecto:

bash
Copy code
cd frontend/todo-front
Instalar dependencias:

bash
Copy code
npm install
Verificar la URL del backend en src/environments/environment.ts:

ts
Copy code
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api'
};
Ejecutar la aplicación:

bash
Copy code
ng serve -o
URL de desarrollo:
http://localhost:4200

5. Credenciales de prueba
makefile
Copy code
email: test@todo.com
password: 123456
6. Funcionalidades
Autenticación
Inicio de sesión con correo y contraseña.

Generación y validación de JWT.

Guard para rutas protegidas.

Interceptor que agrega el token automáticamente.

Tareas
Crear, listar, actualizar y eliminar tareas.

Filtrar por estado: todas, completadas o pendientes.

trackBy en listas (optimización).

Notificaciones con MatSnackBar.

Dashboard
Métricas básicas:

Total de tareas

Completadas

Pendientes

7. Pruebas unitarias
Backend
Framework: xUnit

Proyecto: TodoApp.Tests

Base de datos simulada con UseInMemoryDatabase

Pruebas sobre TasksController y TokenService

Ejecutar:

bash
Copy code
cd backend
dotnet test
Frontend
Framework: Karma + Jasmine

Pruebas incluidas:

task.service.spec.ts

tasks-page.component.spec.ts

app.component.spec.ts

Ejecutar:

bash
Copy code
cd frontend/todo-front
ng test
8. Decisiones técnicas
Standalone Components: modularización por features (auth, tasks, dashboard) sin NgModules tradicionales.

Manejo de estado: servicios con BehaviorSubject y Observables.

Validaciones: [Required], [EmailAddress] y [ApiController] para validación automática.

Swagger: documentación de endpoints con JWT “Authorize”.

Optimización: uso de trackBy, interceptores, y componentes reutilizables.

