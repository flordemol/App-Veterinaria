const listaMascotas = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const duenio = document.getElementById("duenio");
const indice = document.getElementById("indice");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");

let mascotas = [
    {
        tipo : "Gato",
        nombre : "Manchas",
        duenio : "Dueño 1"
    },
    {
        tipo : "Perro",
        nombre : "Pepe",
        duenio : "Dueño 2"
    }
]

function listarMascotas(){
    let htmlMascotas = mascotas.map((mascota, index) => `<tr> 
        <th scope="row">${index}</th>
        <td>${mascota.tipo}</td>
        <td>${mascota.nombre}</td>
        <td>${mascota.duenio}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#staticBackdrop"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
      </tr>
      `
    ).join("");
    listaMascotas.innerHTML = htmlMascotas;

    // convertir HTML Collection en Array y recorrerlo para agregarle una función
    Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
}

function enviarDatos(e){
    e.preventDefault();
    const datos = {
        tipo : tipo.value,
        nombre : nombre.value,
        duenio : duenio.value
    };

    const accion = btnGuardar.innerHTML;
    switch(accion){
        case "Editar":
            // editar
            mascotas[indice.value] = datos;
            break;
        default:
            //crear
            mascotas.push(datos);
            break;
    }

    listarMascotas();
    resetModal();
}

function editar(index){
    return function cuandoHagoClick(){
        btnGuardar.innerHTML = "Editar"
        $("#staticBackdrop").modal("toggle");
       //console.log(mascotas[indice])
       const mascota = mascotas[index];
       nombre.value = mascota.nombre;
       duenio.value = mascota.duenio;
       tipo.value = mascota.tipo;
       indice.value = index;
   }
}

function resetModal(){
    nombre.value = "";
    duenio.value = "";
    tipo.value = "";
    indice.value = "";
    btnGuardar.innerHTML = "Crear";
}

function eliminar(index){
    return function clickEliminar(){
       mascotas = mascotas.filter((mascota, indiceMascota) => indiceMascota !== index);
       listarMascotas();
    }
}

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;