// require express
const express = require('express');
const router = express.Router();


const { db, User, Skills, Stats, Cantrips, Spells } = require('../db/index');

router.get('/', (req, res) => {
  User.findAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => console.error(err));
});

// router.get('/api/spells/:id', (req, res) => {
//   const id = Number(req.params.id);
//   Spells.findOne({ where: { id: id } })
//     .then(spells => res.status(200).send(spells))
//     .catch(error => console.error(error));
// });

module.exports = router;