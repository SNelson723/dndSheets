const { results } = require('../fakeData/characterData.json');
const { Sequelize } = require('sequelize');

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', results.map(user => ({
      ...user,
    })))
  }
};