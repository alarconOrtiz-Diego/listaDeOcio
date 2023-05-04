window.onload = () => {
    let fondoOscuro = document.querySelector("#fondoOscuro");
    let creadorListas = document.querySelector("#creadorListas");
    let contadorUnnamed = 1;

    document.getElementById("addLista").onclick = () => {
        animacion("addLista");
        fondoOscuro.style.display = "flex";
        creadorListas.style.display = "block";
        let selector = document.getElementsByClassName("selectorColor");
        for (let i = 0; i < selector.length; i++)
            selector[i].style.backgroundColor = selector[i].id;
    }

    document.getElementById("proximos").onclick = () => {
        animacion("proximos");
    }

    document.getElementById("terminados").onclick = () => {
        animacion("terminados");
    }

    document.getElementById("fondoOscuro").onclick = () => {
        fondoOscuro.style.display = "none";
        creadorListas.style.display = "none";
        document.getElementById("formuNombre").style.display = "none";
        for (let i = 0; i < document.querySelectorAll(".panelOpciones").length; i++) {
            document.querySelectorAll(".panelOpciones")[i].style.display = "none";
        }
        reestablecerCreador();
    }

    document.getElementById("crear").onclick = () => {
        let nombre = document.getElementById("inputNombre").value;
        let descripcion = document.getElementById("inputDescripcion").value;
        contadorUnnamed = crearLista(nombre, descripcion, contadorUnnamed);
        fondoOscuro.style.display = "none";
        creadorListas.style.display = "none";
        reestablecerCreador();
    }

    let actual = 0;
    for (let i = 0; i < document.querySelectorAll("input[type=radio]").length; i++) {
        document.querySelectorAll("input[type=radio]")[i].onclick = () => {
            document.querySelectorAll("input[type=radio]")[actual].style.border = "1px solid #f5f5f585";
            actual = i;
            document.querySelectorAll("input[type=radio]")[i].style.border = "2px solid white";
        }
    }
}

// FUNCIONES UTILIZADAS

function crearNodo(etiqueta, id, clase, padre, textContent) {
    let elem = document.createElement(etiqueta);
    elem.id = id;
    elem.classList = clase;
    if (textContent != "") elem.textContent = textContent;
    document.querySelector(padre).appendChild(elem);
    return elem;
}

function crearLista(nombre, descripcion, contadorUnnamed) {
    if (nombre == "ftuser") {
        // Cositas
    } else {
        if (nombre.charAt(0) == " " || nombre == "") {
            nombre = `Unnamed_${contadorUnnamed}`;
            contadorUnnamed++;
        }
        if (nombre.length > 9) nombre = nombre.slice(0, 9);
        if (nombre.includes(" ")) nombre = nombre.replace(" ", "_");
        let nombresListas = document.getElementsByClassName("nombres");
        for (let i = 0; i < nombresListas.length; i++)
            if (nombresListas[i].textContent.toLocaleLowerCase() == nombre.toLocaleLowerCase()) {
                document.getElementById("error").style.display = "flex";
                document.getElementById("error").style.animation = "pop 0.3s"
                setTimeout(() => { document.getElementById("error").style.animation = "popInv 1.5s" }, 2000);
                setTimeout(() => { document.getElementById("error").style.display = "none" }, 3500);
                return contadorUnnamed;
            }
        let lista = crearNodo("div", nombre, "lista", "#contenedorListas", "")
        crearNodo("h5", nombre, "nombres", `#${nombre}`, nombre)
        crearNodo("div", "", "cantidadElementosLista", `#${nombre}`, "0")
        let color = "";
        for (let i = 0; i < document.querySelectorAll("input[type=radio]").length; i++)
            if (document.querySelectorAll("input[type=radio]")[i].checked) color = document.querySelectorAll("input[type=radio]")[i].id;
            if (color == "") color = "#9775FE";
        lista.style.backgroundColor = color;
        activarEventoLista(nombre, descripcion, color);
    }
    return contadorUnnamed;
}

