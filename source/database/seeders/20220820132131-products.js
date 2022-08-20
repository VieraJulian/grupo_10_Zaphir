'use strict';

const { index } = require("../../models/products.models");

module.exports = {
  async up(queryInterface, Sequelize) {
    let products = index().map(p => {
      delete p.colores
      delete p.talle
      delete p.imagen
      return Object({...p})
    })
    await queryInterface.bulkInsert('products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
