'use strict';

const { index } = require("../../models/products.models")

module.exports = {
  async up(queryInterface, Sequelize) {

    let acumulador = [];
    index().forEach(p => {
      for (let index = 0; index < 4; index++) {
        acumulador.push(Object({ product_id: p.id }));
      }
    });

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