function crearContenidoLista(nombre, descripcion, color) {
    let contenidoLista = crearNodo("div", `contenedor_${nombre}`, "contenidoListas", "#contenedorListas", "");
    contenidoLista.style.backgroundColor = color;
    crearNodo("h2", `h2_${nombre}`, "tituloContenidoLista", `#contenedor_${nombre}`, nombre);
    let infoLista = crearNodo("img", ``, "infoLista", `#h2_${nombre}`, "");
    infoLista.src = "./media/info.png"
    let contenedorDescripcion = crearNodo("div", `contenedorDescripccion_${nombre}`, "contenedorDescripccion", `#contenedor_${nombre}`, "");
    if (descripcion.charAt(0) == " " || descripcion == "") descripcion = "No existe descripción de esta lista"
    crearNodo("p", "", "", `#contenedorDescripccion_${nombre}`, descripcion);
    infoLista.onclick = () => document.getElementById(`contenedorDescripccion_${nombre}`).style.display = "flex";
    contenedorDescripcion.onclick = () => document.getElementById(`contenedorDescripccion_${nombre}`).style.display = "none";
    let volver = crearNodo("img", `volver_${nombre}`, "volver", `#h2_${nombre}`, "");
    volver.src = "./media/volver.png"
    crearNodo("div", `filtro_${nombre}`, "contenedorFiltro", `#contenedor_${nombre}`, "");
    crearNodo("p", ``, "", `#filtro_${nombre}`, "Filtrar por: ");
    let listado = crearNodo("ul", `list_${nombre}`, "listado", `#contenedor_${nombre}`, "");
    let addToLista = crearNodo("div", ``, "addToLista", `#contenedor_${nombre}`, "+");
    addToLista.onclick = () => activarEventoAddToLista(listado, nombre);
}

function eventoOpcionesElementos(nombre) {
    crearNodo("div", `opciones_${nombre}`, "panelOpciones", "#contenedorListas", "");
}

function activarEventoAddToLista(listado, nombreLista) {
    document.getElementById("formuNombre").style.display = "flex";
    document.getElementById("fondoOscuro").style.display = "flex";
    document.querySelector("#formuNombre input[type=button]").onclick = () => {
        let nombre = document.getElementById("inputNombreElemento").value;
        if (nombre.charAt(0) !== " " && nombre !== "") {
            let elementos = document.querySelectorAll(`#contenedor_${nombreLista} ul div .elementos`);
            let repetido = false;
            for (let i = 0; i < elementos.length; i++)
                if (elementos[i].textContent.toLocaleLowerCase() == nombre.toLocaleLowerCase()) repetido = true;
            if (repetido == false) {
                crearNodo("div", `cont_elem_${nombre}`, "contenedorElementos", `#${listado.id}`, "");
                let opcionesElementos = crearNodo("img", ``, "opcionesElementos", `#cont_elem_${nombre}`, "");
                opcionesElementos.src = "./media/menu.png"
                crearNodo("li", ``, "elementos", `#cont_elem_${nombre}`, nombre);
                eventoOpcionesElementos(nombre);
                opcionesElementos.onclick = () => {
                    fondoOscuro.style.display = "flex";
                    document.getElementById(`opciones_${nombre}`).style.display = "flex";
                }
            }
            document.getElementById("inputNombreElemento").value = "";
        }
        document.getElementById("formuNombre").style.display = "none";
        document.getElementById("fondoOscuro").style.display = "none";
    }
}

function activarEventoLista(nombre, descripcion, color) {
    let lista = document.getElementById(nombre);
    crearContenidoLista(nombre, descripcion, color);

    lista.onclick = () => {
        animacion(nombre);
        document.getElementById(`contenedor_${nombre}`).style.display = "flex";
        document.getElementById(`volver_${nombre}`).onclick = () => botonVolver(nombre);
    }
}

function botonVolver(nombre) {
    document.getElementById(`contenedor_${nombre}`).style.animation = "hideLeft 0.3s"
    setTimeout(() => {
        document.getElementById(`contenedor_${nombre}`).style.display = "none";
        document.getElementById(`contenedorDescripccion_${nombre}`).style.display = "none";
        document.getElementById(`contenedor_${nombre}`).style.animation = "pop 0.3s";
    }, 300);
}

function reestablecerCreador() {
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputDescripcion").value = "";
}

function animacion(elem) {
    document.getElementById(elem).style.animation = "pulsado 0.3s";
    setTimeout(() => { document.getElementById(elem).style.animation = ""; }, 300);
}