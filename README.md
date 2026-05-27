# Multiservicios Express HVAC ❄️🔥

Este proyecto es una plataforma web full-stack premium para **Multiservicios Express HVAC**, una empresa especializada en refrigeración industrial, climatización comercial y sistemas de aire acondicionado. 

La plataforma está diseñada con una estética de alta gama (utilizando variables HSL, gradientes activos, glassmorphism y micro-animaciones) y ofrece una integración robusta entre un frontend en **React** y un backend en **Node.js + Express** con persistencia flexible (MongoDB o archivos JSON locales).

---

## 🚀 Características Clave

1. **Frontend Premium**:
   - **Estilo Puro (Vanilla CSS)**: Variables CSS dinámicas, paletas HSL afinadas para climatización y total adaptabilidad en móviles y escritorio.
   - **Animaciones Fluidas**: Integración de transiciones nativas de CSS y `framer-motion` para interactividad sutil en scroll y al pasar el cursor.
   - **Secciones Requeridas**: Inicio/Hero, Beneficios Rápidos, Servicios Detallados, Sobre Nosotros (con historia de 10 años), Casos de Éxito/Testimonios, y Formulario de Contacto.

2. **Backend Express.js API**:
   - **Endpoints de Contacto**: Procesamiento estructurado de mensajes mediante un endpoint POST.
   - **Base de Datos Híbrida**: Se conecta automáticamente a una base de datos **MongoDB** (vía Mongoose) si está configurado en `.env`. De lo contrario, se activa un **fallback automático a almacenamiento JSON local** (`backend/data/messages.json`), garantizando el funcionamiento instantáneo sin requerir configuraciones de bases de datos externas.
   - **Simulador de Emails**: Emula el envío automático de notificaciones de correo para cada consulta y permite conectar un servicio SMTP real (Nodemailer).

3. **Panel Administrativo Integrado (Extra)**:
   - Sección interactiva en el frontend protegida por contraseña local (`admin123`).
   - Muestra estadísticas rápidas (total de consultas recibidas, mensajes sin leer).
   - Tabla interactiva para leer consultas en tiempo real, marcarlas como leídas/nuevas y borrarlas permanentemente.
   - Botón de **"Simular Responder"** que prellena una plantilla de correo vía cliente local (`mailto:`) para responder ágilmente al cliente.

---

## 📂 Arquitectura del Proyecto

```text
aire-express/
├── backend/                   # Servidor Node.js + Express
│   ├── data/                  # Base de datos JSON de respaldo local
│   ├── src/
│   │   ├── config/            # Conexión híbrida (MongoDB / JSON local)
│   │   ├── models/            # Modelo de consulta unificado
│   │   ├── routes/            # Rutas de API (Envío de mensajes y Admin)
│   │   └── server.js          # Punto de entrada de la API
│   ├── .env                   # Configuración del entorno
│   └── package.json           # Dependencias del servidor
│
├── frontend/                  # Aplicación de usuario y admin en React
│   ├── public/                # Logos y assets estáticos
│   ├── src/
│   │   ├── components/        # Componentes UI encapsulados
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Benefits.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx            # Controlador de estado de la aplicación
│   │   ├── App.css            # Sistema de diseño y hojas de estilo premium
│   │   ├── index.css          # Fuentes e imports base
│   │   └── main.jsx
│   ├── index.html             # Plantilla HTML base con optimizaciones SEO
│   └── package.json           # Dependencias de React + Vite
│
└── package.json               # Orquestador raíz para instalaciones y scripts paralelos
```

---

## 🛠️ Instalación y Configuración

### Requisitos Previos
- Tener instalado **Node.js** (v16 o superior).

### Paso 1: Clonar e Instalar Dependencias
Desde la raíz del proyecto (`aire-express`), ejecuta el comando orquestador para instalar todas las dependencias del frontend y del backend automáticamente:

```bash
npm run install-all
```

### Paso 2: Configurar las Variables de Entorno (Opcional)
En `/backend` encontrarás un archivo `.env` configurado por defecto. Si deseas conectar MongoDB o configurar el envío real de correos, puedes editarlo siguiendo esta estructura:

```env
PORT=5000
ADMIN_SECRET=admin123

# Opcional: URL de conexión de MongoDB
# MONGO_URI=mongodb+srv://tu-usuario:tu-clave@cluster.mongodb.net/hvac

# Opcional: Configuración SMTP para envío real de correos
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USER=tu-correo@gmail.com
# EMAIL_PASS=tu-contraseña-de-aplicación
# EMAIL_RECEIVER=info@expresshvac.com
```

---

## 🚦 Ejecución en Desarrollo

Para iniciar el servidor backend de Express y el servidor de desarrollo de Vite (React) de manera paralela con un solo comando, simplemente ejecuta en la raíz del proyecto:

```bash
npm run dev
```

El script iniciará:
- **Backend API**: En ejecutándose en [http://localhost:5000](http://localhost:5000).
- **Frontend SPA**: En ejecutándose en [http://localhost:5173](http://localhost:5173) (o el puerto que asigne Vite).

---

## 🔐 Credenciales por Defecto del Panel Admin
Para ingresar al panel de control de mensajes recibidos, dirígete al link "Acceso Administrador" en el pie de página de la web o haz clic en "Admin" en el menú e introduce:
- **Contraseña**: `admin123`

---

## 🚀 Despliegue (Production Build)
Para compilar la aplicación React optimizada para producción:

```bash
npm run build --prefix frontend
```

Esto generará la carpeta estática `/dist` dentro de `/frontend`, lista para desplegarse en plataformas como **Vercel**, **Netlify**, o **Render**. El backend Node.js se puede desplegar fácilmente en **Render**, **Railway**, o **Heroku**.
