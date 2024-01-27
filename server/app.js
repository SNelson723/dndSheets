// require express
const express = require('express');
// require sequelize
const sequelize = require('sequelize');
// require path
const path = require('path');
// cors (if needed)
const cors = require('cors');

//client path for bundled files
const clientPath = path.resolve(__dirname, '../client/dist');

// setting up the server
const app = express();
app.use(cors);
// using a json parser middleware
app.use(express.json());
// serve up static files from the client path
app.use(express.static(clientPath));

module.exports = app;