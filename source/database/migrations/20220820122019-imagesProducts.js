'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("imagesProducts", {
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
        image_id: {
          type: Sequelize.INTEGER,/* 
          references: {
            model: "images",
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
      await queryInterface.dropTable("imagesProducts");
    } catch (error) {
      console.log(error);
    }
  }
};
