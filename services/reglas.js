document.addEventListener("DOMContentLoaded", () => {
  const principiante = document.getElementById("principiante");
  const intermedio = document.getElementById("intermedio");
  const avanzado = document.getElementById("avanzado");


  principiante.addEventListener("click", () => {
    window.location.href = "juegoPrincipiante.html";
  });
  intermedio.addEventListener("click", () => {
    window.location.href = "juegoIntermedio.html";
  });
  avanzado.addEventListener("click", () => {
    window.location.href = "juegoAvanzado.html";
  });

  principiante.addEventListener("mouseover", () => {
    principiante.style.backgroundColor = "#1c7db9ff";
  });
  intermedio.addEventListener("mouseover", () => {
    intermedio.style.backgroundColor = "#1cb96dff";
  });
  avanzado.addEventListener("mouseover", () => {
    avanzado.style.backgroundColor = "#a71515ff";
  });

});