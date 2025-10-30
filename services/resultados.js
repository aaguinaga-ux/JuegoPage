document.addEventListener("DOMContentLoaded", () => {
  const divResultados = document.getElementById("mostrarResultados");
  const btnSalir = document.getElementById("salir");
  const btnReiniciar = document.getElementById("reiniciar");

  const datos = JSON.parse(localStorage.getItem("resultadoJuego"));

  if (!datos) {
    divResultados.innerHTML = `
      <p class="text-red-600 font-semibold">No hay resultados disponibles.</p>
      <p>Por favor, vuelve a iniciar el juego.</p>
    `;
    return;
  }

  const { haGanado, motivo, tiempoUsado, tiempoTotal } = datos;

  let mensaje = "";
  let tiempoMensaje = "";

  if (haGanado) {
    mensaje = `<p class="text-green-600 text-2xl font-bold"> ¡GANADOR!</p>`;
    tiempoMensaje = `<p>Has completado el juego en <strong>${tiempoUsado}s</strong> de ${tiempoTotal}s disponibles.</p>`;
  } else {
    mensaje = `<p class="text-red-600 text-2xl font-bold"> Has perdido</p>`;

    if (motivo === "Tiempo agotado") {
      const tiempoExtra = tiempoUsado > tiempoTotal ? tiempoUsado - tiempoTotal : 0;
      tiempoMensaje = `
        <p>Motivo: <strong>${motivo}</strong></p>
        <p>Tiempo total usado: <strong>${tiempoUsado}s</strong> ${
          tiempoExtra > 0 ? `(te pasaste ${tiempoExtra}s)` : ""
        }</p>
      `;
    } else if (motivo === "Demasiados errores") {
      tiempoMensaje = `
        <p>Motivo: <strong>${motivo}</strong></p>
        <p>Tiempo empleado: <strong>${tiempoUsado}s</strong> de ${tiempoTotal}s</p>
      `;
    } else {
      tiempoMensaje = `
        <p>Motivo: <strong>${motivo || "Desconocido"}</strong></p>
        <p>Tiempo empleado: <strong>${tiempoUsado}s</strong></p>
      `;
    }
  }

  divResultados.innerHTML = `
    <div class="text-center space-y-3">
      ${mensaje}
      ${tiempoMensaje}
    </div>
  `;

  btnReiniciar.addEventListener("click", () => {
    localStorage.removeItem("resultadoJuego");
    window.location.href = "reglas.html";
  });

  btnSalir.addEventListener("click", () => {
    localStorage.removeItem("resultadoJuego");
    window.location.href = "login.html";
  });
});

