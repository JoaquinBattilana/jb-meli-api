require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

const app = express();

app.use(compression());
app.use(cors(corsOptions));
app.use('/api/items', require('./api/routes/items'));


module.exports = app;
