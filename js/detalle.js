// Mostrar producto seleccionado (ejemplo básico con query string)
const params = new URLSearchParams(window.location.search);
const nombre = params.get("nombre");
const precio = params.get("precio");
const img = params.get("img");

if (nombre) {
  document.getElementById("nombreProducto").innerText = nombre;
  document.getElementById("precioProducto").innerText = `$${precio}`;
  document.getElementById("imagenProducto").src = img;

  document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarAlCarrito(nombre, parseInt(precio));
  });
}
