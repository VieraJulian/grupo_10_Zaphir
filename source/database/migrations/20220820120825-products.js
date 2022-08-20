'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('products', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.TEXT
        },
        stock: {
          type: Sequelize.MEDIUMINT
        },
        price: {
          type: Sequelize.MEDIUMINT
        },
        category: {
          type: Sequelize.STRING
        },
        discount: {
          type: Sequelize.SMALLINT
        },
        finalPrice: {
          type: Sequelize.MEDIUMINT
        },
        percent: {
          type: Sequelize.TINYINT
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('products');
    } catch (error) {
      console.log(error);
    }
  }
};
