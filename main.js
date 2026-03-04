  const boton = document.getElementById("toggleModo");
  const continuar = document.getElementById("ContinuarButton");
  const checkOrganizador = document.getElementById("CheckOrganizador");
  const textBoxOrganizador = document.getElementById("textBoxOrganizador");

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

  continuar.addEventListener("click", (e) => {
    e.preventDefault();

    NombreOrganizador = textBoxOrganizador.value;
    if (checkOrganizador.checked) {
      localStorage.setItem("0", NombreOrganizador);
    }
    
  });