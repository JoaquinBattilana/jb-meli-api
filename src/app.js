require('dotenv').config();
const express = require('express');

const app = express();

app.use('/api/items', require('./api/routes/items'));

module.exports = app;
