Braevon - Plataforma de Renta de Propiedades
Descripción
Braevon es una aplicación web de una sola página (SPA) para la renta y gestión de propiedades inmobiliarias. Construida con las últimas tecnologías de Angular, ofrece una experiencia fluida y reactiva tanto para inquilinos que buscan su próximo hogar como para dueños que desean gestionar sus propiedades y solicitudes de renta.

Stack Tecnológico
Este proyecto fue construido utilizando las mejores prácticas y un stack de tecnologías moderno:

Framework: Angular 18+

Lenguaje: TypeScript

Estilos: SCSS y Bootstrap 5 para un diseño responsivo y consistente.

Gestión de Estado: Servicios de Angular con RxJS (BehaviorSubject) para una gestión de estado reactiva y centralizada.

Cliente HTTP: HttpClient de Angular con Interceptors para la inyección automática de tokens de autenticación.

Enrutamiento: Angular Router con Route Guards para proteger rutas.

Formularios: Reactive Forms para la gestión de formularios complejos con validaciones.

Cómo Empezar
Siga estos pasos para ejecutar el proyecto en un entorno de desarrollo local.

Prerrequisitos
Node.js (versión 18 o superior)

Angular CLI (versión 18 o superior)

Instalación
Clonar el repositorio:

Bash

git clone https://github.com/tu-usuario/braevon-rental-platform.git
cd braevon-rental-platform
Instalar las dependencias:

Bash

npm install
Configurar las variables de entorno:

Cree una carpeta environments dentro de src.

Dentro de src/environments, cree el archivo environment.ts con el siguiente contenido, reemplazando la URL por la de su API:

TypeScript

export const environment = {
  production: false,
  apiUrl: 'URL_DE_SU_API_DE_DESARROLLO'
};
Ejecutar el servidor de desarrollo:

Bash

ng serve
Navegue a http://localhost:4200/. La aplicación se recargará automáticamente si realiza cambios en los archivos fuente.
