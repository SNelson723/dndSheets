const express = require('express');
const axios = require('axios');
const Redis = require('redis');
const router = express.Router();
const client = Redis.createClient();

client.connect();

router.get(`/wizardSpells`, async (req, res) => {
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

router.get('/allSpells', async (req, res) => {
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

router.get('/getAllAbilities', (req, res) => {
  axios.get('https://www.dnd5eapi.co/api/ability-scores')
    .then(({data}) => {
      let abilities = [];
      data.results.forEach(ability => abilities.push(ability.name));
      res.status(200).send(abilities);
    })
    .catch(error => console.error(error));
});

module.exports = router;