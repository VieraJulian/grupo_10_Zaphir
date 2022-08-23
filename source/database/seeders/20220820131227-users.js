'use strict';

const { index } = require("../../models/users.model");

module.exports = {
  async up(queryInterface, Sequelize) {
      let users = index().map(user => {
        return Object({...user, imagen: user.id})
      })
    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
