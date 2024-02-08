const { db, Cantrips, Spells } = require('./db/index');
// require express
const express = require('express');
// setting up the server
const app = express();
// require redis
const Redis = require('redis');
// require axios
const axios = require('axios');
// instance of redis => no args means all default params are used
// pass in production url for production instance of redis { url: }
const client = Redis.createClient();
// connect the client
client.connect();

// routes imported from the different files
const users = require('./routes/userRoutes');
const cantrips = require('./routes/cantripRoutes');
const userSpells = require('./routes/userSpellRoutes');

// require path
const path = require('path');
// cors (if needed)
const cors = require('cors');

//client path for bundled files
const clientPath = path.resolve(__dirname, '../dist');

// make sure you invoke cors() otherwise there will be a socket hangup
app.use(cors());
// using a json parser middleware
app.use(express.json());

// THIS TELLS EXPRESS THAT THIS IS THE UNDERSTOOD ENDPOINT FOR THE RESTFUL API AND ALL USER ROUTE HANDLING DONE FROM THE userRoutes.js file will be run
app.use('/user', users);
app.use('/cantrips', cantrips);
app.use('/userSpells', userSpells);

// serve up static files from the client path
app.use(express.static(clientPath));

// // successfully creates spells table for the user
// app.post('/spells/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const { firstLvlOne, firstLvlTwo, firstLvlThree } = req.body;
//   Spells.create({
//     user_id: id,
//     firstLvlOne: firstLvlOne,
//     firstLvlTwo: firstLvlTwo,
//     firstLvlThree: firstLvlThree
//   })
//     .then((data) => res.status(201).send(data))
//     .catch((error) => console.error(error));
// });

// // successfully updates spells
// app.patch('/updateSpells/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const { firstLvlOne, firstLvlTwo, firstLvlThree } = req.body;
//   Spells.findOne({ where: { id: id }, attributes: ['firstLvlOne', 'firstLvlTwo', 'firstLvlThree'] })
//     .then((data) => {
//       if (firstLvlOne !== data.firstLvlOne && firstLvlOne) {
//         data.firstLvlOne = firstLvlOne;
//       }
//       if (firstLvlTwo !== data.firstLvlTwo && firstLvlTwo) {
//         data.firstLvlTwo = firstLvlTwo;
//       }
//       if (firstLvlThree !== data.firstLvlThree && firstLvlThree) {
//         data.firstLvlThree = firstLvlThree;
//       }
//       Spells.update({firstLvlOne: data.firstLvlOne, firstLvlTwo: data.firstLvlTwo, firstLvlThree: data.firstLvlThree}, { where: { id: id } })
//         .then(() => res.sendStatus(201))
//         .catch(error => console.error(error));
//     })
//     .catch(error => console.error(error));
// });

// // successfully gets the spells
// app.get('/userSpells/:id', (req, res) => {
//   const id = Number(req.params.id);
//   Spells.findOne({ where: { id: id } })
//     .then(spells => res.status(200).send(spells))
//     .catch(error => console.error(error));
// });

const DEFAULT_EXPIRATION = 1000;

// get all wizard spells
app.get(`/wizardSpells`, async (req, res) => {
  // get the spells from the redis cache
  const spells = await client.get('wizardSpells');
  // if spells data !== null/undefined
  if (spells) {
    /**
     * return the parsed json data sent back from the cache
     * data must be parsed because redis sends back data in the form of a string
     */
    res.send(JSON.parse(spells));
  } else {
    // otherwise, make the axios request to the api/endpoint
    try {
      const { data } = await axios.get(`https://www.dnd5eapi.co/api/classes/wizard/spells`);
      // set the cached data to redis => stringify so it can be stored
      await client.setEx('wizardSpells', 3600, JSON.stringify(data));
      // send back that data
      res.send(data);
    } catch (error) {
      console.error(error);
    }
  }
});

app.get('/allSpells', async (req, res) => {
  const spells = await client.get('allSpells');
  if (spells) {
    res.send(JSON.parse(spells));
  } else {
    try {
      const { data } = await axios.get('https://www.dnd5eapi.co/api/spells');
      client.set('allSpells', JSON.stringify(data));
      res.send(data);
    } catch {
      console.error(error);
    }
  }
});

module.exports = app;