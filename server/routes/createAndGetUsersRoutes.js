// require express
const express = require('express');
const router = express.Router();


const { User } = require('../db/index');

// successfully gets all users in MySQL db
router.get('/', (req, res) => {
  User.findAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => console.error(err));
});

// successfully creates a character in MySQL db
router.post('/', (req, res) => {
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
      res.status(201).send(newUser);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

module.exports = router;