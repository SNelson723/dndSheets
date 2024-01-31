// require express
const express = require('express');
const router = express.Router();


const { User } = require('../db/index');

router.get('/', (req, res) => {
  // const { id } = req.params;
  User.findAll()
    .then(data => res.status(200).send(data))
    .catch(error => console.error(error));
});

// successfully deletes a character
router.delete('/', (req, res) => {
  const { id } = req.params;
  User.destroy({ where: { id: id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err));
});

module.exports = router;