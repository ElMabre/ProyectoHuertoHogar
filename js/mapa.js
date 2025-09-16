const locales = [
    { nombre: "Santiago", direccion: "Av. Principal 123", lat: -33.4489, lng: -70.6693 },
    { nombre: "Puerto Montt", direccion: "Costanera 456", lat: -41.4693, lng: -72.9424 },
    { nombre: "Villarica", direccion: "Calle Lagos 789", lat: -39.2856, lng: -72.2276 },
    { nombre: "Viña del Mar", direccion: "Av. del Mar 321", lat: -33.0245, lng: -71.5518 },
    { nombre: "Valparaíso", direccion: "Cerro Alegre 654", lat: -33.0472, lng: -71.6127 },
    { nombre: "Concepción", direccion: "Barrio Universitario 987", lat: -36.8201, lng: -73.0444 }
];

function initMap() {
    const centro = { lat: -35.6751, lng: -71.5430 }; // Centro de Chile
    const map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 5,
        center: centro
    });

    locales.forEach(local => {
        const marker = new google.maps.Marker({
            position: { lat: local.lat, lng: local.lng },
            map,
            title: `${local.nombre} - ${local.direccion}`
        });
        const info = new google.maps.InfoWindow({
            content: `<strong>${local.nombre}</strong><br>${local.direccion}`
        });

        marker.addListener('click', () => {
            info.open(map, marker);
        });
    });
}
window.addEventListener('DOMContentLoaded', () => {
    if (typeof google !== "undefined") {
        initMap();
    }
});