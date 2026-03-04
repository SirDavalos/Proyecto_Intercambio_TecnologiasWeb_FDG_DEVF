  const boton = document.getElementById("toggleModo");
  const continuarOrganizador = document.getElementById("ContinuarButtonOrganizador");
  const checkOrganizador = document.getElementById("CheckOrganizador");
  const textBoxIntegrante = document.getElementById("ContainerIntegrantes");
  const textBoxOrganizador = document.getElementById("textBoxOrganizador");

  // Aplicar modo guardado al cargar
  window.addEventListener("DOMContentLoaded", () => {
    const modoGuardado = localStorage.getItem("modo");

    //TEMPORAL, Aqui se carga el card de integrantes
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

  continuarOrganizador.addEventListener("click", (e) => {
    e.preventDefault();

    NombreOrganizador = textBoxOrganizador.value;
    if (checkOrganizador.checked) {
      localStorage.setItem("0", NombreOrganizador);
      agregarIntegrante(0, NombreOrganizador);
    }else{
      let html = `<div class="container-flex">
                  <input type="text" name="textBoxIntegrante" id="textBoxIntegrante-${index}" value="nombre" ${index}"></input>
                </div>`
    }
    
  });

  function agregarIntegrante(index){
    let html = `<input type="text" name="textBoxIntegrante" id="textBoxIntegrante-${index}" placeholder="Introduzca su nombre"></input>`
    textBoxIntegrante.innerHTML= html;
  }

  //Sobrecarga de la misma funcion
  function agregarIntegrante(index, nombre){
    let html = `<div class="container-flex">
                  <input type="text" name="textBoxIntegrante" id="textBoxIntegrante-${index}" value="nombre" ${index}"></input>
                </div>`
    textBoxIntegrante.innerHTML+= html;
  }