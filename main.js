  //Botones
  const boton = document.getElementById("toggleModo");
  const continuarOrganizador = document.getElementById("ContinuarButtonOrganizador");
  const AgregarIntegrantes = document.getElementById("AgregarButtonIntegrante");
  const ContinuarIntegrantes = document.getElementById("ContinuarButtonIntegrante");
  const botonEliminar = document.querySelectorAll(".btn-close");
  const ContinuarExclusiones = document.getElementById("ContinuarButtonExclusiones");
  //Inputs de texto
  const checkOrganizador = document.getElementById("CheckOrganizador");
  const textBoxIntegrante = document.getElementById("textBoxIntegrante");
  const textBoxOrganizador = document.getElementById("textBoxOrganizador");
  //Contenedores
  const Card_Integrante = document.getElementById("Card_Integrante");
  const Card_Organizador = document.getElementById("Card_Organizador");
  const Card_Exclusiones = document.getElementById("Card_Exclusiones");
  const ContainerIntegrantes = document.getElementById("ContainerIntegrantes"); 
  const Exclusiones_Opciones = document.getElementById("Exclusiones_Opciones");
  //Array para los integrantes
  const Integrantes = [];

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
    localStorage.clear();
    localStorage.setItem("modo", modoGuardado)
    Card_Integrante.style.display = "none";
    Card_Organizador.style.display = "block";
    Card_Exclusiones.style.display = "none";
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
      agregarIntegrante(0, NombreOrganizador);
    }
    Card_Integrante.style.display = "block";
    Card_Organizador.style.display = "none";
  });

  let indexIntegrantes = 1;
  AgregarIntegrantes.addEventListener("click", (e) => {
    e.preventDefault();

    NombreIntegrante = textBoxIntegrante.value;
    if(NombreIntegrante != null){
      agregarIntegrante(indexIntegrantes, NombreIntegrante);
      indexIntegrantes++;
    }
    
    textBoxIntegrante.value = "";
  });

  ContinuarButtonIntegrante.addEventListener("click", (e) => {
    Swal.fire({
      title: "¿Quieres excluir ciertos sorteos?",
      text: "Si gusta, puede evitar que ciertos integrantes saquen nombres especificos",
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      denyButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if(result.isConfirmed){
        Card_Integrante.style.display = "none";
        Exclusiones();
      }else if(result.isDenied){
        Card_Integrante.style.display = "none";
      }
    });
  });

  ContinuarExclusiones.addEventListener("click", (e) => {
    e.preventDefault();

    Integrantes.forEach(ItemIntegrante => {
      let index = 0;
      Integrantes.forEach(ItemOpciones => {
        const checkId = document.getElementById(`check_${ItemIntegrante.id}_${ItemOpciones.id}`);
        if(checkId.checked){
          ItemIntegrante.exclusiones[index] = ItemOpciones.nombre;
          index++;
        }
      })
    })

    localStorage.setItem("Integrantes", JSON.stringify(Integrantes));
  })

  botonEliminar.forEach((button) => {
    button.addEventListener("click", (e)  => {
      const Item = e.target.parentElement;
      Item.remove();
    });
  });

  //Funciones Internas
  function agregarIntegrante(index, nombre){
    let html
    Integrantes.push({
      id: index,
      nombre: nombre,
      exclusiones: []
    })
    if (nombre != null) {
       html = `
        <div class="list-group-item d-flex justify-content-between align-items-center" id="container-${index}">
            <input type="text" class="form-control me-2" value="${nombre}" disabled>
            <button type="button" class="btn-close"></button>
        </div>
        `
      ContainerIntegrantes.innerHTML+= html;
    }
    localStorage.setItem("Integrantes", JSON.stringify(Integrantes));
  }

  function Exclusiones(){
    let html;
    Card_Exclusiones.style.display = "block";

    Integrantes.forEach(ItemIntegrante => {
      let opciones = ``;
      Integrantes.forEach(ItemOpciones => {
        if(ItemIntegrante.id != ItemOpciones.id){
          opciones += `<li>
                        <div class="form-check form-check-reverse">
                          <input class="form-check-input" type="checkbox" value="" id="check_${ItemIntegrante.id}_${ItemOpciones.id}">
                          <label class="form-check-label" for="check-${ItemIntegrante.id}-${ItemOpciones.id}">
                            ${ItemOpciones.nombre}
                          </label>
                        </div>
                      </li>`
        }
      }); 
      html = `<div class="input-group mb-3">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">${ItemIntegrante.nombre}</button>
                <ul class="dropdown-menu">
                  ${opciones}
                </ul>
              </div>`
      Exclusiones_Opciones.innerHTML += html;
    });
    
  }