/**
 * ======================================
 * VALIDACIONES CENTRALIZADAS - HUERTOHOGAR
 * ======================================
 * 
 * Contiene todas las funciones de validación para formularios:
 * - Validación de email (solo dominios específicos)
 * - Validación de contraseñas y datos personales
 * - Validación de formularios completos
 * - Utilidades para mostrar mensajes de error
 * 
 * @author HuertoHogar Team
 * @version 1.0
 */

// ======================================
// VALIDACIONES INDIVIDUALES
// ======================================

/**
 * Valida el formato de email
 * Solo permite dominios: duoc.cl, profesor.duoc.cl, gmail.com
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
function validarEmail(email) {
    if (!email) return false;
    if (email.length > 100) return false;
    
    // Solo dominios permitidos: duoc.cl, profesor.duoc.cl, gmail.com
    const regex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return regex.test(email.trim());
}

/**
 * Valida el formato de contraseña
 * Debe tener entre 4 y 10 caracteres
 * @param {string} pass - Contraseña a validar
 * @returns {boolean} - True si es válida
 */
function validarPassword(pass) {
    if (!pass) return false;
    // Debe tener entre 4 y 10 caracteres
    return pass.length >= 4 && pass.length <= 10;
}

/**
 * Valida el formato de nombre
 * No debe estar vacío y máximo 100 caracteres
 * @param {string} nombre - Nombre a validar
 * @returns {boolean} - True si es válido
 */
function validarNombre(nombre) {
    if (!nombre) return false;
    // No vacío y máximo 100 caracteres
    return nombre.trim().length > 0 && nombre.trim().length <= 100;
}

// -- Validación de Apellido (registro) --
function validarApellido(apellido) {
    if (!apellido) return false;
    // No vacío y máximo 100 caracteres
    return apellido.trim().length > 0 && apellido.trim().length <= 100;
}

// -- Validación de RUN chileno --
function validarRun(run) {
    if (!run) return false;
    // Formato: 7 u 8 dígitos + guión + dígito o K
    const regex = /^[0-9]{7,8}-[0-9kK]$/;
    return regex.test(run.trim());
}

// -- Validación de Comentario (contacto) --
function validarComentario(comentario) {
    if (!comentario) return false;
    // No vacío y máximo 500 caracteres
    return comentario.trim().length > 0 && comentario.trim().length <= 500;
}

// -- Validación de Teléfono (perfil) --
function validarTelefono(telefono) {
    if (!telefono) return false;
    // Solo números, 8 o 9 dígitos (Chile)
    return /^[0-9]{8,9}$/.test(telefono.trim());
}

// -- Validación de Dirección (perfil/registro) --
function validarDireccion(direccion) {
    if (!direccion) return false;
    // No vacío y máximo 200 caracteres
    return direccion.trim().length > 0 && direccion.trim().length <= 200;
}

// -- Validación de Región y Comuna --
function validarRegion(region) {
    // Debe estar seleccionada
    return !!region;
}

function validarComuna(comuna) {
    // Debe estar seleccionada
    return !!comuna;
}

// -- Validación de registro (solo datos, para uso JS) --
function validarRegistro({
    nombre, apellido, run, email, password, confirmarPassword, region, comuna, direccion, terminos
}) {
    let errores = {};

    if (!validarNombre(nombre)) errores.nombre = "Nombre obligatorio (máx. 100 caracteres)";
    if (!validarApellido(apellido)) errores.apellido = "Apellido obligatorio (máx. 100 caracteres)";
    if (!validarRun(run)) errores.run = "RUN obligatorio y formato válido (12345678-9)";
    if (!validarEmail(email)) errores.email = "Correo obligatorio y debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com";
    if (!validarPassword(password)) errores.password = "Contraseña obligatoria (4-10 caracteres)";
    if (password !== confirmarPassword) errores.confirmarPassword = "Las contraseñas no coinciden";
    if (!validarRegion(region)) errores.region = "Región obligatoria";
    if (!validarComuna(comuna)) errores.comuna = "Comuna obligatoria";
    if (!validarDireccion(direccion)) errores.direccion = "Dirección obligatoria (máx. 200 caracteres)";
    if (!terminos) errores.terminos = "Debes aceptar los términos y condiciones";

    return errores;
}

// -- Validación de login --
function validarLogin({ email, password }) {
    let errores = {};

    if (!validarEmail(email)) errores.email = "Correo obligatorio y debe ser válido";
    if (!validarPassword(password)) errores.password = "Contraseña obligatoria (4-10 caracteres)";

    return errores;
}

// -- Validación de contacto --
function validarContacto({ nombre, email, comentario }) {
    let errores = {};

    if (!validarNombre(nombre)) errores.nombre = "Nombre obligatorio (máx. 100 caracteres)";
    if (!validarEmail(email)) errores.email = "Correo obligatorio y debe ser válido";
    if (!validarComentario(comentario)) errores.comentario = "Comentario obligatorio (máx. 500 caracteres)";

    return errores;
}

// -- Validación de actualización de perfil --
function validarPerfil({ direccion, telefono }) {
    let errores = {};

    if (!validarDireccion(direccion)) errores.direccion = "Dirección obligatoria (máx. 200 caracteres)";
    if (!validarTelefono(telefono)) errores.telefono = "Teléfono obligatorio (8-9 dígitos)";

    return errores;
}

// -- Validación y guardado del formulario de registro (para registro.html) --
function validarRegistroForm() {
    // Obtener campos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const run = document.getElementById('run').value.trim();
    const email = document.getElementById('correo').value.trim();
    const password = document.getElementById('contraseña').value;
    const confirmarPassword = document.getElementById('confirmarContraseña').value;
    const region = document.getElementById('region').value;
    const comuna = document.getElementById('comuna').value;
    const direccion = document.getElementById('direccion').value.trim();
    const terminos = document.getElementById('terminos').checked;

    // Validar datos
    const errores = validarRegistro({
        nombre, apellido, run, email, password, confirmarPassword, region, comuna, direccion, terminos
    });

    // Limpiar feedback visual
    [
        'nombre', 'apellido', 'run', 'correo', 'contraseña',
        'confirmarContraseña', 'region', 'comuna', 'direccion', 'terminos'
    ].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.classList.remove('is-invalid', 'is-valid');
    });

    // Mostrar errores en los campos
    let hayErrores = false;
    for (const campo in errores) {
        const input = document.getElementById(campo);
        if (input) input.classList.add('is-invalid');
        hayErrores = true;
    }

    // Validar email duplicado en localStorage
    let usuarios = JSON.parse(localStorage.getItem('huertohogar_usuarios')) || [];
    if (!errores.email && usuarios.some(u => u.email === email)) {
        document.getElementById('correo').classList.add('is-invalid');
        mostrarMensaje('El correo ya está registrado', 'danger');
        return false;
    }

    if (hayErrores) return false;

    return true;
}

// -- Utilidad para mostrar mensajes (usa showToast si existe, si no alert) --
function mostrarMensaje(mensaje, tipo = 'info') {
    if (typeof showToast === 'function') {
        showToast(mensaje, tipo);
    } else {
        alert(mensaje);
    }
}