/**
 * Manejador del carrito de compras para HuertoHogar
 * Gestiona todas las operaciones del carrito usando localStorage
 */

class CartManager {
    constructor() {
        // Inicializa el carrito desde localStorage
        this.cart = this.getCart();
        // Costo de envío fijo
        this.shippingCost = 3500;
    }

    /**
     * Obtiene el carrito del localStorage
     * @returns {Array} Contenido del carrito
     */
    getCart() {
        return JSON.parse(localStorage.getItem('huertohogar_carrito')) || [];
    }

    /**
     * Guarda el carrito en el localStorage
     * @param {Array} cart - Carrito a guardar
     */
    saveCart(cart) {
        localStorage.setItem('huertohogar_carrito', JSON.stringify(cart));
    }

    /**
     * Añade un producto al carrito
     * @param {string} productId - ID del producto a añadir
     * @param {number} quantity - Cantidad a añadir (por defecto 1)
     * @returns {boolean} True si se añadió correctamente
     */
    addToCart(productId, quantity = 1) {
        // Obtener productos del localStorage
        const products = JSON.parse(localStorage.getItem('huertohogar_productos')) || [];
        const product = products.find(p => p.id === productId);

        if (!product) {
            this.showToast('Producto no encontrado', 'danger');
            return false;
        }

        if (product.stock < quantity) {
            this.showToast('No hay suficiente stock disponible', 'warning');
            return false;
        }

        // Buscar si el producto ya está en el carrito
        const existingItemIndex = this.cart.findIndex(item => item.id === productId);

        if (existingItemIndex !== -1) {
            // Actualizar cantidad si ya existe
            const newQuantity = this.cart[existingItemIndex].cantidad + quantity;

            if (newQuantity > product.stock) {
                this.showToast('No hay suficiente stock disponible', 'warning');
                return false;
            }

            this.cart[existingItemIndex].cantidad = newQuantity;
        } else {
            // Añadir nuevo producto al carrito
            this.cart.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                imagen: product.imagen,
                cantidad: quantity
            });
        }

        // Guardar carrito actualizado
        this.saveCart(this.cart);
        this.updateCartCount();

        this.showToast('Producto añadido al carrito', 'success');
        return true;
    }

    /**
     * Elimina un producto del carrito
     * @param {string} productId - ID del producto a eliminar
     * @returns {boolean} True si se eliminó correctamente
     */
    removeFromCart(productId) {
        const initialLength = this.cart.length;
        this.cart = this.cart.filter(item => item.id !== productId);

        if (this.cart.length < initialLength) {
            this.saveCart(this.cart);
            this.updateCartCount();
            this.showToast('Producto eliminado del carrito', 'success');
            return true;
        }

        this.showToast('Producto no encontrado en el carrito', 'warning');
        return false;
    }

    /**
     * Actualiza la cantidad de un producto en el carrito
     * @param {string} productId - ID del producto a actualizar
     * @param {number} newQuantity - Nueva cantidad
     * @returns {boolean} True si se actualizó correctamente
     */
    updateQuantity(productId, newQuantity) {
        const itemIndex = this.cart.findIndex(item => item.id === productId);

        if (itemIndex === -1) {
            this.showToast('Producto no encontrado en el carrito', 'warning');
            return false;
        }

        if (newQuantity <= 0) {
            return this.removeFromCart(productId);
        }

        // Verificar stock disponible
        const products = JSON.parse(localStorage.getItem('huertohogar_productos')) || [];
        const product = products.find(p => p.id === productId);

        if (!product) {
            this.showToast('Producto no encontrado en el inventario', 'danger');
            return this.removeFromCart(productId);
        }

        if (newQuantity > product.stock) {
            this.showToast('No hay suficiente stock disponible', 'warning');
            return false;
        }

        this.cart[itemIndex].cantidad = newQuantity;
        this.saveCart(this.cart);
        this.updateCartCount();
        return true;
    }

    /**
     * Vacía todo el carrito
     * @returns {boolean} True si se vació correctamente
     */
    clearCart() {
        if (this.cart.length === 0) {
            this.showToast('El carrito ya está vacío', 'info');
            return false;
        }

        this.cart = [];
        this.saveCart(this.cart);
        this.updateCartCount();

        this.showToast('Carrito vaciado', 'success');
        return true;
    }

    /**
     * Calcula el subtotal del carrito
     * @returns {number} Subtotal del carrito
     */
    calculateSubtotal() {
        return this.cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    /**
     * Calcula el costo de envío
     * @returns {number} Costo de envío
     */
    calculateShipping() {
        return this.cart.length > 0 ? this.shippingCost : 0;
    }

    /**
     * Calcula el total del carrito (subtotal + envío)
     * @returns {number} Total del carrito
     */
    calculateTotal() {
        return this.calculateSubtotal() + this.calculateShipping();
    }

    /**
     * Obtiene el número total de items en el carrito
     * @returns {number} Cantidad total de items
     */
    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.cantidad, 0);
    }

    /**
     * Verifica si el carrito está vacío
     * @returns {boolean} True si el carrito está vacío
     */
    isEmpty() {
        return this.cart.length === 0;
    }

    /**
     * Renderiza el carrito en la página (para carrito.html)
     */
    renderCart() {
        const cartTable = document.getElementById('cartTable');
        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping');
        const totalEl = document.getElementById('cartTotal');

        if (!cartTable || !subtotalEl || !shippingEl || !totalEl) return;

        if (this.isEmpty()) {
            cartTable.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center py-5">
                        <i class="bi bi-cart-x display-1 text-muted"></i>
                        <h4 class="mt-3">Tu carrito está vacío</h4>
                        <a href="productos.html" class="btn btn-primary mt-3">Ver productos</a>
                    </td>
                </tr>
            `;
            subtotalEl.textContent = '0';
            shippingEl.textContent = '0';
            totalEl.textContent = '0';
            return;
        }

        cartTable.innerHTML = this.cart.map(item => {
            const subtotal = item.precio * item.cantidad;
            return `
                <tr>
                    <td>
                        <img src="${item.imagen}" class="product-img-sm me-2" alt="${item.nombre}">
                        ${item.nombre}
                    </td>
                    <td>$${item.precio.toLocaleString('es-CL')}</td>
                    <td>
                        <input type="number" class="form-control input-cantidad-carrito" min="1" max="99" 
                               value="${item.cantidad}" 
                               onchange="cartManager.updateQuantity('${item.id}', this.value); cartManager.renderCart();">
                    </td>
                    <td>$${subtotal.toLocaleString('es-CL')}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" 
                                onclick="cartManager.removeFromCart('${item.id}'); cartManager.renderCart();">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        subtotalEl.textContent = this.calculateSubtotal().toLocaleString('es-CL');
        shippingEl.textContent = this.calculateShipping().toLocaleString('es-CL');
        totalEl.textContent = this.calculateTotal().toLocaleString('es-CL');
    }

    /**
     * Actualiza el contador de carrito en la navbar
     */
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
            cartCount.style.display = this.getTotalItems() > 0 ? 'inline' : 'none';
        }
    }

    /**
     * Muestra una notificación toast
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de toast (success, danger, warning, info)
     */
    showToast(message, type = 'info') {
        // Usar la función global showToast si existe, si no usar alert
        if (typeof window.showToast === 'function') {
            window.showToast(message, type);
        } else {
            alert(message);
        }
    }
}

// Instancia global del manejador del carrito
const cartManager = new CartManager();

// Inicializar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar carrito solo si existe la tabla
    if (document.getElementById('cartTable')) {
        cartManager.renderCart();
    }
    cartManager.updateCartCount();
});