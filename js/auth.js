/**
 * ======================================
 * SISTEMA DE AUTENTICACIÓN - HUERTOHOGAR
 * ======================================
 * 
 * Maneja el registro, login y logout de usuarios.
 * Inicializa automáticamente los administradores del sistema.
 * Todos los datos se persisten en localStorage.
 * 
 * @author HuertoHogar Team
 * @version 1.0
 */

// ======================================
// INICIALIZACIÓN DEL SISTEMA
// ======================================

document.addEventListener('DOMContentLoaded', () => {
    /**
     * Función para inicializar los administradores predeterminados del sistema
     */
    const initAdmins = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Administradores predeterminados del sistema
        const admins = [
            { 
                nombre: 'Felipe Quezada', 
                email: 'felipe@huerto.hogar', 
                pass: 'felipe1234', 
                rol: 'admin' 
            },
            { 
                nombre: 'Matias Guzman', 
                email: 'matias@huerto.hogar', 
                pass: 'matias1234', 
                rol: 'admin' 
            },
            { 
                nombre: 'Danilo Celis', 
                email: 'danilo@huerto.hogar', 
                pass: 'danilo1234', 
                rol: 'admin' 
            }
        ];

        let adminsAdded = false;
        
        // Agregar administradores si no existen
        admins.forEach(admin => {
            if (!users.some(user => user.email === admin.email)) {
                users.push(admin);
                adminsAdded = true;
            }
        });

        // Guardar cambios si se agregaron administradores
        if (adminsAdded) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    };

    // Inicializar administradores solo en la primera carga
    if (!localStorage.getItem('admins_initialized')) {
        initAdmins();
        localStorage.setItem('admins_initialized', 'true');
    }
});

// ======================================
// FUNCIONES DE AUTENTICACIÓN
// ======================================

/**
 * Registra un nuevo usuario con el rol de cliente.
 * @param {string} nombre 
 * @param {string} email 
 * @param {string} pass 
 * @returns {boolean} - True si el registro fue exitoso, false si el usuario ya existe.
 */
function registrarUsuario(nombre, email, pass) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        return false; // El usuario ya existe
    }
    users.push({ nombre, email, pass, rol: 'cliente' });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

/**
 * Inicia sesión de un usuario.
 * @param {string} email 
 * @param {string} pass 
 * @returns {object|null} - El objeto del usuario si las credenciales son correctas, de lo contrario null.
 */
function loginUsuario(email, pass) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.pass === pass);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }
    return null;
}

/**
 * Cierra la sesión del usuario actual.
 */
function logoutUsuario() {
    localStorage.removeItem('currentUser');
    window.location.href = 'Index.html';
}
