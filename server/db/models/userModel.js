const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../index');

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  character: {
    type: DataTypes.STRING,
    defaultValue: 'Add name',
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  race: {
    type: DataTypes.STRING,
    defaultValue: 'Add race'
  },
  alignment: {
    type: DataTypes.STRING,
    defaultValue: 'Add alignment'
  },
  experience: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

module.exports = User;