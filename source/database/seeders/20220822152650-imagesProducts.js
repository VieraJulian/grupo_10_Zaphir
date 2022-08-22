'use strict';

const { index } = require("../../models/products.models")

module.exports = {
  async up(queryInterface, Sequelize) {

    let acumulador = [];
    for (let index = 1; index <= 36; index++) {
      acumulador.push(Object({ product_id: index }));
      acumulador.push(Object({ product_id: index }));
      acumulador.push(Object({ product_id: index }));
      acumulador.push(Object({ product_id: index }))
    }

    let imagesProducts = []
    for (let index = 0; index < acumulador.length; index++) {
      imagesProducts.push(Object({...acumulador[index], image_id: index + 15}));
    }

    await queryInterface.bulkInsert('imagesProducts', imagesProducts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('imagesProducts', null, {});
  }
};
