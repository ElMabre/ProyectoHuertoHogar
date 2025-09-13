# ProyectoHuertoHogar

**HuertoHogar** es una tienda online de productos frescos, naturales y orgánicos, que conecta a las familias chilenas con el campo. El proyecto incluye funcionalidades de catálogo, carrito de compras, gestión de usuarios, blog y un panel de administración.

## Características principales

- **Catálogo de productos:** Visualización, filtrado y búsqueda de frutas, verduras, productos orgánicos y lácteos.
- **Carrito de compras:** Añadir, eliminar, modificar cantidades y vaciar productos. Persistencia en localStorage.
- **Detalle de producto:** Página individual con información, stock, beneficios y productos relacionados.
- **Registro e inicio de sesión:** Formularios con validaciones personalizadas.
- **Blog:** Artículos sobre alimentación saludable, recetas y sostenibilidad.
- **Contacto:** Formulario de contacto con validación y contador de caracteres.
- **Panel de administración:** Gestión de productos, usuarios y pedidos (solo interfaz, datos simulados en JS).
- **Responsive:** Diseño adaptado a dispositivos móviles y escritorio.
- **Notificaciones:** Uso de toasts para mensajes de éxito, error e información.

## Estructura del proyecto

```
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
│   └── ... (imágenes de productos)
├── js/
│   ├── admin.js
│   ├── carrito.js
│   ├── cartManager.js
│   ├── detalle.js
│   ├── main.js
│   ├── productManager.js
│   ├── productos.js
│   └── validaciones.js
└── README.md
```

## Instalación y uso

1. **Clona o descarga el repositorio.**
2. **Abre `index.html` en tu navegador.**
3. **Navega por las diferentes páginas desde la barra de navegación.**

Actualmente no se requiere backend ni instalación de dependencias: todo funciona en el navegador usando JavaScript y localStorage.

## Scripts principales

- [`js/main.js`](js/main.js): Funciones generales, inicialización de tooltips, popovers, manejo de errores y utilidades globales.
- [`js/productManager.js`](js/productManager.js): Lógica de productos, renderizado, filtros y búsqueda.
- [`js/cartManager.js`](js/cartManager.js): Lógica avanzada del carrito de compras, toasts y resumen de compra.
- [`js/validaciones.js`](js/validaciones.js): Validaciones de formularios de login, registro y contacto.
- [`js/admin.js`](js/admin.js): Simulación de panel de administración para productos, usuarios y pedidos.

## Créditos

- **Equipo HuertoHogar:**  
  - Danilo Celis 
  - Matias Guzman 
  - Felipe Quezada 
