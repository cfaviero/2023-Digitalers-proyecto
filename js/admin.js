/*

 -title
 -descripcion
 - imagen
 -precio
 -fecha de creacion
 -categoria
 -id (automatico)

*/

//.1 Deberiamos obtener el body de mi elemento html tbody
//.2 Deberiamos por cada consola que tenga en mi array consolas deberia pintar un tr


//+ ESCUCHAR EL EVENTO
const formularioProductoHTML = document.getElementById("formularioProducto");
formularioProductoHTML.addEventListener('submit', (evt) => {
    evt.preventDefault(); //- preventDefault, detiene el recargo de la pagina, ya que al presionar "submit" por defecto pasa eso;

    const el = formularioProductoHTML.elements;
    //*const id = idEditar === undefined ? crypto.randomUUID() : idEditar;
    let id;
    //*Definimos si el producto lo estamos editando la propiedad id no la modificamos sin embargo si no estamos editando le genero un id con crypto;
    if (idEditar) {
        id = idEditar;
    } else {
        id = crypto.randomUUID();
    }

    const nuevoProducto = {
        id: crypto.randomUUID(),//-Agrega id autom.
        titulo: el.titulo.value,
        descripcion: el.descripcion.value,
        imagen: el.imagen.value,
        precio: el.precio.valueAsNumber,
        categoria: el.categoria.value,
        fechaDeCreacion: obtenerFecha()
    }

    if (idEditar) {
        //*Busco el indice del elemento que quiero editar
        const index = consolas.findIndex(consola => {
            return consola.id === idEditar;
        })
        //*Reemplazo el producto encontrado directamente en el array
        consolas[index] = nuevoProducto;
        //*Reseteo la variable editar
        idEditar = undefined;
        //*Vuelvo el boton a su estado normal
        btn.innerText = "Agregar Producto";
        btn.classList.remove("btn-success");
    } else {
        consolas.push(nuevoProducto);
    }

    Swal.fire({
        icon: "success",
        title: "Producto Agregado/modificado Correctamente.",
        text: "El producto se actualizo o modifico correctamente!",
        footer: '<a href="#">Why do I have this issue?</a>'
    });



    pintarProductos(consolas);

    localStorage.setItem("productos", JSON.stringify(consolas))

    formularioProductoHTML.reset();
    el.titulo.focus();
});

//+FUNCION FECHA ACTUAL
function obtenerFecha() {
    const fecha = new Date();
    let mes = fecha.getMonth() + 1; //- +1 porque el metodo trae un array del 0 al 11;
    if (mes < 10) {
        mes = "0" + mes;
    }
    const year = fecha.getFullYear();
    let dia = fecha.getDate();
    if (dia < 10) {
        dia = "0" + dia;
    }
    const fechaFormateada = `${year}-${mes}-${dia}`
    return fechaFormateada;

}


//+ARRAY DE CONSOLAS

let consolasPrimerInicio = [
    {
        id: 0o1,
        descripcion: 'Consola de hogar con gráficos en alta definición.',
        titulo: 'PlayStation 5',
        fechaDeCreacion: '2020-11-12',
        precio: 499.99,
        imagen: 'https://stylewatch.vtexassets.com/arquivos/ids/233580-800-800?v=638188815205330000&width=800&height=800&aspect=true',
        categoria: 'consolas'
    },
    {
        id: 0o2,
        descripcion: 'Consola portátil con pantalla táctil.',
        titulo: 'Nintendo Switch',
        fechaDeCreacion: '2017-03-03',
        precio: 299.99,
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_625423-MLA47920375564_102021-O.webp',
        categoria: 'juegos'
    },
    {
        id: 0o3,
        descripcion: 'Consola de hogar con alta potencia y compatibilidad hacia atrás.',
        titulo: 'Xbox Series X',
        fechaDeCreacion: '2020-11-10',
        precio: 499.99,
        imagen: 'https://assets.xboxservices.com/assets/fb/d2/fbd2cb56-5c25-414d-9f46-e6a164cdf5be.png?n=XBX_A-BuyBoxBGImage01-D.png',
        categoria: 'accesorios'
    }

];

let consolas = JSON.parse(localStorage.getItem("productos")) || consolasPrimerInicio;
console.log(consolas)


