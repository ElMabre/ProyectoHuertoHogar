// Funciones generales para todo el sitio
document.addEventListener('DOMContentLoaded', function() {
    // Mensaje de consola para confirmar carga del sitio
    console.log('HuertoHogar cargado correctamente');
    
    // Inicializar tooltips de Bootstrap en todos los elementos con data-bs-toggle="tooltip"
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializar popovers de Bootstrap en todos los elementos con data-bs-toggle="popover"
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Validación de formularios con la clase .needs-validation (Bootstrap)
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
        anchor.addEventListener('click', function (e) {
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

    // Actualiza el año actual en el elemento con id 'currentYear' (footer)
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Actualiza el contador del carrito en todas las páginas si existe cartManager
    if (typeof cartManager !== 'undefined') {
        cartManager.updateCartCount();
    }
});

// Función para mostrar un overlay de loading/spinner
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>
    `;
    document.body.appendChild(loading);
    return loading;
}

// Función para ocultar el overlay de loading/spinner
function hideLoading(loadingElement) {
    if (loadingElement) {
        loadingElement.remove();
    }
}

// Función para formatear precios en CLP (Chile)
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
}

// Función para validar emails permitidos (duoc.cl, profesor.duoc.cl, gmail.com)
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return emailRegex.test(email);
}

// Función debounce: limita la frecuencia de ejecución de una función
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Manejo global de errores de JavaScript
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
    // Aquí se podría enviar el error a un servicio de tracking
});

// Manejo global de promesas no capturadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rechazada no capturada:', e.reason);
    e.preventDefault();
});

// Exporta funciones utilitarias al objeto global window.HuertoHogar
window.HuertoHogar = {
    showLoading,
    hideLoading,
    formatPrice,
    isValidEmail,
    debounce
};