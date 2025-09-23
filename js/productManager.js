/**
 * ======================================
 * GESTOR DE PRODUCTOS - HUERTOHOGAR
 * ======================================
 * 
 * Maneja toda la lógica relacionada con productos:
 * - Almacén de productos simulado (hardcodeado)
 * - Renderizado de productos en la interfaz
 * - Filtrado por categoría y búsqueda de texto
 * - Gestión de stock
 * - Productos destacados y relacionados
 * 
 * @author HuertoHogar Team
 * @version 1.0
 */

/**
 * Clase principal para la gestión de productos en la tienda
 */
class ProductManager {
    constructor() {
        // Lista de productos disponibles en la tienda (simulada, hardcodeada)
        this.products = [
            // Cada producto tiene id, nombre, precio, categoría, imagen, stock, descripción y origen
            {
                id: 'FR001',
                nombre: 'Manzanas Fuji',
                precio: 1200,
                categoria: 'frutas',
                imagen: 'img/manzana.jpg',
                stock: 150,
                descripcion: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres.',
                origen: 'Valle del Maule'
            },
            {
                id: 'FR002',
                nombre: 'Naranjas Valencia',
                precio: 1000,
                categoria: 'frutas',
                imagen: 'img/naranja.jpg',
                stock: 200,
                descripcion: 'Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes.',
                origen: 'Región de Valparaíso'
            },
            {
                id: 'FR003',
                nombre: 'Plátanos Cavendish',
                precio: 800,
                categoria: 'frutas',
                imagen: 'img/platano.jpg',
                stock: 250,
                descripcion: 'Plátanos maduros y dulces, perfectos para el desayuno o como snack energético.',
                origen: 'Región de O\'Higgins'
            },
            {
                id: 'VR001',
                nombre: 'Zanahorias Orgánicas',
                precio: 900,
                categoria: 'verduras',
                imagen: 'img/zanahoria.jpg',
                stock: 100,
                descripcion: 'Zanahorias crujientes cultivadas sin pesticidas en la Región de O\'Higgins. Excelente fuente de vitamina A y fibra.',
                origen: 'Región de O\'Higgins'
            },
            {
                id: 'VR002',
                nombre: 'Espinacas Frescas',
                precio: 700,
                categoria: 'verduras',
                imagen: 'img/espinaca.jpg',
                stock: 80,
                descripcion: 'Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes.',
                origen: 'Región Metropolitana'
            },
            {
                id: 'VR003',
                nombre: 'Pimientos Tricolores',
                precio: 1500,
                categoria: 'verduras',
                imagen: 'img/pimiento.jpg',
                stock: 120,
                descripcion: 'Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos.',
                origen: 'Región de Valparaíso'
            },
            {
                id: 'PO001',
                nombre: 'Miel Orgánica',
                precio: 5000,
                categoria: 'organicos',
                imagen: 'img/miel.jpg',
                stock: 50,
                descripcion: 'Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes.',
                origen: 'Región del Maule'
            },
            {
                id: 'PO002',
                nombre: 'Quinua Orgánica',
                precio: 3500,
                categoria: 'organicos',
                imagen: 'img/quinua.jpg',
                stock: 75,
                descripcion: 'Quinua orgánica de alta calidad, perfecta para ensaladas y platos saludables.',
                origen: 'Región de La Araucanía'
            },
            {
                id: 'PL001',
                nombre: 'Leche Entera',
                precio: 1200,
                categoria: 'lacteos',
                imagen: 'img/leche.jpg',
                stock: 60,
                descripcion: 'Leche entera fresca de vacas criadas en praderas naturales.',
                origen: 'Región de Los Lagos'
            }
        ];

        this.init(); // Inicializa la visualización y filtros al crear la instancia
    }

    // Inicializa la vista de productos y los filtros
    init() {
        this.renderProducts();   // Muestra todos los productos en la grilla
        this.setupFilters();     // Configura los filtros de búsqueda y categoría
    }

    // Renderiza los productos en la grilla principal (puede recibir productos filtrados)
    renderProducts(filteredProducts = null) {
        const productsToRender = filteredProducts || this.products;
        const grid = document.getElementById('productGrid');

        if (!grid) return;

        // Renderiza cada producto en una card
        grid.innerHTML = productsToRender.map(product => `
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

    // Configura los filtros de categoría y búsqueda
    setupFilters() {
        const categoriaFilter = document.getElementById('categoriaFilter');
        const searchProduct = document.getElementById('searchProduct');

        // Filtro por categoría
        if (categoriaFilter) {
            categoriaFilter.addEventListener('change', () => this.filterProducts());
        }

        // Filtro por texto (nombre, descripción, origen)
        if (searchProduct) {
            searchProduct.addEventListener('input', () => this.filterProducts());
        }
    }

    // Filtra los productos según la categoría y/o búsqueda de texto
    filterProducts() {
        const categoria = document.getElementById('categoriaFilter')?.value || '';
        const searchTerm = document.getElementById('searchProduct')?.value.toLowerCase() || '';

        // Filtra por categoría y por coincidencia en nombre, descripción u origen
        const filtered = this.products.filter(product => {
            const matchesCategoria = !categoria || product.categoria === categoria;
            const matchesSearch = !searchTerm ||
                product.nombre.toLowerCase().includes(searchTerm) ||
                product.descripcion.toLowerCase().includes(searchTerm) ||
                product.origen.toLowerCase().includes(searchTerm);
            return matchesCategoria && matchesSearch;
        });

        this.renderProducts(filtered);

        // Mostrar mensaje si no hay productos
        const noProducts = document.getElementById('noProducts');
        if (noProducts) {
            noProducts.classList.toggle('d-none', filtered.length > 0);
        }
    }

    // Devuelve un producto por su ID
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    // Devuelve todos los productos de una categoría específica
    getProductsByCategory(category) {
        return this.products.filter(product => product.categoria === category);
    }

    // Devuelve una cantidad limitada de productos destacados (los primeros N)
    getFeaturedProducts(limit = 3) {
        // Simular productos destacados (podría ser por stock, rating, etc.)
        return this.products.slice(0, limit);
    }

    // Reduce el stock de un producto (por ejemplo, al comprar)
    reduceStock(productId, quantity) {
        const product = this.getProductById(productId);
        if (product && product.stock >= quantity) {
            product.stock -= quantity;
            return true;
        }
        return false;
    }

    // Aumenta el stock de un producto (por ejemplo, al cancelar una compra)
    increaseStock(productId, quantity) {
        const product = this.getProductById(productId);
        if (product) {
            product.stock += quantity;
            return true;
        }
        return false;
    }
}

// Inicializar el productManager global para acceso desde otras partes del sitio
window.productManager = new ProductManager();

// Guardar productos en localStorage para acceso global (carrito, etc)
localStorage.setItem('huertohogar_productos', JSON.stringify(window.productManager.products));