//!Si nunca hemos guardado en el localStorage un item productos lo creamos en este if
if (JSON.parse(localStorage.getItem("productos")) === null) {
    localStorage.setItem("productos", JSON.stringify(consolas));
}

let idEditar;
const btn = document.querySelector('button.btn[type="submit"]');
//+Pintamos productos al cargar nuestro script por primera vez
const tableBodyHTML = document.querySelector("#table-body");
pintarProductos(consolas);

//+FILTRAR
const inputFiltrarHTML = document.getElementById("filtrar");

inputFiltrarHTML.addEventListener('keyup', (evt) => {
    const busqueda = evt.target.value.toLowerCase();
    //console.log(evt.target.value)
    //! filter() crea un array
    //. Iterar cada producto
    const resultado = consolas.filter((producto) => {
        //. Vamos a mirar si la busqueda coincide con el titulo
        const titulo = producto.titulo.toLowerCase()
        if (titulo.includes(busqueda)) {
            return true;
        }
        return false;
    })
    /* -Filtro en una linea
    const resultado = consolas.filter( (producto) => producto.titulo.includes(busqueda) )*/
    //. Pinta el resultado de la busqueda
    pintarProductos(resultado);

    /* Genera una nueva propiedad al objeto - 34 - 1:40:0
        consolasCopia2 = consolas.map(producto => {
            producto.nuevaPropiedad = "Nueva Propiedad";
            return producto;
        })
    */
})


//+FUNCION PINTAR PRODUCTOS EN LA TABLA
function pintarProductos(arrayAPintar) {
    tableBodyHTML.innerHTML = "";

    arrayAPintar.forEach(function (conso, indice) {
        tableBodyHTML.innerHTML += `
        <tr>
        <th class="table-image">
        <img src="${conso.imagen}" alt="${conso.titulo}">
        </th>
        <td class="table-title">${conso.titulo}</td>
        <td class="table-descripcion">${conso.descripcion}</td>
        <td class="table-price">$${conso.precio}</td>
        <td class="table-category">${conso.categoria}</td>
        <td>
            <div class="d-flex gap-1">
            <button class="btn btn-danger btn-sm" onclick="borrarProducto(${conso.id})">
            <i class="fa-solid fa-trash"></i>
            </button>
            <button class="btn btn-success btn-sm" onClick="editarProducto(${conso.id})" data-bs-toggle="modal" data-bs-target="#formModal">
            <i class="fa-solid fa-pen-to-square"></i>
            </button>
            </div>
        </td>
        </tr>
        `;
    })
}

//+FUNCION BORRAR PRODUCTO
/*function borrarProducto(indiceRecibido) {

    consolas.splice(indiceRecibido, 1);
    console.log(consolas)
    pintarProductos();
}*/
const borrarProducto = (idABuscar) => {
    // consolas.splice(indice, 1);//-Elimina Indice
    // pintarProductos(consolas);

    //Obtiene indice del producto buscado por id
    /*const indiceEncontrado = consolas.findIndex((productoFindIndex) => {
        if(productoFindIndex.id === id) {
            return true
        }
        return false;})
    consolas.splice(indiceEncontrado, 1);

    pintarProductos(consolas)
    console.log(id);*/

    Swal.fire({
        title: "Desea borrar el producto",
        icon: "error",
        text: `Realmente desea eliminar el`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: `Borrar`,
        cancelButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {
            const indiceEncontrado = consolas.findIndex((productoFindIndex) => {
                if (productoFindIndex.id === idABuscar) {
                    return true;
                }
                return false;
            })
            consolas.splice(indiceEncontrado, 1);
            pintarProductos(consolas);

            localStorage.setItem("productos", JSON.stringify(consolas));

            Swal.fire('Borrado!', 'Producto borrado correctamente', 'success')
        }
    })
}
//-FUNCION RECOMENDADA PERO MAS COMPLEJA DE BORRAR ELEMENTOS
// function obtenerBotones() {
//     const deleteButtons = document.querySelectorAll("btn-delete");

//     deleteButtons.forEach((btn, index) => {
//         btn.addEventListener("click", () => {
//             borrarProducto(index);
//         })
//     })
//     obtenerBotones();
// }

