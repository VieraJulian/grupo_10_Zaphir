'use strict';

const { index } = require("../../models/products.models")

module.exports = {
  async up(queryInterface, Sequelize) {
    let acumulador = []
    let products = index().map(p => {
      for (let index = 0; index < p.talle.length; index++) {
        if (p.talle[index] != "" && p.talle[index] == "XXL") {
          acumulador.push(({ product_id: p.id, size_id: 1 }));
        }
      };
      for (let index = 0; index < p.talle.length; index++) {
        if (p.talle[index] != "" && p.talle[index] == "XL") {
          acumulador.push(({ product_id: p.id, size_id: 2 }));
        }
      };
      for (let index = 0; index < p.talle.length; index++) {
        if (p.talle[index] != "" && p.talle[index] == "L") {
          acumulador.push(({ product_id: p.id, size_id: 3 }));
        }
      };
      for (let index = 0; index < p.talle.length; index++) {
        if (p.talle[index] != "" && p.talle[index] == "M") {
          acumulador.push(({ product_id: p.id, size_id: 4 }));
        }
      };
      for (let index = 0; index < p.talle.length; index++) {
        if (p.talle[index] != "" && p.talle[index] == "S") {
          acumulador.push(({ product_id: p.id, size_id: 5 }));
        }
      };
      for (let index = 0; index < p.talle.length; index++) {
        if (p.talle[index] != "" && p.talle[index] == "XS") {
          acumulador.push(({ product_id: p.id, size_id: 6 }));
        }
      };
      return p
    })
    await queryInterface.bulkInsert('productsSizes', acumulador, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productsSizes', null, {});
  }
};
