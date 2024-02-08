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


const path = require('path');
const cors = require('cors');

//client path for bundled files
const clientPath = path.resolve(__dirname, '../dist');

// make sure you invoke cors() otherwise there will be a socket hangup
app.use(cors());
// using a json parser middleware
app.use(express.json());

// routes imported from the different files
const users = require('./routes/userRoutes');
const cantrips = require('./routes/cantripRoutes');
const userSpells = require('./routes/userSpellRoutes');
// THIS TELLS EXPRESS THAT THIS IS THE UNDERSTOOD ENDPOINT FOR THE RESTFUL API AND ALL USER ROUTE HANDLING DONE FROM THE userRoutes.js file will be run
app.use('/user', users);
app.use('/cantrips', cantrips);
app.use('/userSpells', userSpells);

// serve up static files from the client path
app.use(express.static(clientPath));

// EXTERNAL API ROUTES

// get all wizard spells
app.get(`/wizardSpells`, async (req, res) => {
  // get the spells from the redis cache
  const spells = await client.get('wizardSpells');
  // if spells data !== null/undefined
  if (spells) {
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

// get ALL spells for all classes
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