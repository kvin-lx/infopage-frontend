let listaElemento = []; // arreglo de objetos

// objeto plantilla que se va a agregar al arreglo
const objetoElemento = {
    id: '',
    nombre: '',
    puesto: ''
}

// variable para saber si se esta editando o no
let editando = false;

// seleccionar elementos del HTML
const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const botonAgregarInput = document.querySelector('#botonAgregar');

// agregar evento al boton agregar "Add"
formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault(); // para que no se recargue la pagina

    // validar que los campos no esten vacios
    // si estan vacios se muestra una alerta
    if(nombreInput.value === '' || puestoInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    // si se esta editando se llama a la funcion editar
    if(editando) {
        editarElemento();
        editando = false;
        // si no se esta editando se llama a la funcion agregar
    } else {
        objetoElemento.id = Date.now();
        objetoElemento.nombre = nombreInput.value;
        objetoElemento.puesto = puestoInput.value;
        agregarElemento();
    }
}

function agregarElemento() {
    // se agrega el objeto al arreglo
    listaElemento.push({...objetoElemento}); 

    mostrarElemento();

    // se limpia el formulario
    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objetoElemento.id = '';
    objetoElemento.nombre = '';
    objetoElemento.puesto = '';
}

function mostrarElemento() {
    // se limpia el HTML
    limpiarHTML();

    // se selecciona el elemento donde se va a mostrar la lista
    const divElementos = document.querySelector('.div-lista');
    
    // forEach recorre el arreglo y crea un elemento por cada objeto
    listaElemento.forEach(elemento => {
        // se desestructura el objeto para obtener los datos
        const {id, nombre, puesto} = elemento;

        const parrafo = document.createElement('p'); // se crea el elemento
        parrafo.textContent = `${id} - ${nombre} - ${puesto} - `; // se le agrega el contenido
        parrafo.dataset.id = id; // se le agrega el id al elemento para poder eliminarlo

        const editarBoton = document.createElement('button'); // se crea el boton para editar
        editarBoton.onclick = () => cargarElemento(elemento); // se le agrega la funcion al boton
        editarBoton.textContent = 'Edit'; // se le agrega el texto al boton
        editarBoton.classList.add('boton', 'boton-editar'); // se le agrega las clases al boton
        parrafo.append(editarBoton); // se agrega el boton al elemento

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarElemento(id);
        eliminarBoton.textContent = 'Remove';
        eliminarBoton.classList.add('boton', 'boton-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr'); // se crea la linea

        divElementos.appendChild(parrafo); 
        divElementos.appendChild(hr);
    });
}

function cargarElemento(elemento) {
    // se cargan los datos del elemento al formulario
    // se desestructura el objeto para obtener los datos
    const {id, nombre, puesto} = elemento;

    // se cargan los datos al formulario
    nombreInput.value = nombre;
    puestoInput.value = puesto;
    
    // se cargan los datos al objeto
    objetoElemento.id = id;

    // se cambia el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Update';
    
    // se cambia el valor de la variable editando
    editando = true;
}

function editarElemento() {

    objetoElemento.nombre = nombreInput.value;
    objetoElemento.puesto = puestoInput.value;

    // se recorre el arreglo y se cambia el objeto
    listaElemento.map(elemento => {

        // si el id del objeto es igual al id del elemento se cambia el objeto
        if(elemento.id === objetoElemento.id) {
            elemento.id = objetoElemento.id;
            elemento.nombre = objetoElemento.nombre;
            elemento.puesto = objetoElemento.puesto;

        }

    });

    limpiarHTML();
    mostrarElemento();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Add';
    
    editando = false;
}

function eliminarElemento(id) {

    // se filtra el arreglo y se crea uno nuevo sin el elemento que se quiere eliminar
    listaElemento = listaElemento.filter(elemento => elemento.id !== id);

    limpiarHTML();
    mostrarElemento();
}

function limpiarHTML() {
    const divElementos = document.querySelector('.div-lista'); // se selecciona el elemento
    while(divElementos.firstChild) { // se recorre el elemento
        divElementos.removeChild(divElementos.firstChild); // se elimina el elemento
    }
}
