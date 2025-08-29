class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('huertohogar_cart')) || [];
        this.updateCartCount();
    }

    addToCart(productId, quantity = 1) {
        // Obtener productos del productManager o de una lista local
        const products = window.productManager ? window.productManager.products : this.getLocalProducts();
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            this.showAlert('Producto no encontrado', 'danger');
            return;
        }

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                imagen: product.imagen,
                quantity: quantity
            });
        }

        this.saveCart();
        this.showAddedToCartAlert(product.nombre);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        if (typeof this.renderCart === 'function') {
            this.renderCart();
        }
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            this.saveCart();
            if (typeof this.renderCart === 'function') {
                this.renderCart();
            }
        }
    }

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

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
    }

    getSubtotal() {
        return this.getTotal();
    }

    getShipping() {
        return this.cart.length > 0 ? 2500 : 0;
    }

    getGrandTotal() {
        return this.getTotal() + this.getShipping();
    }

    saveCart() {
        localStorage.setItem('huertohogar_cart', JSON.stringify(this.cart));
        this.updateCartCount();
    }

    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cartCount');
        cartCountElements.forEach(element => {
            element.textContent = count;
        });
    }

    showAddedToCartAlert(productName) {
        this.showAlert(`${productName} añadido al carrito`, 'success');
    }

    showAlert(message, type = 'info') {
        // Crear toast de Bootstrap
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
        
        // Remover después de animación
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(container);
        return container;
    }

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

        cartTable.innerHTML = this.cart.map(item => `
            <tr class="fade-in">
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover;" class="rounded me-3">
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

        if (cartTotal) cartTotal.textContent = this.getGrandTotal().toLocaleString('es-CL');
        if (subtotal) subtotal.textContent = this.getSubtotal().toLocaleString('es-CL');
        if (shipping) shipping.textContent = this.getShipping().toLocaleString('es-CL');
    }

    getLocalProducts() {
        // Lista de productos local para cuando no hay productManager
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