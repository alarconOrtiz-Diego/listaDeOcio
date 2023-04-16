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

    document.getElementById("fondoOscuro").onclick = () => {
        fondoOscuro.style.display = "none";
        creadorListas.style.display = "none";
        reestablecerCreador();
    }

    document.getElementById("crear").onclick = () => {
        let nombre = document.getElementById("inputNombre").value;
        let descripcion = document.getElementById("inputDescripcion").value;
        crearLista(nombre, descripcion, contadorUnnamed);
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

function crearLista(nombre, descripcion, contadorUnnamed) {
    if (nombre == "ftuser") {
        // Cositas
    } else {
        if (nombre == "") {
            nombre = `Unnamed ${contadorUnnamed}`;
        }
        let lista = document.createElement("div");
        lista.setAttribute("class", "lista");
        lista.id = nombre;
        let h5 = document.createElement("h5");
        h5.textContent = nombre;
        let cantidad = document.createElement("div");
        cantidad.setAttribute("class", "cantidadElementosLista")
        cantidad.textContent = "0";
        lista.appendChild(h5);
        lista.appendChild(cantidad);
        let color = "";
        for (let i = 0; i < document.querySelectorAll("input[type=radio]").length; i++)
            if (document.querySelectorAll("input[type=radio]")[i].checked)
                color = document.querySelectorAll("input[type=radio]")[i].id;
            if (color == "")
                color = "#9775FE"
        lista.style.backgroundColor = color;
        document.getElementById("contenedorListas").appendChild(lista);
        lista.onclick = () => {
            animacion(nombre);
        }
    }
}

function reestablecerCreador() {
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputDescripcion").value = "";
}

function animacion(elem) {
    document.getElementById(elem).style.animation = "pulsado 0.3s";
    setTimeout(() => {
        document.getElementById(elem).style.animation = "";
    }, 300);
}