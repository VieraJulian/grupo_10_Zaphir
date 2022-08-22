'use strict';

const { index } = require("../../models/products.models")

module.exports = {
  async up(queryInterface, Sequelize) {
    let acumulador = []
    let products = index().map(p => {
      for (let index = 0; index < p.colores.length; index++) {
        if (p.colores[index] != "" && p.colores[index] == "Negro") {
          acumulador.push(({ product_id: p.id, color_id: 1 }));
        }
      };
      for (let index = 0; index < p.colores.length; index++) {
        if (p.colores[index] != "" && p.colores[index] == "Beige") {
          acumulador.push(({ product_id: p.id, color_id: 2 }));
        }
      };
      for (let index = 0; index < p.colores.length; index++) {
        if (p.colores[index] != "" && p.colores[index] == "Blanco") {
          acumulador.push(({ product_id: p.id, color_id: 3 }));
        }
      };
      for (let index = 0; index < p.colores.length; index++) {
        if (p.colores[index] != "" && p.colores[index] == "Azul") {
          acumulador.push(({ product_id: p.id, color_id: 4 }));
        }
      };
      for (let index = 0; index < p.colores.length; index++) {
        if (p.colores[index] != "" && p.colores[index] == "Marrón") {
          acumulador.push(({ product_id: p.id, color_id: 5 }));
        }
      };
      for (let index = 0; index < p.colores.length; index++) {
        if (p.colores[index] != "" && p.colores[index] == "Naranja") {
          acumulador.push(({ product_id: p.id, color_id: 6 }));
        }
      };
      for (let index = 0; index < p.colores.length; index++) {
        if (p.colores[index] != "" && p.colores[index] == "Verde") {
          acumulador.push(({ product_id: p.id, color_id: 7 }));
        }
      };
      for (let index = 0; index < p.colores.length; index++) {
        if (p.colores[index] != "" && p.colores[index] == "Gris") {
          acumulador.push(({ product_id: p.id, color_id: 8 }));
        }
      };
      for (let index = 0; index < p.colores.length; index++) {
        if (p.colores[index] != "" && p.colores[index] == "Morado") {
          acumulador.push(({ product_id: p.id, color_id: 9 }));
        }
      };
      for (let index = 0; index < p.colores.length; index++) {
        if (p.colores[index] != "" && p.colores[index] == "Violeta") {
          acumulador.push(({ product_id: p.id, color_id: 10 }));
        }
      }
      return p
    })
    await queryInterface.bulkInsert('productsColors', acumulador, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productsColors', null, {});
  }
};
