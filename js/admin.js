// Clase principal para la gestión del panel de administración
class AdminManager {
  constructor() {
    this.init();
  }

  // Inicialización general
  init() {
    this.setupNavigation();
    this.loadTable('tablaProductos', this.getProductos(), this.renderProductoRow.bind(this));
    this.loadTable('tablaUsuarios', this.getUsuarios(), this.renderUsuarioRow.bind(this));
    this.loadTable('tablaPedidos', this.getPedidos(), this.renderPedidoRow.bind(this));
    this.setupModals();
  }

  /* ========= FUNCIONES GENÉRICAS ========= */

  // Cargar tabla con datos
  loadTable(tableId, data, rowRenderer) {
    const tabla = document.getElementById(tableId);
    if (tabla) tabla.innerHTML = data.map(rowRenderer).join('');
  }

  /* ========= DATOS SIMULADOS ========= */

  getProductos() {
    return [
      { id: 'FR001', nombre: 'Manzanas Fuji', categoria: 'frutas', precio: 1200, stock: 150, imagen: 'img/manzana.jpg', estado: 'Activo' },
      { id: 'FR002', nombre: 'Naranjas Valencia', categoria: 'frutas', precio: 1000, stock: 200, imagen: 'img/naranja.jpg', estado: 'Activo' },
      { id: 'VR001', nombre: 'Zanahorias Orgánicas', categoria: 'verduras', precio: 900, stock: 100, imagen: 'img/zanahoria.jpg', estado: 'Activo' },
      { id: 'PO001', nombre: 'Miel Orgánica', categoria: 'organicos', precio: 5000, stock: 50, imagen: 'img/miel.jpg', estado: 'Bajo Stock' }
    ];
  }

  getUsuarios() {
    return [
      { id: 1, nombre: 'Juan Pérez', email: 'juan@duoc.cl', rol: 'Administrador', estado: 'Activo', registro: '2024-01-15' },
      { id: 2, nombre: 'María González', email: 'maria@gmail.com', rol: 'Vendedor', estado: 'Activo', registro: '2024-02-10' },
      { id: 3, nombre: 'Pedro Martínez', email: 'pedro@duoc.cl', rol: 'Cliente', estado: 'Activo', registro: '2024-03-05' },
      { id: 4, nombre: 'Ana López', email: 'ana@profesor.duoc.cl', rol: 'Cliente', estado: 'Inactivo', registro: '2024-01-20' }
    ];
  }

  getPedidos() {
    return [
      { id: 'PED-001', cliente: 'Juan Pérez', fecha: '2024-03-20', total: 45000, estado: 'Completado', metodoPago: 'Tarjeta' },
      { id: 'PED-002', cliente: 'María González', fecha: '2024-03-19', total: 28000, estado: 'Pendiente', metodoPago: 'Transferencia' },
      { id: 'PED-003', cliente: 'Pedro Martínez', fecha: '2024-03-18', total: 15000, estado: 'En camino', metodoPago: 'Tarjeta' },
      { id: 'PED-004', cliente: 'Ana López', fecha: '2024-03-17', total: 32000, estado: 'Completado', metodoPago: 'Efectivo' }
    ];
  }

  /* ========= RENDER DE FILAS ========= */

  renderProductoRow(p) {
    return `
      <tr>
        <td>${p.id}</td>
        <td><img src="${p.imagen}" alt="${p.nombre}" class="rounded product-img-sm img-fluid"></td>
        <td>${p.nombre}</td>
        <td><span class="badge bg-secondary">${p.categoria}</span></td>
        <td>$${p.precio.toLocaleString('es-CL')}</td>
        <td>${p.stock}</td>
        <td><span class="badge ${p.estado === 'Activo' ? 'bg-success' : 'bg-warning'}">${p.estado}</span></td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-1" onclick="adminManager.editarProducto('${p.id}')"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger" onclick="adminManager.eliminarProducto('${p.id}')"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`;
  }

  renderUsuarioRow(u) {
    return `
      <tr>
        <td>${u.id}</td>
        <td>${u.nombre}</td>
        <td>${u.email}</td>
        <td><span class="badge bg-info">${u.rol}</span></td>
        <td><span class="badge ${u.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}">${u.estado}</span></td>
        <td>${u.registro}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-1" onclick="adminManager.editarUsuario(${u.id})"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger" onclick="adminManager.eliminarUsuario(${u.id})"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`;
  }

  renderPedidoRow(p) {
    return `
      <tr>
        <td>${p.id}</td>
        <td>${p.cliente}</td>
        <td>${p.fecha}</td>
        <td>$${p.total.toLocaleString('es-CL')}</td>
        <td><span class="badge ${this.getBadgeClass(p.estado)}">${p.estado}</span></td>
        <td>${p.metodoPago}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-1" onclick="adminManager.verPedido('${p.id}')"><i class="bi bi-eye"></i></button>
          <button class="btn btn-sm btn-outline-success" onclick="adminManager.editarPedido('${p.id}')"><i class="bi bi-pencil"></i></button>
        </td>
      </tr>`;
  }

  /* ========= UTILIDADES ========= */

  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-bs-target]');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        contentSections.forEach(s => s.classList.add('d-none'));
        const targetSection = document.getElementById(link.dataset.bsTarget);
        if (targetSection) targetSection.classList.remove('d-none');
      });
    });
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
    ['modalProducto', 'modalUsuario'].forEach(id => {
      const modal = document.getElementById(id);
      if (modal) modal.addEventListener('show.bs.modal', () => console.log(`Modal ${id} abierto`));
    });
  }

  // Métodos simulados
  editarProducto(id) { alert(`Editando producto: ${id}`); }
  eliminarProducto(id) { if (confirm(`¿Eliminar producto ${id}?`)) alert(`Producto ${id} eliminado`); }
  editarUsuario(id) { alert(`Editando usuario: ${id}`); }
  eliminarUsuario(id) { if (confirm(`¿Eliminar usuario ${id}?`)) alert(`Usuario ${id} eliminado`); }
  verPedido(id) { alert(`Viendo pedido: ${id}`); }
  editarPedido(id) { alert(`Editando pedido: ${id}`); }
}

// Instancia global
const adminManager = new AdminManager();

/* ================== Gráfico de ventas mensuales (Chart.js) ================== */

const ventasMensuales = {
  labels: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  data: [120000, 95000, 145000, 110000, 130000, 125000, 140000, 135000, 150000, 160000, 170000, 180000]
};

function renderSalesChart() {
  const ctx = document.getElementById('salesChartCanvas')?.getContext('2d');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ventasMensuales.labels,
      datasets: [{
        label: 'Ventas ($)',
        data: ventasMensuales.data,
        backgroundColor: 'rgba(46, 139, 87, 0.7)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Ventas Mensuales' }
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

document.addEventListener('DOMContentLoaded', renderSalesChart);
