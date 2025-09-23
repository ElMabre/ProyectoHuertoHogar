/**
 * Funciones generales para todo el sitio HuertoHogar
 * Inicializa componentes de Bootstrap y funcionalidades comunes
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('HuertoHogar cargado correctamente');
    
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Inicializar popovers de Bootstrap
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Validación de formularios con la clase .needs-validation
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
    
    // Smooth scroll para enlaces internos (anchors)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Manejar imágenes que no cargan: reemplaza por una imagen placeholder
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
            this.alt = 'Imagen no disponible';
        });
    });
    
    // Actualiza el año actual en el footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Actualizar contador de carrito en la barra de navegación
    updateCartCount();
    
    // Verificar si el usuario está autenticado y actualizar la UI
    updateAuthUI();
    
    // Mostrar productos destacados en el home
    const featuredContainer = document.getElementById('featuredProducts');
    if (featuredContainer && window.productManager) {
        const destacados = window.productManager.getFeaturedProducts(3);
        featuredContainer.innerHTML = destacados.map(product => `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <a href="detalle.html?id=${product.id}">
                        <img src="${product.imagen}" class="card-img-top product-img img-fluid" alt="${product.nombre}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title" style="color: #8B4513;">${product.nombre}</h5>
                        <p class="card-text">${product.descripcion.substring(0, 80)}...</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-bold text-success">$${product.precio.toLocaleString('es-CL')}</span>
                            <span class="badge bg-secondary">${product.categoria}</span>
                        </div>
                        <small class="text-muted d-block mt-1">Origen: ${product.origen}</small>
                        <div class="mt-3">
                            <button class="btn btn-warning w-100" onclick="addToCart('${product.id}')">
                                <i class="bi bi-cart-plus"></i> Añadir al carrito
                            </button>
                            <a href="detalle.html?id=${product.id}" class="btn btn-outline-secondary w-100 mt-2">
                                Ver detalles
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
});

/**
 * Actualiza el contador de productos en el carrito en la barra de navegación
 */
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('huertohogar_carrito')) || [];
        const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

/**
 * Actualiza la interfaz según el estado de autenticación del usuario
 */
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authLinks = document.querySelectorAll('.auth-link');
    const userLinks = document.querySelectorAll('.user-link');
    
    if (currentUser) {
        // Usuario autenticado - ocultar enlaces de auth y mostrar enlaces de usuario
        authLinks.forEach(link => link.classList.add('d-none'));
        userLinks.forEach(link => link.classList.remove('d-none'));
        
        // Mostrar nombre de usuario
        const userName = document.getElementById('userName');
        if (userName) {
            userName.textContent = currentUser.nombre;
        }
        
    } else {
        // Usuario no autenticado - mostrar enlaces de auth y ocultar enlaces de usuario
        authLinks.forEach(link => link.classList.remove('d-none'));
        userLinks.forEach(link => link.classList.add('d-none'));
    }
}

/**
 * Función para cerrar sesión
 */
function logout() {
    logoutUsuario();
}

/**
 * Muestra una notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de toast (success, danger, warning, info)
 */
function showToast(message, type = 'info') {
    // Crear contenedor de toasts si no existe
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    // Crear toast
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast align-items-center text-bg-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    // Contenido del toast
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    // Añadir toast al contenedor
    toastContainer.appendChild(toast);
    
    // Mostrar toast
    const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: 3000
    });
    bsToast.show();
    
    // Eliminar toast del DOM después de ocultarse
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

/**
 * Formatea un precio como moneda chilena
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado como CLP
 */
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
}

/**
 * Muestra un overlay de carga
 * @param {boolean} show - Si se debe mostrar u ocultar el overlay
 */
function showLoadingOverlay(show = true) {
    let overlay = document.getElementById('loadingOverlay');
    
    if (show) {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'loadingOverlay';
            overlay.className = 'loading-overlay';
            overlay.innerHTML = `
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            `;
            document.body.appendChild(overlay);
        } else {
            overlay.style.display = 'flex';
        }
    } else if (overlay) {
        overlay.style.display = 'none';
    }
}

/**
 * Función global para añadir productos al carrito desde botones
 * @param {string} productId
 * @param {number} quantity
 */
function addToCart(productId, quantity = 1) {
    // Obtener el carrito actual
    let cart = JSON.parse(localStorage.getItem('huertohogar_carrito')) || [];
    
    // Buscar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        // Actualizar cantidad si ya existe
        cart[existingItemIndex].cantidad += quantity;
    } else {
        // Obtener información del producto
        const products = JSON.parse(localStorage.getItem('huertohogar_productos')) || [];
        const product = products.find(p => p.id === productId);
        
        if (product) {
            // Añadir nuevo producto al carrito
            cart.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                imagen: product.imagen,
                cantidad: quantity
            });
        }
    }
    
    // Guardar carrito actualizado
    localStorage.setItem('huertohogar_carrito', JSON.stringify(cart));
    
    // Actualizar contador
    updateCartCount();
    
    // Mostrar notificación
    showToast('Producto añadido al carrito', 'success');
}