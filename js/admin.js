class AdminManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.loadProducts();
    this.loadUsers();
    this.loadOrders();
    this.setupModals();
  }

  setupNavigation() {
    // Navegación del sidebar
    const navLinks = document.querySelectorAll('.nav-link[data-bs-target]');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remover active de todos los links
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        // Agregar active al link clickeado
        link.classList.add('active');

        // Ocultar todas las secciones
        contentSections.forEach(section => section.classList.add('d-none'));

        // Mostrar la sección correspondiente
        const targetSection = document.getElementById(link.dataset.bsTarget);
        if (targetSection) {
          targetSection.classList.remove('d-none');
        }
      });
    });
  }

  loadProducts() {
    const productos = [
      {
        id: 'FR001',
        nombre: 'Manzanas Fuji',
        categoria: 'frutas',
        precio: 1200,
        stock: 150,
        imagen: 'img/manzana.jpg',
        estado: 'Activo'
      },
      {
        id: 'FR002',
        nombre: 'Naranjas Valencia',
        categoria: 'frutas',
        precio: 1000,
        stock: 200,
        imagen: 'img/naranja.jpg',
        estado: 'Activo'
      },
      {
        id: 'VR001',
        nombre: 'Zanahorias Orgánicas',
        categoria: 'verduras',
        precio: 900,
        stock: 100,
        imagen: 'img/zanahoria.jpg',
        estado: 'Activo'
      },
      {
        id: 'PO001',
        nombre: 'Miel Orgánica',
        categoria: 'organicos',
        precio: 5000,
        stock: 50,
        imagen: 'img/miel.jpg',
        estado: 'Bajo Stock'
      }
    ];

    const tabla = document.getElementById('tablaProductos');
    if (tabla) {
      tabla.innerHTML = productos.map(producto => `
                <tr>
                    <td>${producto.id}</td>
                    <td>
                        <img src="${producto.imagen}" alt="${producto.nombre}" 
                             style="width: 40px; height: 40px; object-fit: cover;" class="rounded">
                    </td>
                    <td>${producto.nombre}</td>
                    <td><span class="badge bg-secondary">${producto.categoria}</span></td>
                    <td>$${producto.precio.toLocaleString('es-CL')}</td>
                    <td>${producto.stock}</td>
                    <td>
                        <span class="badge ${producto.estado === 'Activo' ? 'bg-success' : 'bg-warning'}">
                            ${producto.estado}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="adminManager.editarProducto('${producto.id}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="adminManager.eliminarProducto('${producto.id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
    }
  }

  loadUsers() {
    const usuarios = [
      {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan@duoc.cl',
        rol: 'Administrador',
        estado: 'Activo',
        registro: '2024-01-15'
      },
      {
        id: 2,
        nombre: 'María González',
        email: 'maria@gmail.com',
        rol: 'Vendedor',
        estado: 'Activo',
        registro: '2024-02-10'
      },
      {
        id: 3,
        nombre: 'Pedro Martínez',
        email: 'pedro@duoc.cl',
        rol: 'Cliente',
        estado: 'Activo',
        registro: '2024-03-05'
      },
      {
        id: 4,
        nombre: 'Ana López',
        email: 'ana@profesor.duoc.cl',
        rol: 'Cliente',
        estado: 'Inactivo',
        registro: '2024-01-20'
      }
    ];

    const tabla = document.getElementById('tablaUsuarios');
    if (tabla) {
      tabla.innerHTML = usuarios.map(usuario => `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.email}</td>
                    <td><span class="badge bg-info">${usuario.rol}</span></td>
                    <td>
                        <span class="badge ${usuario.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}">
                            ${usuario.estado}
                        </span>
                    </td>
                    <td>${usuario.registro}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="adminManager.editarUsuario(${usuario.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="adminManager.eliminarUsuario(${usuario.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
    }
  }

  loadOrders() {
    const pedidos = [
      {
        id: 'PED-001',
        cliente: 'Juan Pérez',
        fecha: '2024-03-20',
        total: 45000,
        estado: 'Completado',
        metodoPago: 'Tarjeta'
      },
      {
        id: 'PED-002',
        cliente: 'María González',
        fecha: '2024-03-19',
        total: 28000,
        estado: 'Pendiente',
        metodoPago: 'Transferencia'
      },
      {
        id: 'PED-003',
        cliente: 'Pedro Martínez',
        fecha: '2024-03-18',
        total: 15000,
        estado: 'En camino',
        metodoPago: 'Tarjeta'
      },
      {
        id: 'PED-004',
        cliente: 'Ana López',
        fecha: '2024-03-17',
        total: 32000,
        estado: 'Completado',
        metodoPago: 'Efectivo'
      }
    ];

    const tabla = document.getElementById('tablaPedidos');
    if (tabla) {
      tabla.innerHTML = pedidos.map(pedido => `
                <tr>
                    <td>${pedido.id}</td>
                    <td>${pedido.cliente}</td>
                    <td>${pedido.fecha}</td>
                    <td>$${pedido.total.toLocaleString('es-CL')}</td>
                    <td>
                        <span class="badge ${this.getBadgeClass(pedido.estado)}">
                            ${pedido.estado}
                        </span>
                    </td>
                    <td>${pedido.metodoPago}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="adminManager.verPedido('${pedido.id}')">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-success" onclick="adminManager.editarPedido('${pedido.id}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
    }
  }

  getBadgeClass(estado) {
    const classes = {
      'Completado': 'bg-success',
      'Pendiente': 'bg-warning text-dark',
      'En camino': 'bg-info',
      'Cancelado': 'bg-danger'
    };
    return classes[estado] || 'bg-secondary';
  }

  setupModals() {
    // Configuración de modales
    const modalProducto = document.getElementById('modalProducto');
    if (modalProducto) {
      modalProducto.addEventListener('show.bs.modal', () => {
        console.log('Modal de producto abierto');
      });
    }

    const modalUsuario = document.getElementById('modalUsuario');
    if (modalUsuario) {
      modalUsuario.addEventListener('show.bs.modal', () => {
        console.log('Modal de usuario abierto');
      });
    }
  }

  editarProducto(id) {
    alert(`Editando producto: ${id}`);
    // Aquí se implementaría la lógica para cargar los datos del producto en el modal
  }

  eliminarProducto(id) {
    if (confirm(`¿Estás seguro de que quieres eliminar el producto ${id}?`)) {
      alert(`Producto ${id} eliminado`);
      // Aquí se implementaría la lógica para eliminar el producto
    }
  }

  editarUsuario(id) {
    alert(`Editando usuario: ${id}`);
    // Aquí se implementaría la lógica para cargar los datos del usuario en el modal
  }

  eliminarUsuario(id) {
    if (confirm(`¿Estás seguro de que quieres eliminar el usuario ${id}?`)) {
      alert(`Usuario ${id} eliminado`);
      // Aquí se implementaría la lógica para eliminar el usuario
    }
  }

  verPedido(id) {
    alert(`Viendo pedido: ${id}`);
    // Aquí se implementaría la lógica para ver los detalles del pedido
  }

  editarPedido(id) {
    alert(`Editando pedido: ${id}`);
    // Aquí se implementaría la lógica para editar el pedido
  }
}

// Inicializar el admin manager
const adminManager = new AdminManager();

// Gráfico de ventas mensuales (ejemplo real)
document.addEventListener('DOMContentLoaded', function () {
  const ctx = document.getElementById('salesChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        datasets: [{
          label: 'Ventas ($ CLP)',
          data: [120000, 95000, 134000, 150000, 170000, 160000, 180000, 175000, 190000, 210000, 220000, 245000],
          backgroundColor: '#2E8B57'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString('es-CL');
              }
            }
          }
        }
      }
    });
  }
});