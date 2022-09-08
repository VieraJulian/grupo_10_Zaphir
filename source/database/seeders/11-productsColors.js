'use strict';

const { index } = require("../../models/products.models")

module.exports = {
  async up(queryInterface, Sequelize) {
    let acumulador = []
    let colors = ["Negro", "Beige", "Blanco", "Azul", "Marrón", "Naranja", "Verde", "Gris", "Morado", "Violeta"]


    let products = index().forEach(p => {
      for (let i = 0; i < p.colores.length; i++) {
        let product = {
          product_id: p.id,
          color_id: colors.indexOf(p.colores[i]) + 1
        }
        acumulador.push(product)
      }
    })
    await queryInterface.bulkInsert('productsColors', acumulador, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productsColors', null, {});
  }
};
