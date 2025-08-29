let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
  const item = carrito.find(p => p.nombre === nombre);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${nombre} añadido al carrito 🛒`);
}

function mostrarCarrito() {
  const tabla = document.getElementById("tablaCarrito");
  const totalSpan = document.getElementById("totalCarrito");
  if (!tabla) return;

  tabla.innerHTML = "";
  let total = 0;
  carrito.forEach((p, i) => {
    total += p.precio * p.cantidad;
    tabla.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>${p.precio}</td>
        <td>${p.cantidad}</td>
        <td>${p.precio * p.cantidad}</td>
        <td><button onclick="eliminarDelCarrito(${i})">❌</button></td>
      </tr>
    `;
  });
  totalSpan.innerText = total;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}
