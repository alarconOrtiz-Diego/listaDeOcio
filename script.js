window.onload = () => {
    document.getElementById("addLista").onclick = () => {
        crearLista("nombre", "ink")
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