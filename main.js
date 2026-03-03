  const boton = document.getElementById("toggleModo");

  // Aplicar modo guardado al cargar
  window.addEventListener("DOMContentLoaded", () => {
    const modoGuardado = localStorage.getItem("modo");

    if (modoGuardado === "oscuro") {
      document.body.classList.add("modo-oscuro");
      boton.textContent = "☀️";
      boton.classList.remove("btn-light");
      boton.classList.add("btn-dark");
    }
  });

  boton.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");

    if (document.body.classList.contains("modo-oscuro")) {
      localStorage.setItem("modo", "oscuro");
      boton.textContent = "☀️";
      boton.classList.remove("btn-light");
      boton.classList.add("btn-dark");
    } else {
      localStorage.setItem("modo", "claro");
      boton.textContent = "🌙";
      boton.classList.remove("btn-dark");
      boton.classList.add("btn-light");
    }
  });