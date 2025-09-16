// Lista de locales físicos con nombre, dirección y coordenadas
const locales = [
    { nombre: "Santiago", direccion: "Av. Principal 123", lat: -33.4489, lng: -70.6693 },
    { nombre: "Puerto Montt", direccion: "Costanera 456", lat: -41.4693, lng: -72.9424 },
    { nombre: "Villarica", direccion: "Calle Lagos 789", lat: -39.2856, lng: -72.2276 },
    { nombre: "Viña del Mar", direccion: "Av. del Mar 321", lat: -33.0245, lng: -71.5518 },
    { nombre: "Valparaíso", direccion: "Cerro Alegre 654", lat: -33.0472, lng: -71.6127 },
    { nombre: "Concepción", direccion: "Barrio Universitario 987", lat: -36.8201, lng: -73.0444 }
];

// Inicializa el mapa de Google Maps y coloca los marcadores de los locales
function initMap() {
    // Centro geográfico de Chile
    const centro = { lat: -35.6751, lng: -71.5430 };
    // Crea el mapa en el elemento con id 'mapa'
    const map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 5,
        center: centro
    });

    // Agrega un marcador por cada local y su ventana de información
    locales.forEach(local => {
        const marker = new google.maps.Marker({
            position: { lat: local.lat, lng: local.lng },
            map,
            title: `${local.nombre} - ${local.direccion}`
        });
        const info = new google.maps.InfoWindow({
            content: `<strong>${local.nombre}</strong><br>${local.direccion}`
        });

        // Muestra la ventana de información al hacer clic en el marcador
        marker.addListener('click', () => {
            info.open(map, marker);
        });
    });
}

// Espera a que el DOM esté listo y Google Maps esté disponible para inicializar el mapa
window.addEventListener('DOMContentLoaded', () => {
    if (typeof google !== "undefined") {
        initMap();
    }
});