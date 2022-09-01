'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sizes', [
      {
        size: "XXL"
      },
      {
        size: "XL"
      },
      {
        size: "L"
      },
      {
        size: "M"
      },
      {
        size: "S"
      },
      {
        size: "XS"
      },
      {
        size: "X"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sizes', null, {});
  }
};
