# Multiservicios Express HVAC 

> Este es un sitio web completo para gestionar la información de servicios y los mensajes de clientes de la empresa de aire acondicionado y refrigeración Multiservicios Express HVAC.


## Características

*   **Página pública:** Aquí mostramos la historia de la empresa, los distintos servicios técnicos que ofrecemos y opiniones de algunos clientes.
*   **Formulario de contacto:** Los usuarios pueden mandar consultas o pedir presupuestos directamente.
*   **Panel de administración:** Es una sección oculta protegida con clave para que podamos leer, marcar como leídos o borrar los correos de los clientes.
*   **Base de datos híbrida:** Los mensajes se guardan en una base de datos en MongoDB. Pero si no tienes base de datos instalada, el sistema usa un archivo JSON local en la carpeta del servidor para que funcione sin configurar nada.

## Tecnologías Utilizadas

*   [React](https://reactjs.org/) - Lo usamos para armar toda la interfaz visual estructurada en componentes.
*   [Vite](https://vite.dev/) - La herramienta para que la página compile rápido mientras desarrollamos.
*   [Node.js](https://nodejs.org/) - El entorno que permite correr el servidor en Javascript.
*   [Express](https://expressjs.com/) - El framework de NodeJS con el que programamos las rutas y la API del servidor.
*   [MongoDB](https://www.mongodb.com/) - La base de datos no relacional para guardar los mensajes de los clientes.

## Instalación y Configuración

Sigue estos pasos para configurar el proyecto en tu entorno local.

### Prerrequisitos

Necesitas tener instalado:
*   Node.js (versión 18 o superior)
*   npm o yarn (el gestor de paquetes de tu preferencia)

### Pasos a seguir

1. Instala todas las dependencias del frontend y del backend ejecutando este comando en la terminal desde la raíz del proyecto:
   ```bash
   npm run install-all
   ```

2. Inicia tanto el backend como el frontend al mismo tiempo corriendo:
   ```bash
   npm run dev
   ```

3. Y por último, abre el navegador en `http://localhost:5173` para probar la página web. Pero ten en cuenta que el backend debe quedarse corriendo en segundo plano en el puerto `5000` para que el formulario funcione correctamente.
