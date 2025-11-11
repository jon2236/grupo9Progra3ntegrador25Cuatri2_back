import express from "express"; //importamos el framework express
const app = express();

import environments from "./src/api/config/environments.js"; // importamos las variables de entonro
const PORT = environments.port;

import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js"; 
import { productRoutes } from "./src/api/routes/index.js";


//Middlewares//

    app.use(cors());
    app.use(express.json()); //parsear json y poder recivir datos en formato json
    app.use(loggerUrl);
    app.use(express.urlencoded({ extended: true })); //parsear formularios y poder recivir datos en formulario
    app.use('/uploads', express.static('./src/uploads')); //sirvo mis imagenes


    //RUTAS//

app.use("/api/productos", productRoutes )



app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})