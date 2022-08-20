'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.TEXT
        },
        phone: {
          type: Sequelize.BIGINT,
          allowNull: true
        },
        imagen_id: {
          type: Sequelize.INTEGER
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          defaultValue:false
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('users');
    } catch (error) {
      console.log(error);
    }
  }
};
