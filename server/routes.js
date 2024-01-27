const app = require('./app');
const mysql = require('./mysql');

const { db, User, Skills, Stats, Cantrips, Spells } = require('./db/index');

app.get('/api/allUsers', (req, res) => {
  User.findAll()
    .then((data) => res.sendStatus(200))
    .catch((err) => console.error(err));
});