'use strict';

const { index } = require("../../models/products.models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('colors', [
      {
        color: "Negro"
      },
      {
        color: "Beige"
      },
      {
        color: "Blanco"
      },
      {
        color: "Azul"
      },
      {
        color: "Marrón"
      },
      {
        color: "Naranja"
      },
      {
        color: "Verde"
      },
      {
        color: "Gris"
      },
      {
        color: "Morado"
      },
      {
        color: "Violeta"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('colors', null, {});
  }
};
