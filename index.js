import express from "express"; //importamos el framework express
const app = express();

import environments from "./src/api/config/environments.js"; // importamos las variables de entonro
const PORT = environments.port;
const session_key = environments.session_key;

import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js"; 
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import {__dirname, join} from "./src/api/utils/index.js";
import session from "express-session";

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


//middleware de sesion

app.use(session({
    secret: session_key, //aca firmo las cookies para evitar manipulacion
    resave: false, //aca evito guardar la session si no hubo cambios
    saveUninitialized: true // no guarde sesiones vacias
}));


//Rutas//

app.use("/api/productos", productRoutes )

app.use("/", viewRoutes);


app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})