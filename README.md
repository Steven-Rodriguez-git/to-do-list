Prueba Técnica Full Stack – To-Do List
## .NET 9 (Backend) + Angular 17 (Frontend)

Este repositorio contiene la solución completa para la prueba técnica Full Stack de gestión de tareas (To-Do List), implementando autenticación y persistencia temporal.

---

## Objetivo del Proyecto

El propósito de este ejercicio es demostrar la capacidad de desarrollar una aplicación moderna, evaluando aspectos clave como:

* Organización y modularización del código.
* Buenas prácticas de desarrollo (patrones de diseño y separación de responsabilidades).
* Manejo de estado y comunicación eficiente entre cliente y servidor.
* Implementación de seguridad (JWT Authentication).
* Cobertura básica de pruebas unitarias en ambos stacks.

---

## Arquitectura General

El sistema está diseñado como un conjunto de dos aplicaciones separadas (Monorepo Lógico) para facilitar el desarrollo y la futura escalabilidad:

| Componente | Stack Tecnológico | Descripción |
| :--- | :--- | :--- |
| **Backend** | **ASP.NET Core 9** (Web API) | Servidor API RESTful con autenticación JWT y persistencia temporal (EF Core InMemory). |
| **Frontend** | **Angular 17** (Standalone) | Aplicación Single Page Application (SPA) con Angular Material, Lazy Loading y manejo de estado basado en Observables. |

### Diagrama Lógico

Tecnologías PrincipalesBackend (todo-app/backend)TecnologíaDescripción.NET 9ASP.NET Core Web API para servicios REST.Entity Framework CoreUtilizado con la base de datos InMemory para persistencia temporal.JWTImplementación de Json Web Token para el control de acceso y autenticación.xUnitFramework de pruebas unitarias.Frontend (todo-app/frontend/todo-front)TecnologíaDescripciónAngular 17Uso de Standalone Components y arquitectura moderna de Angular.Angular MaterialComponentes y diseño para una interfaz limpia y responsiva.RxJS / ObservablesManejo de estado centralizado a través de servicios reactivos.GuardsProtección de rutas.Estructura del Proyectotodo-app/
├── backend/
│   ├── backend.sln
│   ├── TodoApp.Api/             # Proyecto principal de la API .NET 9
│   └── TodoApp.Tests/           # Proyecto de pruebas unitarias (xUnit)
└── frontend/
    └── todo-front/              # Proyecto Angular 17
Instalación y Ejecución1. Backend (.NET 9)El backend utiliza una base de datos en memoria (InMemory), sin necesidad de configuración adicional.Bash# Acceder a la carpeta del proyecto API
cd todo-app/backend/TodoApp.Api

# Restaurar dependencias
dotnet restore

# Ejecutar el servidor. La API estará en http://localhost:5000/api
dotnet run --urls=http://localhost:5000
2. Frontend (Angular 17)Asegúrate de tener Node.js y Angular CLI instalados.Bash# Acceder a la carpeta del frontend
cd todo-app/frontend/todo-front

# Instalar dependencias
npm install

# Verificar la configuración del entorno (apiBaseUrl: 'http://localhost:5000/api')
# src/environments/environment.ts

# Ejecutar la aplicación en modo desarrollo. Se abrirá en el navegador.
ng serve -o
URL Local: http://localhost:4200Credenciales de PruebaUtiliza las siguientes credenciales para iniciar sesión después de ejecutar el proyecto:CampoValorEmailtest@todo.comPassword123456Funcionalidades Implementadas7.1 AutenticaciónLogin: Validación de credenciales y generación de Token JWT.Seguridad: Implementación de Guards para proteger rutas privadas.Intercepción: Un Interceptor que automáticamente adjunta el token JWT en el header de todas las peticiones a la API.7.2 Módulo de TareasCRUD Completo: Crear, listar, actualizar y eliminar tareas.Filtrado: Opciones para ver Todas, Completadas y Pendientes.Optimización: Uso de trackBy en listas para mejorar el rendimiento de Angular.7.3 DashboardVista de resumen con estadísticas clave:Tareas Totales Creadas.Tareas Completadas.Tareas Pendientes.Pruebas UnitariasBackend (xUnit)Proyecto: TodoApp.TestsSe utiliza UseInMemoryDatabase para simular un entorno de persistencia.Áreas cubiertas: TasksController y TokenService.Bash# Ejecutar pruebas del Backend
cd todo-app/backend
dotnet test
Frontend (Karma + Jasmine)Áreas cubiertas: TaskService, TasksPageComponent, y AppComponent.Bash# Ejecutar pruebas del Frontend
cd todo-app/frontend/todo-front
ng test
Decisiones Técnicas ClaveDecisiónJustificaciónAngular StandaloneMaximiza la modularidad por feature sin depender de NgModules, aprovechando Angular 17.Servicios con ObservablesSe utilizó BehaviorSubject y Observables para un manejo de estado reactivo y centralizado, evitando la sobrecarga de dependencias de NgRx para un proyecto pequeño.Autenticación JWTEstándar de la industria para APIs RESTful sin estado, permitiendo la protección granular de endpoints.Interceptors (Frontend)Simplifican la lógica de red al centralizar el manejo de tokens y la notificación de errores globales (ej. snackbars).Validaciones BackendUso de Data Annotations y el atributo [ApiController] para obtener validación automática de modelos en los endpoints.Requisitos del Enunciado (Cumplimiento)RequisitoCumplimientoNotasAngular CLISíPrincipios de ModularizaciónSíStandalone Components por feature.NgRx o servicios observablesSíServicios basados en Observables (RxJS).Angular Material / ResponsiveSíLazy Loading y GuardsSíCarga perezosa de módulos.trackBy en listasSíPara optimización de rendimiento.Pruebas unitarias (front)Sí1 Servicio y 1 Componente.API RESTful (.NET 9)SíJWT AuthenticationSíEntity Framework CoreSíBase de datos InMemory.Validaciones en endpointsSíData Annotations.Pruebas unitarias (backend)SíTasksController y TokenService.Interceptor de tokensSíManejo de errores en clienteSíNotificaciones (snackbars).Swagger / LoggingNoOpcional, listado en Posibles Mejoras.Posibles Mejoras a ImplementarPersistencia Real: Migración de EF Core InMemory a SQL Server o PostgreSQL.Estado Global: Integración de NgRx para el manejo de estado más complejo.Documentación: Implementación de Swagger UI para la documentación automática de la API.DevOps: Configuración de Docker Compose para orquestar Backend y Frontend.Pruebas E2E: Adición de pruebas End-to-End (ej. con Cypress).AutorSteven RodríguezDesarrollador Full Stack (.NET & Angular) | Colombia
