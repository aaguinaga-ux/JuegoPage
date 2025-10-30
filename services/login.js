

document.addEventListener("DOMContentLoaded", () => {
  const inputUsuario = document.getElementById("usuario");
  const inputContraseña = document.getElementById("contraseña");
  const btnLogin = document.querySelector("button");

  usuario.addEventListener("focus", () => {
    usuario.style.borderColor = "blue";
  });

  contraseña.addEventListener("focus", () => {
    contraseña.style.borderColor = "blue";
  });

  btnLogin.addEventListener("click", () => {
    const usuario = inputUsuario.value.trim();
    const contraseña = inputContraseña.value.trim();
    const regex = /^[A-Za-z0-9]+$/;
    if (!regex.test(contraseña)) {
      alert("La contraseña solo puede contener letras y números.");
      return;
    }
   

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuariosPermitidos")) || [];

    const usuarioValido = usuariosGuardados.find(
      (u) => u.usuario === usuario && u.contraseña === contraseña
    );

    if (usuarioValido) {
      alert(`Bienvenido, ${usuarioValido.nombre}!`);
      window.location.href = "views/reglas.html";
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  });
});
