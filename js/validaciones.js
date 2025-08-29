// Funciones de validación generales
function mostrarMensaje(mensaje, tipo = 'info') {
    // Usar el toast de cartManager si está disponible
    if (typeof cartManager !== 'undefined' && typeof cartManager.showAlert === 'function') {
        cartManager.showAlert(mensaje, tipo);
    } else {
        alert(mensaje);
    }
}

function validarEmail(email) {
    const emailRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return emailRegex.test(email);
}

function validarLongitud(texto, min, max) {
    return texto.length >= min && texto.length <= max;
}

// Validaciones para Login
function validarEmailLogin() {
    const emailInput = document.getElementById('correoLogin');
    const errorDiv = document.getElementById('correoLoginError');
    
    if (!emailInput.value) {
        emailInput.classList.add('is-invalid');
        errorDiv.textContent = 'El correo es requerido';
        return false;
    }
    
    if (!validarEmail(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        errorDiv.textContent = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com';
        return false;
    }
    
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
    return true;
}

function validarPasswordLogin() {
    const passwordInput = document.getElementById('passLogin');
    const errorDiv = document.getElementById('passLoginError');
    
    if (!passwordInput.value) {
        passwordInput.classList.add('is-invalid');
        errorDiv.textContent = 'La contraseña es requerida';
        return false;
    }
    
    if (!validarLongitud(passwordInput.value, 4, 10)) {
        passwordInput.classList.add('is-invalid');
        errorDiv.textContent = 'La contraseña debe tener entre 4 y 10 caracteres';
        return false;
    }
    
    passwordInput.classList.remove('is-invalid');
    passwordInput.classList.add('is-valid');
    return true;
}

function validarLogin() {
    const emailValido = validarEmailLogin();
    const passwordValido = validarPasswordLogin();
    
    return emailValido && passwordValido;
}

// Validaciones para Registro
function validarNombre() {
    const nombreInput = document.getElementById('nombre');
    const errorDiv = document.getElementById('nombreError');
    
    if (!nombreInput.value) {
        nombreInput.classList.add('is-invalid');
        errorDiv.textContent = 'El nombre es requerido';
        return false;
    }
    
    if (!validarLongitud(nombreInput.value, 1, 50)) {
        nombreInput.classList.add('is-invalid');
        errorDiv.textContent = 'El nombre debe tener máximo 50 caracteres';
        return false;
    }
    
    nombreInput.classList.remove('is-invalid');
    nombreInput.classList.add('is-valid');
    return true;
}

function validarApellido() {
    const apellidoInput = document.getElementById('apellido');
    const errorDiv = document.getElementById('apellidoError');
    
    if (!apellidoInput.value) {
        apellidoInput.classList.add('is-invalid');
        errorDiv.textContent = 'El apellido es requerido';
        return false;
    }
    
    if (!validarLongitud(apellidoInput.value, 1, 50)) {
        apellidoInput.classList.add('is-invalid');
        errorDiv.textContent = 'El apellido debe tener máximo 50 caracteres';
        return false;
    }
    
    apellidoInput.classList.remove('is-invalid');
    apellidoInput.classList.add('is-valid');
    return true;
}

function validarEmailRegistro() {
    const emailInput = document.getElementById('correo');
    const errorDiv = document.getElementById('correoError');
    
    if (!emailInput.value) {
        emailInput.classList.add('is-invalid');
        errorDiv.textContent = 'El correo es requerido';
        return false;
    }
    
    if (!validarEmail(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        errorDiv.textContent = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com';
        return false;
    }
    
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
    return true;
}

function validarPasswordRegistro() {
    const passwordInput = document.getElementById('contraseña');
    const errorDiv = document.getElementById('contraseñaError');
    
    if (!passwordInput.value) {
        passwordInput.classList.add('is-invalid');
        errorDiv.textContent = 'La contraseña es requerida';
        return false;
    }
    
    if (!validarLongitud(passwordInput.value, 4, 10)) {
        passwordInput.classList.add('is-invalid');
        errorDiv.textContent = 'La contraseña debe tener entre 4 y 10 caracteres';
        return false;
    }
    
    passwordInput.classList.remove('is-invalid');
    passwordInput.classList.add('is-valid');
    return true;
}

function validarConfirmarPassword() {
    const passwordInput = document.getElementById('contraseña');
    const confirmInput = document.getElementById('confirmarContraseña');
    const errorDiv = document.getElementById('confirmarContraseñaError');
    
    if (!confirmInput.value) {
        confirmInput.classList.add('is-invalid');
        errorDiv.textContent = 'Debes confirmar tu contraseña';
        return false;
    }
    
    if (passwordInput.value !== confirmInput.value) {
        confirmInput.classList.add('is-invalid');
        errorDiv.textContent = 'Las contraseñas no coinciden';
        return false;
    }
    
    confirmInput.classList.remove('is-invalid');
    confirmInput.classList.add('is-valid');
    return true;
}

function validarTerminos() {
    const terminosInput = document.getElementById('terminos');
    
    if (!terminosInput.checked) {
        terminosInput.classList.add('is-invalid');
        return false;
    }
    
    terminosInput.classList.remove('is-invalid');
    return true;
}

function validarRegistro() {
    const nombreValido = validarNombre();
    const apellidoValido = validarApellido();
    const emailValido = validarEmailRegistro();
    const passwordValido = validarPasswordRegistro();
    const confirmValido = validarConfirmarPassword();
    const terminosValido = validarTerminos();
    
    return nombreValido && apellidoValido && emailValido && passwordValido && confirmValido && terminosValido;
}

// Validaciones para Contacto
function validarContacto() {
    const nombreInput = document.getElementById('nombreContacto');
    const emailInput = document.getElementById('correoContacto');
    const comentarioInput = document.getElementById('comentario');
    
    let valido = true;
    
    // Validar nombre
    if (!nombreInput.value) {
        nombreInput.classList.add('is-invalid');
        valido = false;
    } else if (!validarLongitud(nombreInput.value, 1, 100)) {
        nombreInput.classList.add('is-invalid');
        valido = false;
    } else {
        nombreInput.classList.remove('is-invalid');
        nombreInput.classList.add('is-valid');
    }
    
    // Validar email
    if (!emailInput.value) {
        emailInput.classList.add('is-invalid');
        valido = false;
    } else if (!validarEmail(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        valido = false;
    } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
    }
    
    // Validar comentario
    if (!comentarioInput.value) {
        comentarioInput.classList.add('is-invalid');
        valido = false;
    } else if (!validarLongitud(comentarioInput.value, 1, 500)) {
        comentarioInput.classList.add('is-invalid');
        valido = false;
    } else {
        comentarioInput.classList.remove('is-invalid');
        comentarioInput.classList.add('is-valid');
    }
    
    return valido;
}

// Validación de RUN (para admin)
function validarRUN(run) {
    // Eliminar puntos y guión
    run = run.replace(/[\.\-]/g, '');
    
    // Validar longitud
    if (run.length < 7 || run.length > 9) {
        return false;
    }
    
    // Validar que sea alfanumérico
    const runRegex = /^[0-9]+[0-9kK]{1}$/;
    if (!runRegex.test(run)) {
        return false;
    }
    
    return true;
}

// Formatear RUN
function formatearRUN(run) {
    run = run.replace(/[\.\-]/g, '');
    if (run.length <= 1) return run;
    
    let cuerpo = run.slice(0, -1);
    let dv = run.slice(-1).toUpperCase();
    
    // Insertar puntos cada 3 dígitos desde el final
    let formatted = '';
    for (let i = cuerpo.length - 1, j = 1; i >= 0; i--, j++) {
        formatted = cuerpo[i] + formatted;
        if (j % 3 === 0 && i !== 0) {
            formatted = '.' + formatted;
        }
    }
    
    return formatted + '-' + dv;
}