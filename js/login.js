document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('correoLogin').value;
            const pass = document.getElementById('passLogin').value;

            const user = loginUsuario(email, pass);

            if (user) {
                if (user.rol === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'Index.html';
                }
            } else {
                alert('Correo o contraseña incorrectos.');
            }
        });
    }
});
