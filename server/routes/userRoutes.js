const express = require('express');
const router = express.Router();

const {User, Stats} = require('../db/models/userModel');
const { Cantrips, Spells } = require('../db/index');

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

router.get('/stats', (req, res) => {
  Stats.findAll()
    .then(data => res.status(200).send(data))
    .catch(error => console.error(error));
});

// still building
router.post('/stats/:id', (req, res) =>{
  const { id } = req.params;;
  // const { strength, dexterity, constitution, intelligence, wisdom, charisma } = req.body; // this goes to the right of the url in axios
  Stats.create({
    user_id: id,
    Strength: 15,
    Dexterity: 13,
    Constitution: 15,
    Intelligence: 12,
    Wisdom: 8,
    Charisma: 10
  })
    .then(newStats => {
      console.log(newStats, 'Created Stats Successfully');
      res.status(201).send(newStats);
    })
    .catch(error => console.error(error));
});

// successfully gets the current character's base stats
router.get('/stats/:id', (req, res) => {
  const { id } = req.params;
  Stats.findOne({ where: { user_id: id }, attributes: ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']})
    .then(data => res.status(200).send(data))
    .catch(error => console.error(error));
});

router.delete('/stats/:id', (req, res) => {
  const { id } = req.params;
  Stats.destroy({ where: { id: id } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => console.error(error));
});

module.exports = router;