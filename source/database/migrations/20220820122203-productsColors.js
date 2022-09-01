'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('productsColors', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        product_id: {
          type: Sequelize.INTEGER,/* 
          references: {
            model: "products",
            key: "id"
          } */
        },
        color_id: {
          type: Sequelize.INTEGER, // error de FK
           /* references: {
            model: "colors",
            key: "id"
          } */
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('productsColors');
    } catch (error) {
      console.log(error);
    }
  }
};
