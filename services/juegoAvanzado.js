document.addEventListener("DOMContentLoaded", () => {

  
  const Palabra = document.getElementById("palabra");
  const Ronda = document.getElementById("ronda");
  const error = document.getElementById("errores");
  const spanTemporizador = document.getElementById("temporizador");
  const btnTerminar = document.getElementById("btnTerminar");
  const btnSalir = document.getElementById("btnSalir");
  const letrasEmpleadas = document.getElementById("letrasUsadas");
  const ERRORES_INICIALES = 6;

  let ronda = 1;
  let errores = ERRORES_INICIALES;
  let palabraActual = "";
  let letrasAdivinadas = [];
  let letrasErroneas = [];

  const tiempoTotal = 30;
  let tiempoRestante = tiempoTotal;
  let temporizadorActivo;

 
  iniciarTemporizador();
  cargarPalabra();

  
  function cargarPalabra() {
    if (ronda > palabras.length) {
       mostrarResultados("Ha completado todas las rondas", true);
      return;
    }

    const { palabra } = palabras[ronda - 1];
    palabraActual = palabra.toUpperCase();
    letrasAdivinadas = [];
    letrasErroneas = [];
    letrasEmpleadas.textContent = ""

    mostrarPalabra();
    Ronda.textContent = `${ronda}`;
    error.textContent = `${errores}`;
  }

 
  function mostrarPalabra() {
    let texto = "";

    for (const letra of palabraActual) {
      if (letrasAdivinadas.includes(letra)) {
        texto += letra + " ";
      } else if (letra === " ") {
        texto += "  ";
      } else {
        texto += "_ ";
      }
    }

    Palabra.textContent = texto.trim();
  }

 
  document.addEventListener("keydown", (event) => {
    const letra = event.key.toUpperCase();

    if (/^[A-ZÑ]$/.test(letra)) {
      if (palabraActual.includes(letra)) {
        if (!letrasAdivinadas.includes(letra)) {
          letrasAdivinadas.push(letra);
          mostrarPalabra();
          verificarVictoria();
        }
      } else {
        letrasErroneas.push(letra);
        actualizarLetrasErroneas();
        errores--;
        error.textContent = `${errores}`;
        if (errores <= 0) {
          mostrarResultados("Demasiados errores", false);
          return;
        }
          
        
      }
    }
  });

  function actualizarLetrasErroneas() {
    letrasEmpleadas.textContent = letrasErroneas.join(" ");
  }

  function verificarVictoria() {
    const palabraVisible = Palabra.textContent.replace(/\s/g, "");
    if (palabraVisible === palabraActual) {
      ronda++;
      errores = ERRORES_INICIALES;
      cargarPalabra();
    }
  }

 
  function iniciarTemporizador() {
    temporizadorActivo = setInterval(() => {
      tiempoRestante--;
      spanTemporizador.textContent = `Tiempo: ${tiempoRestante}s`;

      if (tiempoRestante <= 0) {
        clearInterval(temporizadorActivo);
        mostrarResultados("Tiempo agotado", false);
      }
    }, 1000);
  }

  
  function mostrarResultados(motivo = "", haGanado = false) {
    clearInterval(temporizadorActivo);

    const tiempoUsado = tiempoTotal - tiempoRestante;
    const resultado = {
      haGanado,
      motivo,
      tiempoUsado,
      tiempoTotal
    };

    localStorage.setItem("resultadoJuego", JSON.stringify(resultado));
    window.location.href = "resultados.html";
  }

  btnTerminar.addEventListener("click", () => {
    mostrarResultados("Terminó manualmente", false);
  });

  btnSalir.addEventListener("click", (event) => {
     window.location.href = "login.html"; 
  });


});
