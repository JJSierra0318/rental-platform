======================================
Braevon - Plataforma de Renta de Propiedades
======================================

Descripción
-----------
Braevon es una aplicación web de una sola página (SPA) para la renta y gestión de propiedades inmobiliarias. Construida con las últimas tecnologías de Angular, ofrece una experiencia fluida y reactiva tanto para inquilinos que buscan su próximo hogar como para dueños que desean gestionar sus propiedades y solicitudes de renta.


Características Principales
-------------------------

Funcionalidades Generales:
* Página de Inicio: Una página principal con un buscador prominente y una lista de propiedades destacadas para atraer a los visitantes.
* Búsqueda y Filtro: Un buscador que permite filtrar propiedades por ciudad y texto libre tanto en la página de inicio como en el panel de usuario.
* Sistema de Autenticación:
    - Registro de Usuarios: Formulario con validaciones en tiempo real.
    - Inicio de Sesión: Autenticación contra el backend mediante JWT (JSON Web Tokens).
    - Gestión de Sesión: El menú de navegación se adapta dinámicamente, mostrando opciones diferentes para usuarios autenticados y no autenticados.

Funcionalidades para Inquilinos (Usuarios Autenticados):
* Vista de Detalle Protegida: Acceso a la información completa de una propiedad solo para usuarios registrados.
* Solicitud de Renta: Posibilidad de enviar una solicitud de renta para una propiedad disponible. El botón se deshabilita si la propiedad ya está alquilada.
* Historial de Rentas: Una sección personal para ver el historial y el estado (pendiente, aceptada, rechazada) de todas las solicitudes de renta enviadas.

Funcionalidades para Dueños (Usuarios Autenticados):
* Creación de Propiedades: Formulario protegido para publicar nuevas propiedades en la plataforma.
* Edición de Propiedades: Opción para modificar los detalles de una propiedad (título, precio, estado), disponible solo para el dueño.
* Gestión de Solicitudes: Un panel donde los dueños pueden ver todas las solicitudes de renta para sus propiedades y aceptarlas o rechazarlas.


Stack Tecnológico
-----------------
Este proyecto fue construido utilizando las mejores prácticas y un stack de tecnologías moderno:

* Framework: Angular 18+
* Lenguaje: TypeScript
* Estilos: SCSS y Bootstrap 5 para un diseño responsivo y consistente.
* Gestión de Estado: Servicios de Angular con RxJS (BehaviorSubject) para una gestión de estado reactiva y centralizada.
* Cliente HTTP: HttpClient de Angular con Interceptors para la inyección automática de tokens de autenticación.
* Enrutamiento: Angular Router con Route Guards para proteger rutas.
* Formularios: Reactive Forms para la gestión de formularios complejos con validaciones.


Cómo Empezar
------------
Siga estos pasos para ejecutar el proyecto en un entorno de desarrollo local.

Prerrequisitos:
* Node.js (versión 18 o superior)
* Angular CLI (versión 18 o superior)

Instalación:

1. Clonar el repositorio:
   git clone https://github.com/tu-usuario/braevon-rental-platform.git
   cd braevon-rental-platform

2. Instalar las dependencias:
   npm install

3. Configurar las variables de entorno:
   - Cree una carpeta "environments" dentro de "src".
   - Dentro de "src/environments", cree el archivo "environment.ts" con el siguiente contenido, reemplazando la URL por la de su API:
     
     export const environment = {
       production: false,
       apiUrl: 'URL_DE_SU_API_DE_DESARROLLO'
     };

4. Ejecutar el servidor de desarrollo:
   ng serve
   
   Navegue a http://localhost:4200/. La aplicación se recargará automáticamente si realiza cambios en los archivos fuente.