const { Sequelize, DataTypes } = require('sequelize');

const User = require('./models/userModel');
// const Cantrips = require('./models/cantripsModel');

const HOST = 'localhost';

const db = new Sequelize({
  host: HOST,
  dialect: 'mysql',
  username: 'root',
  database: 'dndSheets',
  password: 'WojtekCircus4126!',
});

db.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

const Skills = db.define('skill', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    reference: { model: User, key: 'id' },
  },
  acrobatics: DataTypes.INTEGER,
  animalHandling: DataTypes.INTEGER,
  arcana: DataTypes.INTEGER,
  athletics: DataTypes.INTEGER,
  deception: DataTypes.INTEGER,
  history: DataTypes.INTEGER,
  insight: DataTypes.INTEGER,
  intimidation: DataTypes.INTEGER,
  investigation: DataTypes.INTEGER,
  medicine: DataTypes.INTEGER,
  nature: DataTypes.INTEGER,
  perception: DataTypes.INTEGER,
  performance: DataTypes.INTEGER,
  persuasion: DataTypes.INTEGER,
  religion: DataTypes.INTEGER,
  sleightOfHand: DataTypes.INTEGER,
  stealth: DataTypes.INTEGER,
  survival: DataTypes.INTEGER,
});

// const Cantrips = db.define('cantrip', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     reference: { model: User, key: 'id' },
//   },
//   cantripOne: DataTypes.STRING,
//   cantripTwo: DataTypes.STRING,
//   cantripThree: DataTypes.STRING,
// });

const Spells = db.define('spell', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    reference: { model: User, key: 'id' },
  },
  firstLvlOne: DataTypes.STRING,
  firstLvlTwo: DataTypes.STRING,
  firstLvlThree: DataTypes.STRING,
});

db.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Database synchronization error: ', err);
  });

module.exports = {
  db,
  // User,
  Skills,
  // Stats,
  // Cantrips,
  Spells
}