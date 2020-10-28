const listaDuenios = document.getElementById("lista-duenios");
const identificador = document.getElementById("identificador");
const pais = document.getElementById("pais");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const indice = document.getElementById("indice");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");

let duenios = [
    {
        identificador : "15",
        pais : "Argentina",
        nombre : "Ana",
        apellido : "Perez"
    }
]

function listarDuenios(){
    let htmlDuenios = duenios.map((duenio, index) => `<tr> 
        <th scope="row">${index}</th>
        <td>${duenio.identificador}</td>
        <td>${duenio.pais}</td>
        <td>${duenio.nombre}</td>
        <td>${duenio.apellido}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#staticBackdrop"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
      </tr>
      `
    ).join("");
    listaDuenios.innerHTML = htmlDuenios;

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
            duenios[indice.value] = datos;
            break;
        default:
            //crear
            duenios.push(datos);
            break;
    }

    listarDuenios();
    resetModal();
}

function editar(index){
    return function cuandoHagoClick(){
        btnGuardar.innerHTML = "Editar"
        $("#staticBackdrop").modal("toggle");
       //console.log(duenios[indice])
       const duenio = duenios[index];
       nombre.value = duenio.nombre;
       apellido.value = duenio.apellido;
       pais.value = duenio.pais;
       identificador.value = duenio.identificador;
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
        duenios = duenios.filter((duenio, indiceDuenio) => indiceDuenio !== index);
       listarDuenios();
    }
}

listarDuenios();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;