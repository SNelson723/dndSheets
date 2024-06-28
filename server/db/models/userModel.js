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

const Stats = db.define('stat', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    reference: { model: User, key: 'id'},
  },
  Strength: DataTypes.INTEGER,
  Dexterity: DataTypes.INTEGER,
  Constitution: DataTypes.INTEGER,
  Intelligence: DataTypes.INTEGER,
  Wisdom: DataTypes.INTEGER,
  Charisma: DataTypes.INTEGER,
});

module.exports = { User, Stats };