//  const delButtons = document.querySelectorAll("[data-delete-id]");
//  delButtons.forEach(del => del.addEventListener("click", (event) => {
//     event.preventDefault()
//     console.dir(event.target)
//     const id = event.target.getAttribute("data-delete-id")
//     console.log(event.currentTarget.dataset.deleteId)
//  }))

//+Editar Producto

const editarProducto = function (idRecibido) {
    //console.log(`Editar elemento ${idRecibido}`);
    //. Cuando la persona clickea en el boton editar me manda un id
    //. Buscar el producto que posee dicho id

    //#Opcion 1
    /*const productoEditar = consolas.filter(prod => {
        if(idRecibido === prod.id) {
            return true;
        }
        return false;
    })*/
    //#Opcion 2
    //! findIndex() AL RECIBIR FALSE DEVUELVE -1
    //const prodIndex = consolas.findIndex(prod => {

    //    return prod.id === idRecibido;
    /* return prod.id === idRecibido;
       es igual que:      
           if(prod.id === idRecibido) {
               return true
           }
    */
    //})
    //console.log(productoEditar)
    //if(prodIndex < 0) return;
    //const productoEditar = consolas[prodIndex];
    //#Opcion3 - RECOMENDADA
    //! find() devuelve el objeto en si.
    const productoEditar = consolas.find(prod => {
        if (prod.id === idRecibido) {
            return true;
        }
    });
    //console.log(productoEditar);
    //* Resguardo si find no encontro nada
    if (!productoEditar) return;

    idEditar = productoEditar.id;
    // Deberiamos rellenar nuestro formulario con los datos del elemento a editar
    const elements = formularioProductoHTML.elements;

    elements.titulo.value = productoEditar.titulo;
    elements.precio.value = productoEditar.precio;
    elements.descripcion.value = productoEditar.descripcion;
    elements.imagen.value = productoEditar.imagen;
    elements.categoria.value = productoEditar.categoria;
    // Modificar el boton de agregar con uno de editar
    // Luego reemplazar el producto anterior con los datos nuevos

    //*Buscame algo que tenga la etiqueta BUTTON; que tenga la clase BTN y que tenga el atributo type="submit"

    btn.innerText = "Editar Producto";
    btn.classList.add("btn-success");






}

/*
,Duplicar array y evitar la misma referencia entre ambos
array1 = [1,2,3,4]

#Opcion1
array2 = array1.slice();

#Opcion2
array2 = array.from(array1)

#Opcion3
array2 = array1.map(elem => {
    return elem
})
array2 = array1.map(elem => elem)

#Opcion4
array2 = [ ...array1 ]

#Opcion5
- array2 = structuredClone(array1)
- El resto igual modifica a nivel cascara

#1 Opción objetos
const obj2 = { ...obj1 }
*/


/*

    
    {
        id: 0o4,
        descripcion: 'Consola clásica miniaturizada con juegos preinstalados.',
        titulo: 'NES Classic Edition',
        fechaDeCreacion: '2016-11-10',
        precio: 59.99,
        imagen: 'https://m.media-amazon.com/images/I/81s7B+Als-L._SL1500_.jpg',
        categoria: 'juegos'
    },
    {
        id: 0o5,
        descripcion: 'Consola clásica miniaturizada con juegos preinstalados.',
        titulo: 'asfaqsgqaewg',
        fechaDeCreacion: '2016-11-10',
        precio: 59.99,
        imagen: 'https://m.media-amazon.com/images/I/81s7B+Als-L._SL1500_.jpg',
        categoria: 'consolas'
    },
    {
        id: 0o6,
        descripcion: 'Consola clásica miniaturizada con juegos preinstalados.',
        titulo: '3236232ggsdg',
        fechaDeCreacion: '2016-11-10',
        precio: 59.99,
        imagen: 'https://m.media-amazon.com/images/I/81s7B+Als-L._SL1500_.jpg',
        categoria: 'Consola Retro'
    },
    {
        id: 0o7,
        descripcion: 'Consola clásica miniaturizada con juegos preinstalados.',
        titulo: 'fhnewbeb43',
        fechaDeCreacion: '2016-11-10',
        precio: 59.99,
        imagen: 'https://m.media-amazon.com/images/I/81s7B+Als-L._SL1500_.jpg',
        categoria: 'Consola Retro'
    }

*/