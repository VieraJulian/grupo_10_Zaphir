const { index } = require("../models/products.models");
const { product } = require("../database/models/index")

module.exports = {
    home: (req, res) => {

        let products = index().filter(product => product.descuento);

        return res.render("home", {
            title: "Zaphir",
            styles: ["home-mobile", "home-tablets", "home-desktop"],
            products: products,
        })
    }
}