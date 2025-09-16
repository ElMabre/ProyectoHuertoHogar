// detalle.js

document.addEventListener('DOMContentLoaded', function() {
    // Obtiene el ID del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Si no hay ID, redirige a productos
    if (!productId) {
        window.location.href = 'productos.html';
        return;
    }
    
    // Busca el producto por ID usando productManager
    const product = window.productManager.getProductById(productId);
    
    // Si no existe el producto, redirige a productos
    if (!product) {
        window.location.href = 'productos.html';
        return;
    }
    
    // Actualiza el breadcrumb con el nombre del producto
    document.getElementById('breadcrumbProduct').textContent = product.nombre;
    
    // Renderiza el detalle del producto
    renderProductDetail(product);
    
    // Muestra productos relacionados
    renderRelatedProducts(product);
});

/**
 * Renderiza el detalle del producto en la página
 * @param {Object} product - Producto a mostrar
 */
function renderProductDetail(product) {
    const productDetail = document.getElementById('productDetail');
    productDetail.innerHTML = `
        <div class="col-md-6 mb-4">
            <img src="${product.imagen}" class="img-fluid rounded shadow product-img-lg" alt="${product.nombre}">
        </div>
        <div class="col-md-6 mb-4">
            <div class="card border-0">
                <div class="card-body">
                    <span class="badge bg-success mb-2">${product.categoria}</span>
                    <h1 class="card-title" style="color: #8B4513;">${product.nombre}</h1>
                    <p class="text-muted">Origen: ${product.origen}</p>
                    
                    <div class="d-flex align-items-center mb-3">
                        <h3 class="text-success me-3">$${product.precio.toLocaleString('es-CL')}</h3>
                        <span class="badge ${product.stock > 10 ? 'bg-success' : 'bg-warning'}">
                            ${product.stock > 10 ? 'En stock' : 'Últimas unidades'}
                        </span>
                    </div>
                    
                    <p class="card-text">${product.descripcion}</p>
                    
                    <div class="mb-4">
                        <h5>Beneficios:</h5>
                        <ul>
                            <li>Producto ${product.categoria === 'organicos' ? 'orgánico certificado' : 'fresco'}</li>
                            <li>Cultivado de manera sostenible</li>
                            <li>Entrega directa desde el campo</li>
                            <li>Máxima frescura garantizada</li>
                        </ul>
                    </div>
                    
                    <div class="row align-items-center mb-4">
                        <div class="col-auto">
                            <label for="cantidad" class="form-label">Cantidad:</label>
                        </div>
                        <div class="col-4">
                            <input type="number" class="form-control" id="cantidad" value="1" min="1" max="${product.stock}">
                        </div>
                        <div class="col">
                            <span class="text-muted">Disponible: ${product.stock} unidades</span>
                        </div>
                    </div>
                    
                    <div class="d-grid gap-2 d-md-flex">
                        <button class="btn btn-warning flex-fill" onclick="addToCartWithQuantity('${product.id}')">
                            <i class="bi bi-cart-plus me-2"></i>Añadir al carrito
                        </button>
                        <button class="btn btn-outline-success flex-fill">
                            <i class="bi bi-heart me-2"></i>Guardar
                        </button>
                    </div>
                    
                    <div class="mt-4">
                        <div class="d-flex align-items-center text-muted">
                            <i class="bi bi-truck me-2"></i>
                            <span>Envío gratis en compras sobre $15.000</span>
                        </div>
                        <div class="d-flex align-items-center text-muted mt-1">
                            <i class="bi bi-arrow-clockwise me-2"></i>
                            <span>Devolución gratuita en 7 días</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renderiza los productos relacionados en la sección correspondiente
 * @param {Object} product - Producto actual para buscar relacionados
 */
function renderRelatedProducts(product) {
    // Buscar productos relacionados (misma categoría, excluyendo el actual)
    const relatedProducts = window.productManager.getProductsByCategory(product.categoria)
        .filter(p => p.id !== product.id)
        .slice(0, 3);
    
    const relatedContainer = document.getElementById('relatedProducts');
    
    if (relatedProducts.length > 0) {
        relatedContainer.innerHTML = relatedProducts.map(related => `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <img src="${related.imagen}" class="card-img-top product-img img-fluid" alt="${related.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${related.nombre}</h5>
                        <p class="card-text">${related.descripcion.substring(0, 60)}...</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-bold text-success">$${related.precio.toLocaleString('es-CL')}</span>
                            <a href="detalle.html?id=${related.id}" class="btn btn-sm btn-outline-success">Ver</a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        relatedContainer.innerHTML = '<p class="text-muted">No hay productos relacionados disponibles.</p>';
    }
}

/**
 * Función para añadir al carrito la cantidad seleccionada desde el detalle
 * @param {string} productId - ID del producto a añadir
 */
function addToCartWithQuantity(productId) {
    const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
    addToCart(productId, cantidad);
    // Mostrar mensaje de confirmación
    if (typeof showToast === 'function') {
        showToast('Producto añadido al carrito', 'success');
    }
}