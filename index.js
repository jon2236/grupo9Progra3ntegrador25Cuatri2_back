import express from "express";
const app = express();

import environments from "./src/api/config/environments.js"; // importamos las variables de entonro
const PORT = environments.port;

import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js"; 
import { productRoutes } from "./src/api/routes/index.js";


//Middlewares//

<<<<<<< HEAD
middlewares(app);

//ENDPOINT//

app.get("/productos", async (req, res) => {
    try {
        const sql = `SELECT * FROM productos`;
        /*
        const resultado = await connection.query(sql);
        console.log(resultado)
        */

        const [rows] = await connection.query(sql);
        console.log(rows);

        res.status(200).json({
            payload: rows,
            message: rows.length === 0? "no se encontraron productos" : "productos encontrados"
        })

    } catch(error) {
        console.error(error);

        res.status(500).json({
            message:"Error interno del servidor al obtener los productos"
        })
    }
});
=======
    app.use(cors());
    app.use(express.json()); //parsear json y poder recivir datos en formato json
    app.use(loggerUrl);
    app.use(express.urlencoded({ extended: true })); //parsear formularios y poder recivir datos en formulario
    app.use('/uploads', express.static('./src/uploads')); //sirvo mis imagenes
>>>>>>> 2d12dbcb80880b4ebdc288e546680649b15a9ec9


    //RUTAS//

app.use("/api/productos", productRoutes )

<<<<<<< HEAD
        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.error("Error obteniendo producto ID". error, message);

        res.status(500).json({
            message:"Error interno del servidor al obtener producto por ID"
        })
    }
})


app.post("/productos", async (req, res) => {
    try {
        const { nombre, imagen, categoria, precio} = req.body;
        // Aca imprimimos lo que enviamos desde el form que previamente se parseo gracias al middleware -> express.json()
        console.log(req.body);

        // Los placeholders ?, evitan inyecciones SQL para evitar ataques de este tipo
        let sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?,?,?,?)";

        //le envio estos valores a la DB
        let [rows] = await connection.query(sql, [nombre, imagen, categoria, precio]);

        //devuelvo una respuesta 201 "created"
        res.status(201).json({
            message: "producto encontrado con exito"
        });

    } catch(error) {
        console.error("error interno del servidor",error);

        res.status(500).json({
            message:"error interno del servidor al crear un producto",
            error: error.message
        })
    }
});


app.put("/productos", async (req, res) => {
    try {
        let {id, nombre, categoria, precio, imagen} = req.body;
        
        let sql = `
        UPDATE productos
        set nombre = ?, categoria = ?, precio = ?, imagen = ?
        WHERE id = ?
        `;
        
        let [result] = await connection.query(sql, [nombre, categoria, precio, imagen]);
        console.log(result);

        res.status(200).json({
            message: "Producto actualizo correctamente"
        });

    } catch (error) {
        console.error("error al actualizar el producto", error);

        res.status(500).json({
            message: "error al actualizar el producto",
            error: error.message
        })
    }
})
=======
>>>>>>> 2d12dbcb80880b4ebdc288e546680649b15a9ec9


app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})
