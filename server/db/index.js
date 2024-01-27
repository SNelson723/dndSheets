const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

const db = new Sequelize({
  host: 'localhost',
  dialect: 'mysql',
  username: 'root',
  database: 'dndSheets',
  password: '',
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'dndSheets',
});

connection.connect();


db.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  character: {
    type: Sequelize.STRING,
    defaultValue: 'Add name',
  },
  level: {
    type: Sequelize.Integer,
    defaultValue: 1,
  },
  race: {
    type: Sequelize.STRING,
    defaultValue: 'Add race'
  },
  alignment: {
    type: Sequelize.STRING,
    defaultValue: 'Add alignment'
  },
  experience: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
});

const Stats = db.define('stat', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    reference: { model: User, key: 'id'},
  },
  str: Sequelize.INTEGER,
  dex: Sequelize.INTEGER,
  con: Sequelize.INTEGER,
  int: Sequelize.INTEGER,
  wis: Sequelize.INTEGER,
  cha: Sequelize.INTEGER,
});

const Skills = db.define('skill', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    reference: { model: User, key: 'id' },
  },
  acrobatics: Sequelize.INTEGER,
  animalHandling: Sequelize.INTEGER,
  arcana: Sequelize.INTEGER,
  athletics: Sequelize.INTEGER,
  deception: Sequelize.INTEGER,
  history: Sequelize.INTEGER,
  insight: Sequelize.INTEGER,
  intimidation: Sequelize.INTEGER,
  investigation: Sequelize.INTEGER,
  medicine: Sequelize.INTEGER,
  nature: Sequelize.INTEGER,
  perception: Sequelize.INTEGER,
  performance: Sequelize.INTEGER,
  persuasion: Sequelize.INTEGER,
  religion: Sequelize.INTEGER,
  sleightOfHand: Sequelize.INTEGER,
  stealth: Sequelize.INTEGER,
  survival: Sequelize.INTEGER,
});

const Cantrips = db.define('cantrip', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    reference: { model: User, key: 'id' },
  },
  cantripOne: Sequelize.STRING,
  cantripTWO: Sequelize.STRING,
  cantripThree: Sequelize.STRING,
});

const Spells = db.define('spell', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    reference: { model: User, key: 'id' },
  },
  firstLvlOne: Sequelize.STRING,
  firstLvlTwo: Sequelize.STRING,
  firstLvlThree: Sequelize.STRING,
});

//sync the models
db.sync()
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Database synchronization error', err));

module.exports = {
  db,
  User,
  Skills,
  Stats,
  Cantrips,
  Spells
}