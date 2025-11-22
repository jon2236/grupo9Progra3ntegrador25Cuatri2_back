let listaProductos = document.getElementById("lista-productos");
let getProductForm = document.getElementById("getProduct-form");
let url = "http://localhost:3500";
let updateFormContainer = document.getElementById("updateFormContainer");

getProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    //primero obtengo los datos del formulario con un obj formdata
    let formData = new FormData(event.target)
    console.log(formData); // FormData { idProd → "2" }

    //ahora transformo a obj js los valores del formdata
    let data = Object.fromEntries(formData.entries());
    console.log(data); // Object { idProd: '2' }

    // y ahora me queda guardar en una variable el valor del campo del fomulario
    let idProd = data.idProd
    console.log(idProd);

    console.log(`Realizando una peticion GET a la url ${url}/api/productos/${idProd}`);

    //envio en una peticion GET el id pegado a la url
    let response = await fetch(`${url}/api/productos/${idProd}`);

    let datos = await response.json();
    console.log(datos)

    //extraigo de la respuiesta payload, el 1er resultado q contiene el obj q consulto
    let producto = datos.payload[0];
    console.log(producto)

    let htmlProducto = `
        <li class="li-producto">
                <img class="producto-img" src="${url}/uploads/${producto.imagen}" alt="${producto.nombre}">
                <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: ${producto.precio}</strong></p>
        </li>
        <li class="li-botonera">
            <input type="button" id="updateProduct_button" value="Actualizar producto" class="btn-form">
        </li>
    `;

    listaProductos.innerHTML = htmlProducto;

    let updateProduct_button = document.getElementById("updateProduct_button");

    updateProduct_button.addEventListener("click", event => {
        event.stopImmediatePropagation();
        crearFormulario(producto)
    })
});


async function crearFormulario(producto) {
    console.table(producto);

    let updateFormHTML = `
        <form id="updateProducts_form">

            <input type="hidden" name="id" id="idProd" value="${producto.id}">

            <label for="nameProd">Nombre</label>
            <input type="text" name="nombre" id="nameProd" value="${producto.nombre}" required>

            <label for="imageProd">Imagen</label>
            <input type="text" name="imagen" id="imageProd" value="${producto.imagen}" required>

            <label for="priceProd">Precio</label>
            <input type="number" name="precio" id="priceProd" value="${producto.precio}" required>

            <label for="categoryProd">Categoria</label>
            <select name="categoria" id="categoryProd" required>
                <option value="PlayStation">play</option>
                <option value="Xbox">xbox</option>
                <option value="Nintendo">nint</option>
            </select>

            <input type="hidden" name="activo" id="activeProd" value="${producto.activo}">

            <input type="submit" value="Actualizar producto">
        </form>
    `;

    updateFormContainer.innerHTML = updateFormHTML;

    let updateProducts_form = document.getElementById("updateProducts_form")

    updateProducts_form.addEventListener("submit", event => {
        actualizarProducto(event);
    });
}


async function actualizarProducto(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log("Preparando datos del formulario para el PUT");

    let formData = new FormData(event.target); // Le pasamos el formulario dinamico de antes al objeto FormData para obtener los datos del nuevo formulario de actualizacion

    let data = Object.fromEntries(formData.entries());
    console.log(data); // Ya tenemos como objetos JS los datos de nuestro formulario anterior con las nuevas modificaciones

    try {
        let response = await fetch(`${url}/api/productos`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        console.log(result);

        if(response.ok) {
            console.log(result.message);
            alert(result.message);
        } else {
            // TO DO
            console.log(result.message);
            alert(result.message);
        }

    } catch (error) {

    }
    
}