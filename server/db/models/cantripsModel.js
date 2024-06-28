const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../index');
const { User } = require('./userModel')

const Cantrips = db.define('cantrip', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    reference: { model: User, key: 'id' },
  },
  cantripOne: DataTypes.STRING,
  cantripTwo: DataTypes.STRING,
  cantripThree: DataTypes.STRING,
});

module.exports = { Cantrips };