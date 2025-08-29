// Funciones generales para todo el sitio
document.addEventListener('DOMContentLoaded', function() {
    console.log('HuertoHogar cargado correctamente');
    
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializar popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Manejar formularios
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

    // Smooth scroll para anchors
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

    // Manejar imágenes que no cargan
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
            this.alt = 'Imagen no disponible';
        });
    });

    // Actualizar año del copyright
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Cargar carrito count en todas las páginas
    if (typeof cartManager !== 'undefined') {
        cartManager.updateCartCount();
    }
});

// Función para mostrar loading
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

// Función para ocultar loading
function hideLoading(loadingElement) {
    if (loadingElement) {
        loadingElement.remove();
    }
}

// Función para formatear precios
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return emailRegex.test(email);
}

// Función para debounce
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

// Manejar errores globalmente
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
    // Aquí se podría enviar el error a un servicio de tracking
});

// Manejar promises no capturadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rechazada no capturada:', e.reason);
    e.preventDefault();
});

// Exportar funciones para uso global
window.HuertoHogar = {
    showLoading,
    hideLoading,
    formatPrice,
    isValidEmail,
    debounce
};