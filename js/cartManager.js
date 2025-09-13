// Clase principal para la gestión avanzada del carrito de compras
class CartManager {
    constructor() {
        // Inicializa el carrito desde localStorage o como array vacío
        this.cart = JSON.parse(localStorage.getItem('huertohogar_cart')) || [];
        this.updateCartCount(); // Actualiza el contador de productos en el icono del carrito
    }

    // Agrega un producto al carrito (por ID y cantidad)
    addToCart(productId, quantity = 1) {
        // Obtiene la lista de productos desde productManager o una lista local
        const products = window.productManager ? window.productManager.products : this.getLocalProducts();
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            this.showAlert('Producto no encontrado', 'danger');
            return;
        }

        // Si el producto ya está en el carrito, suma la cantidad
        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            // Si no está, lo agrega como nuevo
            this.cart.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                imagen: product.imagen,
                quantity: quantity
            });
        }

        this.saveCart(); // Guarda el carrito en localStorage
        this.showAddedToCartAlert(product.nombre); // Muestra alerta de éxito
    }

    // Elimina un producto del carrito por su ID
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        // Si existe la función de renderizado, la ejecuta para actualizar la vista
        if (typeof this.renderCart === 'function') {
            this.renderCart();
        }
    }

    // Actualiza la cantidad de un producto en el carrito
    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity); // No permite cantidades menores a 1
            this.saveCart();
            if (typeof this.renderCart === 'function') {
                this.renderCart();
            }
        }
    }

    // Vacía todo el carrito, con confirmación
    clearCart() {
        if (this.cart.length === 0) {
            this.showAlert('El carrito ya está vacío', 'info');
            return;
        }

        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            this.cart = [];
            this.saveCart();
            this.showAlert('Carrito vaciado', 'success');
            if (typeof this.renderCart === 'function') {
                this.renderCart();
            }
        }
    }

    // Calcula el total del carrito (sin envío)
    getTotal() {
        return this.cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
    }

    // Devuelve el subtotal (igual al total en este caso)
    getSubtotal() {
        return this.getTotal();
    }

    // Calcula el costo de envío (fijo si hay productos)
    getShipping() {
        return this.cart.length > 0 ? 2500 : 0;
    }

    // Devuelve el total final (subtotal + envío)
    getGrandTotal() {
        return this.getTotal() + this.getShipping();
    }

    // Guarda el carrito en localStorage y actualiza el contador
    saveCart() {
        localStorage.setItem('huertohogar_cart', JSON.stringify(this.cart));
        this.updateCartCount();
    }

    // Actualiza el contador de productos en el icono del carrito (puede haber varios en la página)
    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cartCount');
        cartCountElements.forEach(element => {
            element.textContent = count;
        });
    }

    // Muestra una alerta tipo toast cuando se agrega un producto
    showAddedToCartAlert(productName) {
        this.showAlert(`${productName} añadido al carrito`, 'success');
    }

    // Muestra un toast de Bootstrap con mensaje y tipo (success, info, danger, etc)
    showAlert(message, type = 'info') {
        // Usa un contenedor de toasts, lo crea si no existe
        const toastContainer = document.getElementById('toastContainer') || this.createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type}`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-info-circle-fill'} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Elimina el toast del DOM cuando termina la animación
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    // Crea el contenedor de toasts si no existe
    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(container);
        return container;
    }

    // Renderiza el carrito en la tabla HTML correspondiente
    renderCart() {
        const cartTable = document.getElementById('cartTable');
        const cartTotal = document.getElementById('cartTotal');
        const subtotal = document.getElementById('subtotal');
        const shipping = document.getElementById('shipping');
        
        if (!cartTable) return;

        if (this.cart.length === 0) {
            cartTable.innerHTML = '<tr><td colspan="5" class="text-center py-4">Tu carrito está vacío</td></tr>';
            if (cartTotal) cartTotal.textContent = '0';
            if (subtotal) subtotal.textContent = '0';
            if (shipping) shipping.textContent = '0';
            return;
        }

        // Genera las filas de la tabla con los productos del carrito
        cartTable.innerHTML = this.cart.map(item => `
            <tr class="fade-in">
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.imagen}" alt="${item.nombre}" class="rounded me-3 product-img product-img-sm img-fluid">
                        <span>${item.nombre}</span>
                    </div>
                </td>
                <td>$${item.precio.toLocaleString('es-CL')}</td>
                <td>
                    <div class="input-group" style="width: 120px;">
                        <button class="btn btn-outline-secondary" type="button" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <input type="number" class="form-control text-center" value="${item.quantity}" min="1" 
                               onchange="cartManager.updateQuantity('${item.id}', parseInt(this.value))">
                        <button class="btn btn-outline-secondary" type="button" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </td>
                <td>$${(item.precio * item.quantity).toLocaleString('es-CL')}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="cartManager.removeFromCart('${item.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        // Actualiza los totales en la vista
        if (cartTotal) cartTotal.textContent = this.getGrandTotal().toLocaleString('es-CL');
        if (subtotal) subtotal.textContent = this.getSubtotal().toLocaleString('es-CL');
        if (shipping) shipping.textContent = this.getShipping().toLocaleString('es-CL');
    }

    // Devuelve una lista local de productos si no existe productManager
    getLocalProducts() {
        return [
            {
                id: 'FR001',
                nombre: 'Manzanas Fuji',
                precio: 1200,
                imagen: 'img/manzana.jpg',
                categoria: 'frutas'
            },
            {
                id: 'FR002',
                nombre: 'Naranjas Valencia',
                precio: 1000,
                imagen: 'img/naranja.jpg',
                categoria: 'frutas'
            },
            {
                id: 'VR001',
                nombre: 'Zanahorias Orgánicas',
                precio: 900,
                imagen: 'img/zanahoria.jpg',
                categoria: 'verduras'
            },
            {
                id: 'VR002',
                nombre: 'Espinacas Frescas',
                precio: 700,
                imagen: 'img/espinaca.jpg',
                categoria: 'verduras'
            },
            {
                id: 'PO001',
                nombre: 'Miel Orgánica',
                precio: 5000,
                imagen: 'img/miel.jpg',
                categoria: 'organicos'
            }
        ];
    }
}

// Inicializar el carrito global
const cartManager = new CartManager();

// Función global para añadir al carrito
function addToCart(productId, quantity = 1) {
    cartManager.addToCart(productId, quantity);
}