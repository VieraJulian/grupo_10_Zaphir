const { index } = require("../models/products.models");

module.exports = {
    home: (req, res) => {
        let products = index();

        if (req.query && req.query.name) {

            products = products.filter(products => products.nombre.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1 || products.categoria.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1);

            return res.render("products/productos", {
                title: "Zaphir",
                styles: ["products/productos-mobile", "products/productos-tablets", "products/productos-desktop"],
                products: products
            })
        }

        return res.render("home", {
            title: "Zaphir",
            styles: ["home-mobile", "home-tablets", "home-desktop"],
            products: products

        })
    }
}
