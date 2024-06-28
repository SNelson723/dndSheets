const express = require('express');
const router = express.Router();


const { Spells } = require('../db/index');

router.get('/', (req, res) => {
  Spells.findAll()
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

// successfully gets the spells
router.get('/:user_id', (req, res) => {
  const user_id = Number(req.params.user_id);
  Spells.findOne({ where: { user_id: user_id }, attributes: ['firstLvlOne', 'firstLvlTwo', 'firstLvlThree'] })
    .then(spells => res.status(200).send(spells))
    .catch(error => console.error(error));
});

// successfully creates spells table for the user
router.post('/:user_id', (req, res) => {
  const user_id = Number(req.params.user_id);
  const { firstLvlOne, firstLvlTwo, firstLvlThree } = req.body;
  Spells.create({
    user_id: user_id,
    firstLvlOne: firstLvlOne,
    firstLvlTwo: firstLvlTwo,
    firstLvlThree: firstLvlThree
  })
    .then((data) => res.status(201).send(data))
    .catch((error) => console.error(error));
});

// successfully updates spells
router.patch('/:user_id', (req, res) => {
  const user_id = Number(req.params.user_id);
  const { firstLvlOne, firstLvlTwo, firstLvlThree } = req.body;
  Spells.findOne({ where: { user_id: user_id }, attributes: ['firstLvlOne', 'firstLvlTwo', 'firstLvlThree'] })
    .then((data) => {
      if (firstLvlOne !== data.firstLvlOne && firstLvlOne) {
        data.firstLvlOne = firstLvlOne;
      }
      if (firstLvlTwo !== data.firstLvlTwo && firstLvlTwo) {
        data.firstLvlTwo = firstLvlTwo;
      }
      if (firstLvlThree !== data.firstLvlThree && firstLvlThree) {
        data.firstLvlThree = firstLvlThree;
      }
      Spells.update({firstLvlOne: data.firstLvlOne, firstLvlTwo: data.firstLvlTwo, firstLvlThree: data.firstLvlThree}, { where: { user_id: user_id } })
        .then(() => res.sendStatus(201))
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
});


module.exports = router;