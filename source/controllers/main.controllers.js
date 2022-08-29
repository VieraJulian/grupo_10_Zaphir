const { product } = require("../database/models/index");
const { Op } = require("sequelize");

module.exports = {
    home: async (req, res) => {

        let products = await product.findAll({
            include: [
                { association: "images" }
            ],
            where: {
                descuento: {
                    [Op.gt]: 0
                }
            },
            limit: 4
        });
        return res.render("home", {
            title: "Zaphir",
            styles: ["home-mobile", "home-tablets", "home-desktop"],
            products: products,
        })
    }
}