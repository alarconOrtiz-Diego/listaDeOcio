window.onload = () => {
    let fondoOscuro = document.querySelector("#fondoOscuro");
    let creadorListas = document.querySelector("#creadorListas");

    document.getElementById("addLista").onclick = () => {
        animacion("addLista");
        fondoOscuro.style.display = "flex";
        creadorListas.style.display = "block";
    }

    document.getElementById("fondoOscuro").onclick = () => {
        fondoOscuro.style.display = "none";
        creadorListas.style.display = "none";
    }

    document.getElementById("crear").onclick = () => {
        let nombre = document.getElementById("inputNombre").value;
        let color = document.getElementById("inputColor").value;
        crearLista(nombre, color)
        fondoOscuro.style.display = "none";
        creadorListas.style.display = "none";
    }
}

// FUNCIONES UTILIZADAS

function crearLista(nombre, color) {
    if (nombre == "ftuser") {
        // Cositas
    } else {
        let lista = document.createElement("div");
        lista.setAttribute("class", "lista");
        let h5 = document.createElement("h5");
        h5.textContent = nombre;
        let cantidad = document.createElement("div");
        cantidad.setAttribute("class", "cantidadElementosLista")
        cantidad.textContent = "0";
        lista.appendChild(h5);
        lista.appendChild(cantidad);
        lista.style.backgroundColor = color;
        document.getElementById("contenedorListas").appendChild(lista);
    }
}

function animacion(elem) {
    document.getElementById(elem).style.animation = "pulsado 0.3s";
    setTimeout(() => {
        document.getElementById(elem).style.animation = "";
    }, 300);
}