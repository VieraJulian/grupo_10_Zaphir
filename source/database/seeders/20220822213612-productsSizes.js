'use strict';

const { index } = require("../../models/products.models")

module.exports = {
  async up(queryInterface, Sequelize) {
    let acumulador = []
    let sizes = ["XXL", "XL", "L", "M", "S", "XS"]


    let products = index().forEach(p => {
      for (let i = 0; i < p.talle.length; i++) {
        if (p.talle[i] != "") {
          let product = {
            product_id: p.id,
            size_id: sizes.indexOf(p.talle[i]) + 1
          }
          acumulador.push(product)
        }
      }
    })
    await queryInterface.bulkInsert('productsSizes', acumulador, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productsSizes', null, {});
  }
};