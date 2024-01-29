const { db, User, Skills, Stats, Cantrips, Spells } = require('./db/index');
// require express
const express = require('express');
// require sequelize
const sequelize = require('sequelize');
// require path
const path = require('path');
// cors (if needed)
const cors = require('cors');

//client path for bundled files
const clientPath = path.resolve(__dirname, '../client/dist');

// setting up the server
const app = express();
// make sure you invoke cors() otherwise there will be a socket hangup
app.use(cors());
// using a json parser middleware
app.use(express.json());
// serve up static files from the client path
app.use(express.static(clientPath));

app.get('/api/users', (req, res) => {
  User.findAll()
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => console.error(err));
});

app.post('/api/users', (req, res) => {
  const { character, level, race, alignment, exp } = req.body;
  User.create({
    character: character,
    level: level,
    race: race,
    alignment: alignment,
    experience: exp,
  })
    .then(newUser => {
      console.log(newUser, 'Created successfully');
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

module.exports = app;