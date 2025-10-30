document.addEventListener("DOMContentLoaded", () => {

  const Palabra = document.getElementById("palabra");
  const Ronda = document.getElementById("ronda");
  const error = document.getElementById("errores");
  const spanTemporizador = document.getElementById("temporizador");
  const btnTerminar = document.getElementById("btnTerminar");
  const btnSalir = document.getElementById("btnSalir");
  const letrasEmpleadas = document.getElementById("letrasUsadas");
  const btnPista = document.getElementById("pista");
  const ERRORES_INICIALES = 6;

  let ronda = 1;
  let errores = ERRORES_INICIALES;
  let palabraActual = "";
  let letrasAdivinadas = [];
  let letrasErroneas = [];
  const MAX_PISTAS = 1;
  const tiempoTotal = 50;
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
    letrasEmpleadas.textContent = "";
    pistasUsadas = 0;

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
        if (!letrasErroneas.includes(letra)) {
          letrasErroneas.push(letra);
          actualizarLetrasErroneas();
          errores--;
          error.textContent = `${errores}`;
          if (errores <= 0) {
            mostrarResultados("Demasiados errores", false);
          }
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
    window.location.href = "index.html"; 
  });

  btnPista.addEventListener("click", () => {
    if (pistasUsadas >= MAX_PISTAS) {
      alert("Ya has usado todas las pistas disponibles.");
      return;
    }

    const letrasRestantes = [...new Set(
      palabraActual.split("").filter(
        (l) => !letrasAdivinadas.includes(l) && l !== " "
      )
    )];

    if (letrasRestantes.length === 0) {
      alert("Ya has descubierto todas las letras.");
      return;
    }
    const letraPista = letrasRestantes[Math.floor(Math.random() * letrasRestantes.length)];
    letrasAdivinadas.push(letraPista);
    mostrarPalabra();
    verificarVictoria();

    pistasUsadas++;
    alert(`Pista usada: ${letraPista} (${pistasUsadas}/${MAX_PISTAS})`);
  });


});