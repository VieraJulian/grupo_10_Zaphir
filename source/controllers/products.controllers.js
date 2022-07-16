const { index, create, write } = require("../models/products.models")

module.exports = {
    create: (req, res) => {
        res.render("products/create", {
            title: "Nuevo producto",
            styles: ["products/create-mobile"],
        })
    },

    save: (req, res) => {
        req.body.imagen = req.files.filename;
        let products = index();
        let newProduct = create(req.body);
        products.push(newProduct);
        write(products)
        res.redirect("/productos")
    },

    edit: (req, res) => res.render("products/edit", {
        title: "Editar producto",
        styles: ["products/edit-mobile"]
    }),

    carrito: (req, res) => res.render("products/carrito", {
        title: "Carrito de compras",
        styles: ["products/carrito-mobile", "products/carrito-tablets", "products/carrito-desktop"]
    }),

    detalle: (req, res) => res.render("products/detalle", {
        title: "Detalle de producto",
        styles: ["products/detalle-mobile", "products/detalle-tablets", "products/detalle-desktop"]
    }),

    productos: (req, res) => res.render("products/productos", {
        title: "Zaphir",
        styles: ["products/productos-mobile", "products/productos-tablets", "products/productos-desktop"]  
    })
}