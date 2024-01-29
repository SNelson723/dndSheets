const { db, User, Skills, Stats, Cantrips, Spells } = require('./db/index');
// require express
const express = require('express');
// setting up the server
const app = express();


// TODO: MOVE ALL ROUTE HANDLING TO THEIR OWN FOLDERS AND IMPORT THEM HERE TO REFACTOR AND BE MORE ORGANIZED

// routes imported from the different files!!!! 
const userRoute = require('./routes/userRoutes');


// require path
const path = require('path');
// cors (if needed)
const cors = require('cors');

//client path for bundled files
const clientPath = path.resolve(__dirname, '../client/dist');

// make sure you invoke cors() otherwise there will be a socket hangup
app.use(cors());
// using a json parser middleware
app.use(express.json());


// THIS TELLS EXPRESS THAT THIS IS THE UNDERSTOOD ENDPOINT FOR THE RESTFUL API AND ALL USER ROUTE HANDLING DONE FROM THE userRoutes.js file will be run
app.use('/user', userRoute);


// serve up static files from the client path
app.use(express.static(clientPath));

// USER'S CHARACTER REQUEST HANDLING //

// successfully gets all characters
app.get('/api/users', (req, res) => {
  User.findAll()
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => console.error(err));
});

// successfully creates a character
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
      res.status(201).send(newUser);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

// successfully deletes a character
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  User.destroy({ where: { id: id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err));
});

// successfully updates character's level
app.patch('/characterLevel/:id', (req, res) => {
  const { id } = req.params;
  const { level } = req.body;
  User.update( { level: level }, { where: { id: id } })
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.status(500);
      console.error(err);
    })
});

// successfully updates character's experience
app.patch('/characterExp/:id', (req, res) => {
  const { id } = req.params;
  const { experience } = req.body;
  User.update({ experience: experience }, { where: { id: id }})
    .then(() => res.sendStatus(201))
    .catch(err => console.error(err));
});

// CANTRIP REQUEST HANDLING //

// get all the user's cantrips
app.get('/userCantrips/:user_id', (req, res) => {
  const user_id = Number(req.params.user_id);
  Cantrips.findOne({ where: { user_id: user_id } })
    .then((data) => res.status(200).send(data))
    .catch((error) => console.error(error));
});

// successfully creates a character's list of cantrips
app.post('/cantrips/:id', (req, res) => {
  const id = Number(req.params.id);
  const { cantripOne, cantripTwo, cantripThree } = req.body;
  Cantrips.create({
    user_id: id,
    cantripOne: cantripOne,
    cantripTwo: cantripTwo,
    cantripThree: cantripThree
  })
    .then((userCantrips) => res.status(201).send(userCantrips))
    .catch(err => console.error(err));
});

// successfully updates the user's character's cantrips
app.patch('/updateCantripsOne/:id', (req, res) => {
  const id = Number(req.params.id);
  const { cantripOne } = req.body;
  if (cantripOne) {
    Cantrips.update({ cantripOne: cantripOne }, { where: { id: id } })
      .then(() => res.sendStatus(201))
      .catch((error) => console.error(error));
  }
});
app.patch('/updateCantripsTwo/:id', (req, res) => {
    const id = Number(req.params.id);
    const { cantripTwo } = req.body;
    if (cantripTwo) {
      Cantrips.update({ cantripTwo: cantripTwo }, { where: { id: id } })
        .then(() => res.sendStatus(201))
        .catch((error) => console.error(error));
    }
  });
app.patch('/updateCantripsThree/:id', (req, res) => {
  const id = Number(req.params.id);
  const { cantripThree } = req.body;
  if (cantripThree) {
    Cantrips.update({ cantripThree: cantripThree }, { where: { id: id } })
      .then(() => res.sendStatus(201))
      .catch((error) => console.error(error));
  }
});

// USER SPELLS REQUEST HANDLING //

// successfully creates spells table for the user
app.post('/spells/:id', (req, res) => {
  const id = Number(req.params.id);
  const { firstLvlOne, firstLvlTwo, firstLvlThree } = req.body;
  Spells.create({
    user_id: id,
    firstLvlOne: firstLvlOne,
    firstLvlTwo: firstLvlTwo,
    firstLvlThree: firstLvlThree
  })
    .then((data) => res.status(201).send(data))
    .catch((error) => console.error(error));
});

// successfully updates spells
app.patch('/updateSpells/:id', (req, res) => {
  const id = Number(req.params.id);
  const { firstLvlOne, firstLvlTwo, firstLvlThree } = req.body;
  Spells.findOne({ where: { id: id }, attributes: ['firstLvlOne', 'firstLvlTwo', 'firstLvlThree'] })
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
      Spells.update({
        firstLvlOne: data.firstLvlOne,
        firstLvlTwo: data.firstLvlTwo,
        firstLvlThree: data.firstLvlThree
      }, { where: { id: id } })
        .then(() => res.sendStatus(201))
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
});

// successfully gets the spells
app.get('/userSpells/:id', (req, res) => {
  const id = Number(req.params.id);
  Spells.findOne({ where: { id: id } })
    .then(spells => res.status(200).send(spells))
    .catch(error => console.error(error));
});

module.exports = app;