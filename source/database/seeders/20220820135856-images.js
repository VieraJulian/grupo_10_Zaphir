'use strict';

const users = require("../../models/users.model");
const products = require("../../models/products.models");

module.exports = {
  async up(queryInterface, Sequelize) {
    let images = []
    let imagesUsers = users.index().map(u => {
      images.push(Object({ imagen: u.imagen }))
    });

    let productsImages = products.index().map(p => {
      return p.imagen
    });

    let acumulador = [];
    for (let index = 0; index < productsImages.length; index++) {
      acumulador.push(productsImages[index][0], productsImages[index][1], productsImages[index][2], productsImages[index][3]);
    }

    for (let index = 0; index < acumulador.length; index++) {
      images.push(Object({ imagen: acumulador[index] }))
    }
    await queryInterface.bulkInsert('images', images, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('images', null, {});
  }
};
