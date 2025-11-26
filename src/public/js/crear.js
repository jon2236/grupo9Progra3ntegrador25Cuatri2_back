const url = "http://localhost:3500";
let altaProducts_container = document.getElementById("altaProducts-container");
let cart = JSON.parse(localStorage.getItem("cart")) || []; //me traigo de mi main el contador de mi carrito
let cartCounter = document.getElementById("cart-counter-span");

altaProducts_container.addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log(event.target);
    //ahora guardo toda la info de mi formulario en un objeto nativo formdata
    let formData = new FormData(event.target); // el event.target lo hace, me devuelve el html de arriba: nombre imagen precio
    
    // transformo la info del obj formdata en un obj js
    let data = Object.fromEntries(formData.entries());

    /* Ahora ya le podemos meter en el cuerpo de la peticion HTTP Post, este objeto con los datos del formulario en JSON
            {
                "name":"faina",
                "image":"https://www.lanacion.com.ar/resizer/v2/fain-G5ZYOIATCNALHJPHQVNTPXRDOM.jpg",
                "price":"150",
                "category":"food"
            }
            */

    try {
        // En peticiones distintas a GET, tenemos que especificar mas informacion en un parametro de opciones
        let response = await fetch(`${url}/api/productos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            if(response.ok) {
                console.log(response);

                let result = await response.json();
                console.log(result.message);
                alert(result.message)
            }
        

    } catch(error) { //este catch solo captura errores de red
        console.error("error al enviar los datos: ", error);
        alert("Error al procesar la solicitud")
    }
})


function actualizarContadorCarrito() {
    cartCounter.textContent = `${cart.length} `;
}

actualizarContadorCarrito();