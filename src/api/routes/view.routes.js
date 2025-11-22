import { Router } from "express";
import { productsView } from "../controllers/view.controllers.js";
const router = Router();

router.get("/", productsView);


router.get("/consultar", (req, res) => {
    res.render("consultar", {
        title: "Consultar producto",
        about: "Consultar un producto por ID"
    });
})


router.get("/crear", (req,res) => {
    res.render("crear", {
        title: "Crear producto",
        about: "Crear un nuevo producto"
    })
})


router.get("/eliminar", (req,res) => {
    res.render("eliminar", {
        title: "Eliminar producto",
        about: "Eliminar un producto por ID"
    })
})


router.get("/modificar", (req, res) => {
    res.render("modificar", {
        title: "modificar producto",
        about: "Modificar un producto por ID"
    })
});

export default router;