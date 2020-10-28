const listaVeterinarios = document.getElementById("lista-veterinarios");
const identificador = document.getElementById("identificador");
const pais = document.getElementById("pais");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const indice = document.getElementById("indice");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");

let veterinarios = [
    {
        identificador : "1",
        pais : "Argentina",
        nombre : "Diego",
        apellido : "Perez"
    }
]

function listarVeterinarios(){
    let htmlVeterinarios = veterinarios.map((veterinario, index) => `<tr> 
        <th scope="row">${index}</th>
        <td>${veterinario.identificador}</td>
        <td>${veterinario.pais}</td>
        <td>${veterinario.nombre}</td>
        <td>${veterinario.apellido}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#staticBackdrop"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
      </tr>
      `
    ).join("");
    listaVeterinarios.innerHTML = htmlVeterinarios;

    // convertir HTML Collection en Array y recorrerlo para agregarle una función
    Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
}

function enviarDatos(e){
    e.preventDefault();
    const datos = {
        identificador : identificador.value,
        pais : pais.value,
        nombre : nombre.value,
        apellido : apellido.value
    };

    const accion = btnGuardar.innerHTML;
    switch(accion){
        case "Editar":
            // editar
            veterinarios[indice.value] = datos;
            break;
        default:
            //crear
            veterinarios.push(datos);
            break;
    }

    listarVeterinarios();
    resetModal();
}

function editar(index){
    return function cuandoHagoClick(){
        btnGuardar.innerHTML = "Editar"
        $("#staticBackdrop").modal("toggle");
       //console.log(veterinarios[indice])
       const veterinario = veterinarios[index];
       nombre.value = veterinario.nombre;
       apellido.value = veterinario.apellido;
       pais.value = veterinario.pais;
       identificador.value = veterinario.identificador;
       indice.value = index;
   }
}

function resetModal(){
    nombre.value = "";
    apellido.value = "";
    pais.value = "";
    identificador.value = "";
    indice.value = "";
    btnGuardar.innerHTML = "Crear";
}

function eliminar(index){
    return function clickEliminar(){
       veterinarios = veterinarios.filter((veterinario, indiceVeterinario) => indiceVeterinario !== index);
       listarVeterinarios();
    }
}

listarVeterinarios();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;