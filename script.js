window.onload = () => {
    document.getElementById("addLista").onclick = () => {
        document.getElementById("fondoOscuro").style.display = "block";
        document.getElementById("creadorListas").style.display = "block";
    }

    document.getElementById("fondoOscuro").onclick = () => {
        document.getElementById("fondoOscuro").style.display = "none";
        document.getElementById("creadorListas").style.display = "none";
    }

    document.getElementById("crear").onclick = () => {
        let nombre = document.getElementById("inputNombre").value;
        let color = document.getElementById("inputColor").value;
        crearLista(nombre, color)
        document.getElementById("fondoOscuro").style.display = "none";
        document.getElementById("creadorListas").style.display = "none";
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