const express = require('express');
const router = express.Router();

const User = require('../db/models/userModel');

// successfully gets all users in MySQL db
router.get('/', (req, res) => {
  User.findAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => console.error(err));
});

// successfully gets one specified user
router.get('/:id', (req, res) => {
  const { id } = req.params;
  User.findOne({ where: { id: id } })
    .then(data => res.status(200).send(data))
    .catch(error => console.error(error));
});

// successfully creates a character in MySQL db
router.post('/', (req, res) => {
  const { character, level, race, alignment } = req.body;
  User.create({
    character: character,
    level: level,
    race: race,
    alignment: alignment,
    experience: 0,
  })
    .then(newUser => {
      console.log(newUser, 'Created successfully');
      res.status(201).send(newUser);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});


// successfully updates character's level
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { level, experience } = req.body;
  if (experience && level) {
    User.update({ level, experience }, { where: { id }})
      .then(() => res.sendStatus(201))
      .catch(err => console.error(err));
  }
  if (level) {
    User.update( { level }, { where: { id } })
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err));
  }
  if (experience) {
    User.update({ experience }, { where: { id }})
      .then(() => res.sendStatus(201))
      .catch(err => console.error(err));
  }
});

// successfully deletes all user's data
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  User.destroy({ where: { id: id } })
    .then(() => {
      Spells.destroy({ where: { id: id }})
        .then(() => {
          Cantrips.destroy({ where: { id: id}})
            .then(() => res.sendStatus(200))
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    })
    .catch(err => console.error(err));
});

module.exports = router;