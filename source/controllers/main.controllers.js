const { index } = require("../models/products.models");

module.exports = {
    home: (req, res) => {

        let products = index().filter(product => product.descuento > 0);

        return res.render("home", {
            title: "Zaphir",
            styles: ["home-mobile", "home-tablets", "home-desktop"],
            products: products

        })
    }
}
