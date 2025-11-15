import connection from "../database/db.js";

const selectAllProducts = () => {
    const sql = `SELECT * FROM productos`;
    return connection.query(sql);
};

const selectProductFromId = (id) => {
    const sql = `SELECT * FROM productos WHERE id = ?`;
    return connection.query(sql, [id]);
};

const insertProduct = (nombre, imagen, categoria, precio) => {
    const sql = `INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?,?,?,?)`;
    return connection.query(sql, [nombre, imagen, categoria, precio]);
};

const updateProduct = (nombre, imagen, categoria, precio, id) => {
    const sql = `
        UPDATE productos
        set nombre = ?, categoria = ?, precio = ?, imagen = ?
        WHERE id = ?
     `;

    return connection.query(sql, [nombre, categoria, precio, imagen, id]);
}

const deleteProduct = (id) => {
    const sql = `DELETE FROM productos WHERE id = ?`
    return connection.query(sql, [id]);
}

export default {
    selectAllProducts,
    selectProductFromId,
    insertProduct,
    updateProduct,
    deleteProduct
}