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
        nombre: {
          type: Sequelize.STRING
        },
        descripcion: {
          type: Sequelize.TEXT
        },
        categoria: {
          type: Sequelize.STRING
        },
        stock: {
          type: Sequelize.MEDIUMINT
        },
        precio: {
          type: Sequelize.MEDIUMINT
        },
        descuento: {
          type: Sequelize.SMALLINT
        },
        precioFinal: {
          type: Sequelize.MEDIUMINT
        },
        porciento: {
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
