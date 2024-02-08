const { Sequelize, DataTypes } = require('sequelize');

const User = require('./models/userModel');
// const Cantrips = require('./models/cantripsModel');

const HOST = 'localhost';

const db = new Sequelize({
  host: HOST,
  dialect: 'mysql',
  username: 'root',
  database: 'dndSheets',
  password: '',
});

db.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

// const User = db.define('user', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   character: {
//     type: DataTypes.STRING,
//     defaultValue: 'Add name',
//   },
//   level: {
//     type: DataTypes.INTEGER,
//     defaultValue: 1,
//   },
//   race: {
//     type: DataTypes.STRING,
//     defaultValue: 'Add race'
//   },
//   alignment: {
//     type: DataTypes.STRING,
//     defaultValue: 'Add alignment'
//   },
//   experience: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0,
//   }
// });

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
  str: DataTypes.INTEGER,
  dex: DataTypes.INTEGER,
  con: DataTypes.INTEGER,
  int: DataTypes.INTEGER,
  wis: DataTypes.INTEGER,
  cha: DataTypes.INTEGER,
});

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
  User,
  Skills,
  Stats,
  Cantrips,
  Spells
}