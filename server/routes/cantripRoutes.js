// require express
const express = require('express');
const router = express.Router();

const { Cantrips } = require('../db/index');

router.get('/', (req, res) => {
  Cantrips.findAll()
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

// get all the user's cantrips
router.get('/:user_id', (req, res) => {
  const user_id = Number(req.params.user_id);
  Cantrips.findOne({ where: { user_id: user_id } })
    .then((data) => res.status(200).send(data))
    .catch((error) => console.error(error));
});

// successfully creates a character's list of cantrips
router.post('/:user_id', (req, res) => {
  const user_id = Number(req.params.user_id);
  const { cantripOne, cantripTwo, cantripThree } = req.body;
  Cantrips.create({
    user_id: user_id,
    cantripOne: cantripOne,
    cantripTwo: cantripTwo,
    cantripThree: cantripThree
  })
    .then((userCantrips) => res.status(201).send(userCantrips))
    .catch(err => console.error(err));
});

// successfully updates the user's character's cantrips
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { cantripOne, cantripTwo, cantripThree } = req.body;
  Cantrips.findOne({ where: { id: id }, attributes: ['cantripOne', 'cantripTwo', 'cantripThree'] })
    .then((data) => {
      if (cantripOne !== data.cantripOne && cantripOne) {
        data.cantripOne = cantripOne;
      }
      if (cantripTwo !== data.cantripTwo && cantripTwo) {
        data.cantripTwo = cantripTwo;
      }
      if (cantripThree !== data.cantripThree && cantripThree) {
        data.cantripThree = cantripThree;
      }
      Cantrips.update({ cantripOne: data.cantripOne, cantripTwo: data.cantripTwo, cantripThree: data.cantripThree }, { where: { id: id } })
        .then(() => res.sendStatus(201))
        .catch((error) => console.error(error));

    })
    .catch(error => console.error(error));
});

module.exports = router;