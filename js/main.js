//array de productos
const frutas = [
  { id: 1, nombre: "arandano", precio: 6000, ruta_img: "img/arandano.jpg" },
  { id: 2, nombre: "banana", precio: 1200, ruta_img: "img/banana.jpg" },
  { id: 3, nombre: "frambuesa", precio: 2000, ruta_img: "img/frambuesa.png" },
  { id: 4, nombre: "frutilla", precio: 2000, ruta_img: "img/frutilla.jpg" },
  { id: 5, nombre: "kiwi", precio: 700, ruta_img: "img/kiwi.jpg" },
  { id: 6, nombre: "mandarina", precio: 800, ruta_img: "img/mandarina.jpg" },
  { id: 7, nombre: "manzana", precio: 1000, ruta_img: "img/manzana.jpg" },
  { id: 8, nombre: "naranja", precio: 1500, ruta_img: "img/naranja.jpg" },
  { id: 9, nombre: "pera", precio: 2500, ruta_img: "img/pera.jpg" },
  { id: 10, nombre: "anana", precio: 4000, ruta_img: "img/anana.jpg" },
  { id: 11, nombre: "pomelo-amarillo", precio: 5000, ruta_img: "img/pomelo-amarillo.jpg" },
  { id: 12, nombre: "pomelo-rojo", precio: 3000, ruta_img: "img/pomelo-rojo.jpg" },
  { id: 13, nombre: "sandia", precio: 3500, ruta_img: "img/sandia.jpg" }
];

//objeto alumno
const alumno = {
    nombre: "Juan",
    apellido: "Galante",
    dni: 35943311
}

//variables
let nombreNav = document.getElementById("nombreNav");
let contenedorFrutas = document.getElementById("contenedorFrutas");
let barraBusqueda = document.getElementById("barraBusqueda");
let contenedorCarrito = document.getElementById("contenedorCarrito");
let productosNav = document.getElementById("productosNav")
let contadorProductos = 0;
let carrito = [];


/*la funcion imprimirDatosAlumnos usa la variable nombreNav donde se apunta al id nombreNav del html
concateno en la variable el nombre y apellido usando los atributos del objeto y
uso innerHTML para imprimir en el html el nombre y apellido, console.log para imprimir en consola*/
function imprimirDatosAlumnos(){

    let nombreAlumno = `${alumno.nombre}  ${alumno.apellido}`
    nombreNav.innerHTML = nombreAlumno;
    console.log(alumno.nombre,  alumno.apellido)

}

//funcion que llama a los metodos que van a iniciar la pagina, cargando las frutas e imprimiendo el nombre 
function init(){
    
    mostrarFrutas(frutas);
    imprimirDatosAlumnos();

}


/*la funcion mostrarFrutas recibe como parametro un array que es el array de frutas
se recorre con un forEach (se podria hacer con un for comun usando array.length)
pero como siempre se va a recorrer el array completo es mas eficiente y comodo usar forEach.
fruta es cada elemento del array y se guarda cada div en la variable cartaFruta
luego se imprime en el html con innerHTML que apunta con la variable contenedorFrutas al contenedorFrutas del html*/ 
function mostrarFrutas(array) {
  let cartaFruta = "";
  array.forEach((fruta) => {
    cartaFruta += `
            <div class="card-producto">
                <img src="${fruta.ruta_img}" alt="${fruta.nombre}" />
                <h3>${fruta.nombre}</h3>
                <p>$ ${fruta.precio}</p>
                <button onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
            </div> `;
  });
  contenedorFrutas.innerHTML = cartaFruta;
}


/*la funcion filtrar frutas crea un nuevo array con los productos filtrados.
 la variable valorBusqueda guarda lo que el usuario escribe en el imput.
 lugue en la variable frutasFiltradas se le hace un filter a frutas para ver si 
 lo que esta en el imput esta en el array de frutas, generando un nuevo array con las coincidencias.
 se llama a mostrarFrutas pasandole el nuevo array filtrado
*/
function filtrarFrutas(){
    let valorBusqueda = barraBusqueda.value;

    let frutasFiltradas = frutas.filter(f => f.nombre.includes(valorBusqueda));

    mostrarFrutas(frutasFiltradas);
}

//addEventListener escucha lo que se va tecleando en el input disparando el evento keyup
//y se llama a la funcion filtrar frutas cada vez
barraBusqueda.addEventListener("keyup", () => {
    filtrarFrutas();
});

/*la funcion agregarACarrito recibe como parametro el id de la fruta
en la variable frutaSeleccionada se usa find para buscar la coincidendia con el id del array de frutas
luego se pushea a carrito la fruta seleccionada, se muestra el carrito por consola y se llama a la funcion mostrarCarrito
esta funcion se usa en la funcion mostrar frutas, en el boton agregar al carrito de la cartaFruta usando el evento onclick, cuando se dispara ese evento
se llama a esta funcion */
function agregarACarrito(id){

    let frutaSeleccionada = frutas.find(f => f.id === id);

    carrito.push(frutaSeleccionada);

    console.log(carrito);

    mostrarCarrito();
}

/*Se genera una lista en la variable cartaCarrito, se recorre el carrito con un forEach
y por cada fruta del carrito se genera el html. se usa un segundo parametro en el forEach para cuando se necesite eliminar la fruta(se pasa el indice a la funcion eliminarProducto)
hay un if que hace que solo se muestre el boton vaciar carrito cuando hay al menos un producto en el carrito
la variable precioCarrito va almancenando la suma de los precios de los productos que estan en el carrito
se llama a la funcion contarProductos que lleva la cuenta de los productos que hay en el carrito, los innerHTML imprimen todo en el HTML 
*/
function mostrarCarrito(){

    let precioCarrito = 0;

    let cartaCarrito = "<ul>";
    carrito.forEach((fruta, indice) => {
        cartaCarrito +=
        `<li class="bloque-item">
            <p class="nombre-item">${fruta.nombre} - $ ${fruta.precio}</p>
            <button class="boton-eliminar" onclick="eliminarProducto(${indice})">Eliminar</button>
        </li>`
        precioCarrito += fruta.precio;
    });

    if(carrito.length > 0){
        cartaCarrito += "</ul><button onclick='vaciarCarrito()'> Vaciar carrito </button>";
    }
    contarProductos();

    console.log(contadorProductos);
    productosNav.innerHTML = `Carrito: ${contadorProductos} Productos`;

    contenedorCarrito.innerHTML = cartaCarrito;
    contenedorCarrito.innerHTML += precioCarrito;

    console.log(cartaCarrito);

}

/*eliminarFruta recibe como parametro el indice de la fruta a eliminar y usa la funcion splice donde se le pasa el indice y el numero de frutas a eliminar
luego se muestra el carrito actualizado llamando a la funcion mostrarCarrito */
function eliminarProducto(indice){

    carrito.splice(indice, 1);
    mostrarCarrito();
    
}

//la funcion contarProductos le asigna a la variable contadorProductos el largo del array carrito
//se llama en la funcion mostrarCarrito
function contarProductos(){
    contadorProductos = carrito.length;
}

/*
no llegue a hacerlo, habia dejado este comentrio para hacerlo al final
getElementById("boton-ordenar-alf").addEventListener("click", ordenarPorNombre);
getElementById("boton-ordenar-nombre").addEventListener("click", ordenarPorPrecio);
*/

//la funcion vaciarCarrito vuelve el array de carrito a sin elementos
function vaciarCarrito(){
    carrito = [];

    contenedorCarrito.innerHTML = "";
}

init();
