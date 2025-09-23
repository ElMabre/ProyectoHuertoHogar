document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('formRegistro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Capturar todos los datos del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const run = document.getElementById('run').value.trim();
            const email = document.getElementById('correo').value.trim();
            const pass = document.getElementById('contraseña').value;
            const confirmPass = document.getElementById('confirmarContraseña').value;
            const region = document.getElementById('region').value;
            const comuna = document.getElementById('comuna').value;
            const direccion = document.getElementById('direccion').value.trim();
            
            // Validaciones básicas
            if (!nombre || !apellido || !run || !email || !pass || !region || !comuna || !direccion) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            if (pass !== confirmPass) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            
            // Crear objeto de usuario completo
            const userData = {
                nombre: `${nombre} ${apellido}`,
                apellido: apellido,
                run: run,
                email: email,
                pass: pass,
                region: region,
                comuna: comuna,
                direccion: direccion,
                fechaRegistro: new Date().toISOString(),
                rol: 'cliente'
            };
            
            // Intentar registrar el usuario
            if (registrarUsuarioCompleto(userData)) {
                // Después del registro exitoso, hacer login automático
                localStorage.setItem('currentUser', JSON.stringify(userData));
                alert('¡Registro exitoso! Bienvenido a HuertoHogar.');
                window.location.href = 'Index.html';
            } else {
                alert('El correo electrónico ya está en uso. Por favor, usa otro correo.');
            }
        });
    }
});

/**
 * Registra un usuario completo con todos sus datos
 * @param {object} userData - Objeto con todos los datos del usuario
 * @returns {boolean} - True si el registro fue exitoso, false si el usuario ya existe
 */
function registrarUsuarioCompleto(userData) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verificar si el email ya existe
    if (users.some(user => user.email === userData.email)) {
        return false;
    }
    
    // Verificar si el RUN ya existe
    if (users.some(user => user.run === userData.run)) {
        alert('El RUN ya está registrado en el sistema.');
        return false;
    }
    
    // Agregar el nuevo usuario
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    
    console.log('Usuario registrado exitosamente:', userData);
    return true;
}
