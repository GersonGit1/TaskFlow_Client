# 🧩 Task Flow Frontend

Frontend de **Task Flow**, una aplicación moderna para la **gestión de proyectos, tareas y colaboradores**, desarrollada con **React**, **TypeScript** y **TailwindCSS**.  
Este proyecto forma parte del stack completo **MERN (MongoDB, Express, React, Node.js)**.

---

## 🚀 Características

- ✅ **Autenticación segura con JWT**
- 🧠 **Gestión de usuarios, proyectos, tareas y colaboradores**
- 📦 **Integración con React Query** para caché y control de estado de datos
- 🧭 **Ruteo dinámico** con React Router
- 🎨 **Diseño moderno y responsivo** con TailwindCSS
- 🔐 **Protección contra ataques comunes** (XSS, CSRF, etc.) en combinación con backend seguro
- 🧩 **Drag & Drop intuitivo** para organizar tareas usando `@dnd-kit`
- 💬 **Notificaciones y alertas** con `react-toastify`

---

## 🏗️ Tecnologías principales

| Categoría | Tecnologías |
|------------|-------------|
| **Framework** | React + Vite |
| **Lenguaje** | TypeScript |
| **Estilos** | TailwindCSS |
| **Estado / Datos** | React Query |
| **Routing** | React Router DOM |
| **Drag & Drop** | @dnd-kit/core |
| **Alertas** | react-toastify |
| **Linting / Formato** | ESLint |

---

## ⚙️ Instalación y configuración

1. **Clona el repositorio**
   git clone https://github.com/tu-usuario/uptask-frontend.git
2. **Instala dependencias**
   npm install
3. **Configura las variables de entorno**
   Crea un archivo .env.local en la raíz del proyecto con el contenido:
   VITE_API_URL=http://localhost:4000/api o la url que le hayas asignado al servidor
4. **Ejecuta la app en entorno de desarrollo**
   npm run dev
5. **Abre la app en el navegador**
   abre tu navegador en http://localhost:5173


## Estructura del proyecto

src/
│
├── lib/                # configuración de axios
├── components/         # Componentes reutilizables
├── hooks/              # Hooks personalizados
├── layouts/            # Layouts principales (público, privado)
├── services/           # Llamadas a la API
├── types/              # Tipos TypeScript
├── utils/              # Funciones auxiliares
└── views/              # Vistas

🧑‍💻 Autor

Gerson Amaya
Desarrollador Full Stack — apasionado por crear herramientas útiles, escalables y seguras.

📧 Contacto: amayagerson235@gmail.com