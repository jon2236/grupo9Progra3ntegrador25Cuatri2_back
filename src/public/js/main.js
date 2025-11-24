let url = "http://localhost:3500";


//ejercicio 2. imprimir datos de obj alumno y mostrarlo por consola y html. 

// const alumno = {dni: 22222222, nombre: "jonatan", apellido: "quiroga"}
// // mi elemnto html (<span>) donde se inyectaran los datos del alumno. guardo mi obj en una variable para una facil manipulacion(como voy a hacer con muchas cosas en el codigo)
// const userInfo = document.getElementById("user-info-span") 

// function imprimirDatosAlumno() { 
//     userInfo.textContent = `${alumno.nombre} ${alumno.apellido}`
// }



//funcion de filtro con input//

let todosLosProductos = [];
const filterInput = document.getElementById("searchInput")
const productList = document.getElementById("product-list");


async function obtenerProductos() {
    try {
        let response = await fetch(`${url}/api/productos`);
        let data = await response.json();

        todosLosProductos = data.payload
        console.log("Productos guardados: ",todosLosProductos);

        mostrarProductos(todosLosProductos);
    } catch (error) {
        console.error("ocurrio un error: ", error);
    }
}


filterInput.addEventListener("input", () => {
    const text = filterInput.value.toLowerCase();
    const filteredList = todosLosProductos.filter(producto => producto.nombre.toLowerCase().includes(text));  // filtro el array para incluir solo aquellas cuyo nombre contiene el texto buscado.
    mostrarProductos(filteredList) // aca renderizo mi array filtrado
})


function mostrarProductos(array) {
    let htmlProductos = "";

    array.forEach(prod => {
        htmlProductos += `
            <div class="card-products">
                <img class="producto-img-index" src="${url}/uploads/${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p> id: ${prod.id}</p>
                <p>${prod.precio}</p>
                <button onclick="addToCart(${prod.id})">agregar al carrito</button>
            </div>
        `;
    });

    productList.innerHTML = htmlProductos;
}




// cart section


const cartItems = document.getElementById("cart-items");
let cart = JSON.parse(localStorage.getItem("cart")) || []; // ejercicio 6. parseao a json para q lo pueda leer sino no lo puedo usar. de texto plano a jason
let cartCounter = document.getElementById("cart-counter-span");// ejercicio 7. contador de productos en mi carrito
console.log("cartCounter:", cartCounter);
const totalGasto = document.getElementById("total");

function addToCart(id) { // con esta funcion agrego un producto al carrito, actualizo el total y renderizo la lista
    const producto = todosLosProductos.find(prod => prod.id === id); // con el metodo find recorro el array usando el id
    cart.push(producto); // lo q encuentro lo agrego con push
    mostrarCarrito(); // aca muestro mi carrito ya actualizado
    localStorage.setItem("cart", JSON.stringify(cart));// aca parseo mi array de obj a texto plano para q local storage lo guarde. el objetivo es q los datos persistan entre refrescos de pagina
}



function mostrarCarrito() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item,index) => {
        const precioNum = Number(item.precio) || 0;
        total += precioNum;

        cartItems.innerHTML += 
        `<li class="bloque-item">
            <p class="nombre-item">${item.nombre} - ${precioNum}</p>
            <button class="boton-eliminar" onclick="removeSingleItem(${index})">Eliminar</button>
        </li>`;
        console.log(item.nombre);
    })

    mostrarTotal(total);
    actualizarContadorCarrito();
}



function mostrarTotal(total) {
    totalGasto.textContent = `Total: $${total.toFixed(2)}`; // aca asigno el valor de la variable total al contenido del elemento html
}



function actualizarContadorCarrito() {
    cartCounter.textContent = `${cart.length} `;
}



function removeSingleItem(index) {
    cart.splice(index,1)
    mostrarCarrito()
    localStorage.setItem("cart", JSON.stringify(cart))
}



function resetCart() { // reseteo mi carrito, utilizando el metodo removeItem de localstorage.
    cart = []
    localStorage.removeItem("total")
    localStorage.removeItem("cart")
    mostrarCarrito();   //llamo a mis funciones para q renderizen el estado actual de las variables
}

const resetButton = document.getElementById("reset-cart");
resetButton.addEventListener("click", resetCart);



function init() {
    // imprimirDatosAlumno()
    obtenerProductos(); //cargo desde mi backend
    mostrarCarrito();
}

init()