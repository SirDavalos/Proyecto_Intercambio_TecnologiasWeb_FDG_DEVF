  //Botones
  const boton = document.getElementById("toggleModo");
  const continuarOrganizador = document.getElementById("ContinuarButtonOrganizador");
  const AgregarIntegrantes = document.getElementById("AgregarButtonIntegrante");
  const ContinuarIntegrantes = document.getElementById("ContinuarButtonIntegrante");
  const ContinuarExclusiones = document.getElementById("ContinuarButtonExclusiones");
  const selectCelebracion = document.getElementById("selectCelebracion");
  const selectPresupuesto = document.getElementById("selectPresupuesto");
  const ContinuarButtonCelebracion = document.getElementById("ContinuarButtonCelebracion");
  const ContinuarButtonFecha = document.getElementById("ContinuarButtonFecha");
  const ContinuarButtonPresupuesto = document.getElementById("ContinuarButtonPresupuesto");
  const ContinuarButtonMostrar = document.getElementById("ContinuarButtonMostrar");
  //Inputs
  const checkOrganizador = document.getElementById("CheckOrganizador");
  const textBoxIntegrante = document.getElementById("textBoxIntegrante");
  const textBoxOrganizador = document.getElementById("textBoxOrganizador");
  const textBoxCelebracion = document.getElementById("textBoxCelebracion");
  const textBoxPresupuesto = document.getElementById("textBoxPresupuesto");
  const inputFecha = document.getElementById("inputFecha");
  const Tabla_Cuerpo = document.getElementById("Tabla_Cuerpo");
  const nombre_Sorteado = document.getElementById("nombre_Sorteado");
  //Contenedores
  const Card_Integrante = document.getElementById("Card_Integrante");
  const Card_Organizador = document.getElementById("Card_Organizador");
  const Card_Exclusiones = document.getElementById("Card_Exclusiones");
  const Card_Presupuesto = document.getElementById("Card_Presupuesto");
  const ContainerIntegrantes = document.getElementById("ContainerIntegrantes");
  const ContainerInfoGeneral = document.getElementById("ContainerInfoGeneral");
  const ContainerInfoPersona = document.getElementById("ContainerInfoPersona");
  const Exclusiones_Opciones = document.getElementById("Exclusiones_Opciones");
  const Card_Celebracion = document.getElementById("Card_Celebracion");
  const Card_Fecha = document.getElementById("Card_Fecha");
  const Card_Mostrar = document.getElementById("Card_Mostrar");
  const Card_Sorteo = document.getElementById("Card_Sorteo");
  const layoutIntegrantes = document.getElementById("layoutIntegrantes");
  const hueco_sorteo = document.getElementById("hueco_sorteo");
  //Array para los integrantes
  const Integrantes = [];
  //variable para los integrantes
  let InfoIntegrantes
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
    localStorage.setItem("modo", modoGuardado);
    Card_Integrante.style.display = "none";
    Card_Organizador.style.display = "block";
    Card_Exclusiones.style.display = "none";
    Card_Celebracion.style.display = "none";
    Card_Fecha.style.display = "none";
    Card_Presupuesto.style.display = "none";
    Card_Mostrar.style.display = "none";
    Card_Sorteo.style.display = "none";
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
    localStorage.setItem("Organizador", NombreOrganizador);
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
        Celebracion();
      }
    });
  });

  ContinuarExclusiones.addEventListener("click", (e) => {
    e.preventDefault();

    Integrantes.forEach(ItemIntegrante => {
      let index = 0;
      Integrantes.forEach(ItemOpciones => {
        if(ItemIntegrante.id != ItemOpciones.id){
          const checkId = document.getElementById(`check_${ItemIntegrante.id}_${ItemOpciones.id}`);
          if(checkId.checked){
            ItemIntegrante.exclusiones[index] = ItemOpciones.nombre;
            index++;
          }
        }
      });
    });

    localStorage.setItem("Integrantes", JSON.stringify(Integrantes));
    Card_Exclusiones.style.display = "none"
    Celebracion();
  });

  ContinuarButtonCelebracion.addEventListener("click", (e) => {
    localStorage.setItem("Celebracion", textBoxCelebracion.value);
    Card_Celebracion.style.display = "none";
    Fecha();
  })

  ContinuarButtonFecha.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.setItem("Fecha", inputFecha.value);

    Card_Fecha.style.display = "none";
    Presupuesto();
  })

  ContinuarButtonPresupuesto.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("Presupuesto", textBoxPresupuesto.value);
    Card_Presupuesto.style.display = "none";

    MostrarInfo();
  });

  ContinuarButtonMostrar.addEventListener("click", (e) => {
    e.preventDefault();
    Card_Mostrar.style.display = "none";
    MostrarPiezas();
    MostrarSorteos();
  })

  selectCelebracion.addEventListener("click", (e) => {
      e.preventDefault();
      if(selectCelebracion.value == "Otro"){
        textBoxCelebracion.disabled = false;
        textBoxCelebracion.value = "";
      }else{
        textBoxCelebracion.disabled = true;
        textBoxCelebracion.value = selectCelebracion.value;
      }
  });

  selectPresupuesto.addEventListener("click", (e) => {
    e.preventDefault();
    if(selectPresupuesto.value == "Otro"){
      textBoxPresupuesto.disabled = false;
      textBoxPresupuesto.value = "$";
    }else{
      textBoxPresupuesto.disabled = true;
      textBoxPresupuesto.value = selectPresupuesto.value;
    }
    
  });

  ContainerIntegrantes.addEventListener("click", (e) => {
        if(e.target.classList.contains("btn-close")){
            const item = e.target.parentElement;
            const id = item.id.split("-")[1];
            // eliminar del array
            const index = Integrantes.findIndex(i => i.id == id);
            if(index !== -1){
                Integrantes.splice(index,1);
            }
            // actualizar localStorage
            localStorage.setItem("Integrantes", JSON.stringify(Integrantes));
            item.remove();
        }

  });

  //Funciones del hueco
  hueco_sorteo.addEventListener("dragover", e => {
    e.preventDefault();
  })

  hueco_sorteo.addEventListener("drop", (e) => {
    e.preventDefault();
    let raw = e.dataTransfer.getData("text/plain");
    if(!raw) return;

    let data = JSON.parse(raw);
    const pieza = document.getElementById(data.id);

    if(!pieza) return;
    console.log(pieza)
    hueco_sorteo.innerHTML = pieza.innerHTML;

    nombre_Sorteado.innerHTML = `¡Tu Amigo secreto es ${data.sorteado}!`
  })
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

  function Celebracion(){
    Card_Celebracion.style.display ="block";
    textBoxCelebracion.value = selectCelebracion.value;

  }

  function Fecha(){
    Card_Fecha.style.display = "block";

    let celebracion = localStorage.getItem("Celebracion");
    //Sacar el dia de hot en formato yyyy-mm-dd
    let hoy = new Date()
    let dia = hoy.getDate();
    let mes = hoy.getMonth() + 1;
    let anio = hoy.getFullYear();

    if(hoy.getDate() < 10){
      dia = "0"+hoy.getDate();
    }
    if(hoy.getMonth() < 10){
      mes = "0"+ (hoy.getMonth() + 1);
    }
    let fechahoy = anio + "-" + mes + "-" + dia;
    inputFecha.setAttribute("min", fechahoy);
    console.log(fechahoy);
    inputFecha.value = fechahoy;
    switch (celebracion) {
      case "Navidad":
        inputFecha.value = "2026-12-01";
        break;
      case "Año nuevo":
        inputFecha.value = "2027-01-01";
        break;
      case "San valentin":
        inputFecha.value = "2027-02-14";
        break;
      case "Dia del niño":
        inputFecha.value = "2026-04-30";
        break;
      case "Dia de la madre":
        inputFecha.value = "2026-05-10";
        break;
      case "Dia del Padre":
        inputFecha.value = "2026-06-21";
        break;
      default:
        
        break;
    }
  }

  function Presupuesto(){
    Card_Presupuesto.style.display ="block";
    textBoxPresupuesto.value = selectPresupuesto.value;
  }

  function MostrarInformacionGeneral(){
    const html = `<p class="text-start">Intercambio: ${localStorage.getItem("Celebracion")}</p>
                <p class="text-start">Nombre del Organizador: ${localStorage.getItem("Organizador")}</p>
                <p class="text-start">Fecha: ${localStorage.getItem("Fecha")}</p>
                <p class="text-start">Presupuesto por integrante: ${localStorage.getItem("Presupuesto")}</p>`
    return html;
  }

  function MostrarInformacionIntegrantes(){
    
    InfoIntegrantes = JSON.parse(localStorage.getItem("Integrantes"));
    if(InfoIntegrantes){
      //console.log(InfoIntegrantes);
      let html = "";
      let index = 0;
      InfoIntegrantes.forEach(Item => {
        index++;
        html += `<tr>
                  <th scope="row">${index}</th>
                  <td>${Item.nombre}</td>
                  <td>${Item.exclusiones}</td>
                </tr>`
      });
      return html;
    }
  } 

  function MostrarInfo(){
    Card_Mostrar.style.display = "block";
    ContainerInfoGeneral.innerHTML = MostrarInformacionGeneral();
    Tabla_Cuerpo.innerHTML = MostrarInformacionIntegrantes();
  }

  function MostrarPiezas(){
    Card_Sorteo.style.display ="block"
    InfoIntegrantes = JSON.parse(localStorage.getItem("Integrantes"));
    if (InfoIntegrantes) {
      let html ="";
      InfoIntegrantes.forEach(Item => {
        html += `<div class="container-sm py-3" id="nombre_Arrastre-${Item.id}" draggable="true">
                    <p class="text-secondary small">
                      ${Item.nombre}
                    </p>
                </div>`
      })
      layoutIntegrantes.innerHTML = html;
    }
  }

  function Sortear(){
    const sorteo = [];
    let eleccion = {
      nombre: "",
      sorteado: ""
    }
    let InfoIntegrantes = JSON.parse(localStorage.getItem("Integrantes"));
    if(InfoIntegrantes){
      console.log(InfoIntegrantes);
      console.log(InfoIntegrantes[0]);
      let random = [];
      for(let j = 0; j<InfoIntegrantes.length; j++){
        random[j] = j;
      }
      random = revolverRandom(random)
      let index = 0;
      InfoIntegrantes.forEach(Item => {
        let num = random[index]; //Agarra el primer numero del array aleatorio
        let exclusiones =  Item.exclusiones; 
        if (exclusiones.length == 0) {
          console.log(num)
            eleccion.nombre = Item.nombre;
            eleccion.sorteado = InfoIntegrantes[num].nombre;
            ArrayRandom.pop();
        } else {
          for (let i = 0; i < exclusiones.length; i++) {
            if(InfoIntegrantes[num].nombre != exclusiones[i]){
              eleccion.nombre = Item.nombre;
              eleccion.sorteado = InfoIntegrantes[num].nombre;
              ArrayRandom.pop();
              break;
            }
          }
        }
        //console.log(eleccion);
        sorteo.push(eleccion);
      });
    }

    return sorteo;
  }

  function MostrarSorteos(){
    let sorteo = Sortear();
    let index = 0;
    InfoIntegrantes = JSON.parse(localStorage.getItem("Integrantes"));
    if(InfoIntegrantes){
        InfoIntegrantes.forEach(Item => {
          const id = `nombre_Arrastre-${Item.id}`
          DragBox = document.getElementById(id);
          const i = sorteo[index].sorteado
          DragBox.addEventListener("dragstart", (e) => {
            const data = {
              id: id,
              sorteo_nombre: i
            }
            console.log(data);
            e.dataTransfer.setData("text/plain", JSON.stringify(data));

            e.dataTransfer.effectAllowed = "move";
          });
          index++;
        });
    }
  }

  function revolverRandom(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}