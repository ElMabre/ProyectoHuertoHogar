# HuertoHogar 

**HuertoHogar** es una tienda online chilena de productos frescos, naturales y orgánicos, que conecta a las familias con el campo. El proyecto es una solución fullstack simulada (solo frontend, sin backend real) que incluye catálogo, carrito de compras, gestión de usuarios, blog, contacto y un panel de administración, todo persistente en el navegador usando JavaScript y localStorage.

---

## Características principales

- **Catálogo de productos:**  
  Visualización, filtrado y búsqueda de frutas, verduras, productos orgánicos y lácteos.
- **Carrito de compras:**  
  Añadir, eliminar, modificar cantidades y vaciar productos. Persistencia en localStorage.
- **Detalle de producto:**  
  Página individual con información, stock, beneficios y productos relacionados.
- **Registro e inicio de sesión:**  
  Formularios con validaciones personalizadas y persistencia de usuarios en localStorage.
- **Blog:**  
  Artículos sobre alimentación saludable, recetas y sostenibilidad, con vista de detalle.
- **Contacto:**  
  Formulario con validación y contador de caracteres, guardado en localStorage.
- **Panel de administración:**  
  Gestión de productos, usuarios y pedidos (solo interfaz, datos simulados en JS).
- **Responsive:**  
  Diseño adaptado a telefonos y escritorio.
- **Notificaciones:**  
  Uso de toasts para mensajes de éxito, error e información.

## Estructura del proyecto

/
├── admin.html
├── blog.html
├── blog-detalle.html
├── carrito.html
├── contacto.html
├── detalle.html
├── index.html
├── login.html
├── nosotros.html
├── productos.html
├── registro.html
├── css/
│   └── custom.css
├── img/
│   └── ... (imágenes de productos y branding)
├── js/
│   ├── admin.js
│   ├── blog-detalle.js
│   ├── cartManager.js
│   ├── detalle.js
│   ├── main.js
│   ├── mapa.js
│   ├── productManager.js
│   └── validaciones.js
└── README.md

## Instalación y uso

1. **Clona o descarga este repositorio.**
2. **Abre `index.html` en tu navegador.**
3. **Navega por las diferentes páginas desde la barra de navegación.**

> **Nota:**  
> No se requiere backend ni instalación de dependencias.  
> Todo funciona en el navegador usando JavaScript y localStorage.


## Scripts principales

- [`js/main.js`](js/main.js):  
  Funciones generales, inicialización de componentes Bootstrap, toasts y utilidades globales.

- [`js/productManager.js`](js/productManager.js):  
  Lógica de productos, renderizado, filtros y búsqueda.

- [`js/cartManager.js`](js/cartManager.js):  
  Lógica avanzada del carrito de compras, toasts y resumen de compra.

- [`js/validaciones.js`](js/validaciones.js):  
  Validaciones de formularios de login, registro y contacto.

- [`js/admin.js`](js/admin.js):  
  Simulación de panel de administración para productos, usuarios y pedidos.

- [`js/blog-detalle.js`](js/blog-detalle.js):  
  Datos y renderizado de artículos del blog y su vista de detalle.

- [`js/mapa.js`](js/mapa.js):  
  Mapa de ubicaciones de tiendas físicas usando Google Maps.


## Créditos

**Equipo HuertoHogar:**  
- Danilo Celis (Testing)  
- Matias Guzman (Backend)  
- Felipe Quezada (Frontend)

## Vista previa

![Vista previa HuertoHogar](img/huertohogarlogoconfondo.png)


