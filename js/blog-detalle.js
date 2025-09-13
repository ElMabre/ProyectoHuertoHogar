const blogArticles = [
    {
        id: "1",
        categoria: "Salud",
        titulo: "Beneficios de comer orgánico",
        fecha: "15 Marzo, 2024",
        autor: "Equipo HuertoHogar",
        tiempo: "5 min de lectura",
        imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        contenido: `
            <h4><i class="bi bi-heart-pulse-fill text-success"></i> ¿Por qué elegir productos orgánicos?</h4>
            <p>
                Los productos orgánicos son cultivados sin pesticidas ni fertilizantes sintéticos, lo que los hace más saludables para ti y para el planeta.
                <br>
                <i class="bi bi-check-circle-fill text-success"></i> <strong>Menos químicos:</strong> Reduces la exposición a sustancias tóxicas.<br>
                <i class="bi bi-check-circle-fill text-success"></i> <strong>Más nutrientes:</strong> Suelen tener mayor concentración de vitaminas y minerales.<br>
                <i class="bi bi-check-circle-fill text-success"></i> <strong>Mejor sabor:</strong> Su frescura y calidad se notan en cada bocado.
            </p>
            <div class="alert alert-success d-flex align-items-center" role="alert">
                <i class="bi bi-leaf me-2"></i>
                <div>
                    ¡Elige orgánico y apoya a los agricultores locales!
                </div>
            </div>
            <h5 class="mt-4"><i class="bi bi-emoji-smile text-warning"></i> Consejos para una vida más saludable</h5>
            <ul>
                <li>Prefiere frutas y verduras de temporada.</li>
                <li>Lava bien los alimentos antes de consumirlos.</li>
                <li>Incluye variedad de colores en tu plato.</li>
            </ul>
            <blockquote class="blockquote mt-4">
                <p class="mb-0">"Que tu alimento sea tu medicina y tu medicina sea tu alimento."</p>
                <footer class="blockquote-footer">Hipócrates</footer>
            </blockquote>
        `
    },
    {
        id: "2",
        categoria: "Sostenibilidad",
        titulo: "Cómo reducir tu huella de carbono",
        fecha: "8 Marzo, 2024",
        autor: "Equipo HuertoHogar",
        tiempo: "4 min de lectura",
        imagen: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        contenido: `
            <h4><i class="bi bi-globe2 text-info"></i> ¿Qué es la huella de carbono?</h4>
            <p>
                Es la cantidad total de gases de efecto invernadero emitidos por nuestras acciones diarias.
            </p>
            <h5 class="mt-4"><i class="bi bi-tree-fill text-success"></i> Acciones para reducirla:</h5>
            <ul>
                <li><i class="bi bi-bag-check text-success"></i> Compra productos locales y de temporada.</li>
                <li><i class="bi bi-recycle text-success"></i> Recicla y reutiliza envases.</li>
                <li><i class="bi bi-bicycle text-success"></i> Prefiere medios de transporte sustentables.</li>
            </ul>
            <div class="alert alert-info d-flex align-items-center" role="alert">
                <i class="bi bi-lightning-charge me-2"></i>
                <div>
                    Cada pequeño cambio suma para cuidar el planeta.
                </div>
            </div>
        `
    },
    {
        id: "3",
        categoria: "Urban farming",
        titulo: "Guía para crear tu huerto urbano",
        fecha: "1 Marzo, 2024",
        autor: "Equipo HuertoHogar",
        tiempo: "6 min de lectura",
        imagen: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        contenido: `
            <h4><i class="bi bi-flower1 text-success"></i> ¿Cómo empezar tu huerto en casa?</h4>
            <ol>
                <li><strong>Elige el lugar:</strong> Busca un espacio con buena luz natural.</li>
                <li><strong>Selecciona las plantas:</strong> Comienza con hierbas fáciles como albahaca, perejil o cilantro.</li>
                <li><strong>Prepara la tierra:</strong> Usa sustrato de calidad y abono orgánico.</li>
                <li><strong>Riego:</strong> Mantén la humedad sin encharcar.</li>
            </ol>
            <div class="alert alert-warning d-flex align-items-center" role="alert">
                <i class="bi bi-brightness-high me-2"></i>
                <div>
                    Recuerda: la luz solar es clave para el crecimiento de tus plantas.
                </div>
            </div>
            <p class="mt-3">
                <i class="bi bi-emoji-smile text-success"></i> ¡Disfruta cosechando tus propios alimentos frescos!
            </p>
        `
    },
    {
        id: "4",
        categoria: "Recetas",
        titulo: "5 recetas con productos de temporada",
        fecha: "22 Febrero, 2024",
        autor: "Equipo HuertoHogar",
        tiempo: "7 min de lectura",
        imagen: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        contenido: `
            <h4><i class="bi bi-egg-fried text-danger"></i> Recetas fáciles y deliciosas</h4>
            <ul>
                <li><strong>Ensalada de espinaca y nueces:</strong> Espinaca fresca, nueces, queso de cabra y vinagreta de miel.</li>
                <li><strong>Crema de zanahoria:</strong> Zanahorias, cebolla, caldo de verduras y un toque de jengibre.</li>
                <li><strong>Salteado de pimientos tricolores:</strong> Pimientos rojos, verdes y amarillos con aceite de oliva y ajo.</li>
                <li><strong>Plátanos asados con miel:</strong> Plátanos maduros al horno con miel orgánica.</li>
                <li><strong>Jugo de naranja y manzana:</strong> Exprime naranjas y manzanas frescas para un jugo natural.</li>
            </ul>
            <div class="alert alert-danger d-flex align-items-center" role="alert">
                <i class="bi bi-emoji-heart-eyes me-2"></i>
                <div>
                    ¡Aprovecha los productos de temporada para comer rico y saludable!
                </div>
            </div>
        `
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const article = blogArticles.find(a => a.id === articleId);

    const container = document.querySelector('.blog-article');
    if (!container) return;

    if (!article) {
        container.innerHTML = '<p class="text-muted">Artículo no encontrado.</p>';
        return;
    }

    container.innerHTML = `
        <header class="text-center mb-5">
            <span class="badge bg-success mb-2">${article.categoria}</span>
            <h1 class="section-title">${article.titulo}</h1>
            <div class="text-muted">
                <i class="bi bi-calendar me-1"></i>${article.fecha}
                <i class="bi bi-person ms-3 me-1"></i>Por ${article.autor}
                <i class="bi bi-clock ms-3 me-1"></i>${article.tiempo}
            </div>
        </header>
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <img src="${article.imagen}" class="card-img-top blog-img img-fluid mb-4" alt="${article.titulo}">
                <div class="blog-content">
                    ${article.contenido}
                </div>
                <footer class="mt-5 pt-4 border-top">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Comparte este artículo:</strong>
                            <div class="btn-group ms-2">
                                <button class="btn btn-outline-primary btn-sm"><i class="bi bi-facebook"></i></button>
                                <button class="btn btn-outline-info btn-sm"><i class="bi bi-twitter"></i></button>
                                <button class="btn btn-outline-danger btn-sm"><i class="bi bi-instagram"></i></button>
                            </div>
                        </div>
                        <a href="blog.html" class="btn btn-outline-secondary">
                            <i class="bi bi-arrow-left me-1"></i>Volver al blog
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    `;
});