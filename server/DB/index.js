const { Sequelize } = require('sequelize');

const db = new Sequelize({
  host: 'localhost',
  dialect: 'mysql',
  username: 'root',
  database: 'dndSheets',
  password: '',
});

db.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  character: Sequelize.STRING,
  level: Sequelize.Integer,
  race: Sequelize.STRING,
  alignment: Sequelize.STRING,
  experience: Sequelize.INTEGER
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

module.exports = {
  db,
  User,
  Skills,
  Stats,
  Cantrips,
  Spells
}