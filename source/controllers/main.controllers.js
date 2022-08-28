const { index } = require("../models/products.models");
const { product } = require("../database/models/index")

module.exports = {
    home: async (req, res) => {

        let products = await product.findAll()

        return res.render("home", {
            title: "Zaphir",
            styles: ["home-mobile", "home-tablets", "home-desktop"],
            products: products,
        })
    }
}