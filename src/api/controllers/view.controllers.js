import productModel from "../models/product.model.js";


export const productsView = async (req, res) => {
    try {
        const [rows] = await productModel.selectAllProducts();

        res.render("index", {
            title: "Inicio",
            about: "Tienda Koopa troopa",
            productos: rows
        });

    } catch (error) {
        console.error(error)
    }
}