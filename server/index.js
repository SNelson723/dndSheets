// require express
const express = require('express');
// setting up the server
const app = express();
// require redis
const Redis = require('redis');
// require axios
const axios = require('axios');

const path = require('path');
const cors = require('cors');

//client path for bundled files
const clientPath = path.resolve(__dirname, '../dist');

// middleware
app.use(cors());
app.use(express.json());

// routes imported from the different files
const users = require('./routes/userRoutes');
const cantrips = require('./routes/cantripRoutes');
const userSpells = require('./routes/userSpellRoutes');
const externalApi = require('./routes/externalApi');

// THIS TELLS EXPRESS THAT THIS IS THE UNDERSTOOD ENDPOINT FOR THE RESTFUL API AND ALL USER ROUTE HANDLING DONE FROM THE userRoutes.js file will be run
app.use('/user', users);
app.use('/cantrips', cantrips);
app.use('/userSpells', userSpells);
app.use('/api', externalApi);

// serve up static files from the client path
app.use(express.static(clientPath));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});