import productModel from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        // Optimizacion 1: Seleccionar solamente los campos necesarios -> name, image, category, price porque es la unica informacion que necesita ver el cliente
        const [rows] = await productModel.selectAllProducts();

        res.status(200).json({
            payload: rows,
            message: rows.length === 0? "no se encontraron productos" : "productos encontrados"
        });

    } catch(error) {
        // Este console.log muestra en la consola del servidor
        console.error("Error al obtener productos", error);

        // Esta es la respuesta que le devolvemos al cliente, para verla como JSON
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}


export const getProductById = async (req, res) => {
    try {
        let { id } = req.params; // esto me permite obtener el valor numerico despues de productos/productos/2

        //optimizacion 1: validacion de parametros antes de acceder a la db si el id no es valido
        //esta logica luego la hara un middleware validateID

        const [rows] = await productModel.selectProductFromId(id);

        //hacemos la consulta, y tenemos el resultado en la variable rows
        //optimizacion 2: 
        if(rows.length ===0) {
            console.log("error, no existe producto con ese id");

            return res.status(404).json({
                message:`no se encontro producto con id ${id}`
            });

        }

        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.error("Error obteniendo producto ID". error, message);

        res.status(500).json({
            message:"Error"
        })
    }
}


export const createProduct = async (req, res) => {
    try {
        const { nombre, imagen, categoria, precio} = req.body;
        // Aca imprimimos lo que enviamos desde el form que previamente se parseo gracias al middleware -> express.json()
        console.log(req.body);

        //optimizacion 1 validacion de entrada
        if(!nombre || !imagen || !categoria || !precio) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
        }
        
        // cambie rows por result para obtener el insertId (rows no se usaba para nada)
        const [result] = await productModel.insertProduct(nombre, imagen, categoria, precio);

        //devuelvo una respuesta 201 "created"
        res.status(201).json({
            message: "producto creado con exito",
            id: result.insertId
        });

    } catch(error) {
        console.error("error interno del servidor",error);

        res.status(500).json({
            message:"error interno del servidor",
            error: error.message
        })
    }
}


export const modifyProduct = async (req, res) => {
    try {
        let {id, nombre, categoria, precio, imagen, activo} = req.body;

        // Optimizacion 1: Validacion basica de datos
        if(!id || !nombre || !categoria || !precio || !activo) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }
        
        let [result] = await productModel.updateProduct(nombre, categoria, precio, imagen, id);
        console.log(result);

        // Optimizacion 2: Testeamos que se actualizara este producto
        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se actualizo el producto"
            });
        }

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.error("error al actualizar el producto", error);

        res.status(500).json({
            message: "error al actualizar el producto",
            error: error.message
        })
    }
}


export const removeProduct = async (req,res) => {
    try {
        let { id } = req.params;

        //aca puedo hacer un borrado normal
        // let sql = "DELETE FROM productos WHERE id = ?";

        //o puedo hacer una baja logica
        //let sql2 = "UPDATE products set active = 0 WHERE id = ?";
        let [result] = await productModel.deleteProduct(id);;
        console.log(result);
        // affectedRows: 1 -> Nos indica que hubo una fila que fue afectada

        // Optimizacion 1 -> Ya hacemos la validacion del Id a traves del middleware

        // Optimizacion 2 -> Comprobar si realmente eliminamos un producto
        if(result.affectedRows === 0) { // Quiere decir que no afectamos ninguna fila
            return res.status(404).json({
                message: `No se encontro un producto con id ${id}`
            });
        }

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });


    } catch(error){
        console.log(`Error al eliminar producto con id ${id}: `, error);

        res.status(500).json({
            message: `Error al eliminar un producto con id ${id}`,
            error: error.message
        })
    }
}