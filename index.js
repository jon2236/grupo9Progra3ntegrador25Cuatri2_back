import express from "express"; //importamos el framework express
const app = express();

import environments from "./src/api/config/environments.js"; // importamos las variables de entonro
const PORT = environments.port;

import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js"; 
import { productRoutes } from "./src/api/routes/index.js";
import {__dirname, join} from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";


//Middlewares//

    app.use(cors());
    app.use(express.json()); //parsear json y poder recivir datos en formato json
    app.use(loggerUrl);
    app.use(express.urlencoded({ extended: true })); //parsear formularios y poder recivir datos en formulario
    app.use('/uploads', express.static('./src/uploads')); //sirvo mis imagenes
    app.use(express.static(join(__dirname, "src/public")));


//Configs//

// configuramos EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));// nuestras archivos estaticos se serviran de la carpeta publics


//Rutas//

app.use("/api/productos", productRoutes )




app.get("/", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM productos");
        console.log(rows);

        res.render("index", {
            title: "Inicio",
            about: "Tienda Koopa troopa",
            productos: rows
        });

    } catch (error) {
        console.error(error)
    }
});


app.get("/consultar", (req, res) => {
    res.render("consultar", {
        title: "Consultar producto",
        about: "Consultar un producto por ID"
    });
})


app.get("/crear", (req,res) => {
    res.render("crear", {
        title: "Crear producto",
        about: "Crear un nuevo producto"
    })
})


app.get("/eliminar", (req,res) => {
    res.render("eliminar", {
        title: "Eliminar producto",
        about: "Eliminar un producto por ID"
    })
})


app.get("/modificar", (req, res) => {
    res.render("modificar", {
        title: "modificar producto",
        about: "Modificar un producto por ID"
    })
})




app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})