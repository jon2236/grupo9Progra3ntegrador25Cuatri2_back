import { Router } from "express"; //importamos e inicializamos el middleware Router
const router = Router();


import { validateId } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/products.controllers.js";



router.get("/", getAllProducts);

router.get("/:id", validateId, getProductById);

router.post("/", createProduct);

router.put("/", modifyProduct);

router.delete("/:id", removeProduct);


//aca exportamos todas las rutas
export default router;
